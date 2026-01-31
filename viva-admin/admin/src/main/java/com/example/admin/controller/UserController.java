package com.example.admin.controller;

import com.example.admin.dto.LoginRequest;
import com.example.admin.dto.LoginResponse;
import com.example.admin.dto.UserDTO;
import com.example.admin.enums.UserRole;
import com.example.admin.security.JwtAuthDetails;
import com.example.admin.security.JwtUtils;
import com.example.admin.security.RequireRole;
import com.example.admin.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    public UserController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN})
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        try {
            // Get authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
            UserRole creatorRole = UserRole.valueOf(authDetails.getRole());
            UserRole targetRole = userDTO.getRole();
            
            // Check if creator has permission to create this role
            if (!creatorRole.hasPermissionFor(targetRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "You don't have permission to create users with this role"));
            }
            
            UserDTO created = userService.createUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            // Find user by email
            var user = userService.getUserByEmail(request.getEmail());
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(LoginResponse.error("Invalid email or password"));
            }
            
            UserDTO userDTO = user.get();
            
            // Verify password (if passwordHash exists in user)
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(LoginResponse.error("Password is required"));
            }
            
            // For production: Implement password verification with BCryptPasswordEncoder
            // For now, we accept any non-empty password for development
            
            // Generate JWT token
            String token = jwtUtils.generateToken(userDTO.getUid(), userDTO.getEmail(), userDTO.getRole().getCode());
            
            return ResponseEntity.ok(LoginResponse.success(token, userDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(LoginResponse.error("Login failed: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract token from "Bearer <token>"
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            String token = authHeader.substring(7);
            
            // Validate token and get user UID
            if (!jwtUtils.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            String uid = jwtUtils.extractUid(token);
            if (uid == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            // Fetch user details
            Optional<UserDTO> user = userService.getUserById(uid);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            
            return ResponseEntity.ok(user.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{uid}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String uid) {
        Optional<UserDTO> user = userService.getUserById(uid);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        Optional<UserDTO> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN})
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/role/{role}")
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN})
    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable String role) {
        List<UserDTO> users = userService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{uid}")
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER})
    public ResponseEntity<?> updateUser(@PathVariable String uid, @RequestBody UserDTO userDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
            UserRole creatorRole = UserRole.valueOf(authDetails.getRole());
            String currentUserUid = authDetails.getUid();
            
            // Teachers can only update their own profile
            if (creatorRole == UserRole.TEACHER && !currentUserUid.equals(uid)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Teachers can only update their own profile"));
            }
            
            // Get target user's current role
            Optional<UserDTO> targetUser = userService.getUserById(uid);
            if (targetUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found"));
            }
            
            UserRole targetRole = targetUser.get().getRole();
            
            // Check if creator has permission to update this role
            if (!creatorRole.hasPermissionFor(targetRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "You don't have permission to update this user"));
            }
            
            UserDTO updated = userService.updateUser(uid, userDTO);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update user: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{uid}")
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN})
    public ResponseEntity<?> deleteUser(@PathVariable String uid) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
            UserRole creatorRole = UserRole.valueOf(authDetails.getRole());
            
            // Get target user's role
            Optional<UserDTO> targetUser = userService.getUserById(uid);
            if (targetUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found"));
            }
            
            UserRole targetRole = targetUser.get().getRole();
            
            // Check if creator has permission to delete this role
            if (!creatorRole.hasPermissionFor(targetRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "You don't have permission to delete this user"));
            }
            
            userService.deleteUser(uid);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete user: " + e.getMessage()));
        }
    }

    @PostMapping("/setup/superadmin")
    public ResponseEntity<?> createSuperAdmin() {
        try {
            UserDTO superAdmin = new UserDTO(
                "super_admin_001",
                "admin@viva.com",
                "Super Admin",
                UserRole.SUPER_ADMIN
            );
            UserDTO created = userService.createUser(superAdmin);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "ok", true,
                "message", "Super Admin created successfully",
                "user", created
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "ok", false,
                "error", "Super Admin already exists or error occurred: " + e.getMessage()
            ));
        }
    }
}
