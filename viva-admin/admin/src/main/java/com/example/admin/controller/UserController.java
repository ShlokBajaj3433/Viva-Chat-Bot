package com.example.admin.controller;

import com.example.admin.dto.LoginRequest;
import com.example.admin.dto.LoginResponse;
import com.example.admin.dto.UserDTO;
import com.example.admin.security.JwtUtils;
import com.example.admin.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO created = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
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
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable String role) {
        List<UserDTO> users = userService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{uid}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String uid, @RequestBody UserDTO userDTO) {
        UserDTO updated = userService.updateUser(uid, userDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{uid}")
    public ResponseEntity<Void> deleteUser(@PathVariable String uid) {
        userService.deleteUser(uid);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/setup/superadmin")
    public ResponseEntity<?> createSuperAdmin() {
        try {
            UserDTO superAdmin = new UserDTO(
                "super_admin_001",
                "admin@viva.com",
                "Super Admin",
                com.example.admin.enums.UserRole.ADMIN
            );
            UserDTO created = userService.createUser(superAdmin);
            return ResponseEntity.status(HttpStatus.CREATED).body(java.util.Map.of(
                "ok", true,
                "message", "Super Admin created successfully",
                "user", created
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(java.util.Map.of(
                "ok", false,
                "error", "Super Admin already exists or error occurred: " + e.getMessage()
            ));
        }
    }
}
