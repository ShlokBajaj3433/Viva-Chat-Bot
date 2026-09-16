package com.example.admin.security;

import com.example.admin.enums.UserRole;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Map;

/**
 * Aspect to handle role-based authorization using @RequireRole annotation
 */
@Aspect
@Component
public class RoleAuthorizationAspect {

    @Around("@annotation(com.example.admin.security.RequireRole)")
    public Object checkRoleAuthorization(ProceedingJoinPoint joinPoint) throws Throwable {
        // Get authentication from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !(authentication.getDetails() instanceof JwtAuthDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized", "message", "Authentication required"));
        }

        JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
        String userRoleString = authDetails.getRole();
        
        if (userRoleString == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Forbidden", "message", "No role assigned"));
        }

        UserRole userRole;
        try {
            userRole = UserRole.valueOf(userRoleString);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Forbidden", "message", "Invalid role"));
        }

        // Get the required roles from annotation
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        RequireRole requireRole = method.getAnnotation(RequireRole.class);
        
        if (requireRole == null) {
            // This shouldn't happen, but proceed if no annotation found
            return joinPoint.proceed();
        }

        UserRole[] requiredRoles = requireRole.value();
        boolean requireAll = requireRole.requireAll();

        // Check if user has required role(s)
        boolean hasAccess;
        if (requireAll) {
            // User must have all specified roles (unlikely with enum, but kept for flexibility)
            hasAccess = Arrays.asList(requiredRoles).contains(userRole);
        } else {
            // User needs at least one of the specified roles
            hasAccess = Arrays.asList(requiredRoles).contains(userRole);
        }

        if (!hasAccess) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of(
                        "error", "Forbidden",
                        "message", "You don't have permission to access this resource",
                        "requiredRoles", Arrays.toString(requiredRoles),
                        "yourRole", userRoleString
                    ));
        }

        // User has required role, proceed with method execution
        return joinPoint.proceed();
    }
}
