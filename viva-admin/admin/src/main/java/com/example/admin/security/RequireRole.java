package com.example.admin.security;

import com.example.admin.enums.UserRole;

import java.lang.annotation.*;

/**
 * Annotation to specify required roles for accessing an endpoint.
 * Can be applied to controller methods.
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequireRole {
    
    /**
     * List of roles allowed to access this endpoint
     * User must have at least one of these roles
     */
    UserRole[] value();
    
    /**
     * Whether all roles are required (AND operation) or just one (OR operation)
     * Default is OR - user needs at least one of the specified roles
     */
    boolean requireAll() default false;
}
