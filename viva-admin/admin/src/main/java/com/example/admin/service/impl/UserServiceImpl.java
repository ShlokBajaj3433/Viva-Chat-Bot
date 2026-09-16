package com.example.admin.service.impl;

import com.example.admin.dto.UserDTO;
import com.example.admin.enums.UserRole;
import com.example.admin.repository.UserRepository;
import com.example.admin.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FirebaseAuth firebaseAuth;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, FirebaseAuth firebaseAuth) {
        this.userRepository = userRepository;
        this.firebaseAuth = firebaseAuth;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getUid() == null || userDTO.getUid().isBlank()) {
            userDTO.setUid("user-" + System.nanoTime());
        }
        userDTO.setCreatedAt(Optional.ofNullable(userDTO.getCreatedAt()).orElse(LocalDateTime.now()));
        userDTO.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(userDTO);
    }

    @Override
    public UserDTO createUserWithPassword(UserDTO userDTO, String password) {
        try {
            // Check if user already exists
            if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already exists: " + userDTO.getEmail());
            }

            // For STUDENT role, create in Firebase Auth
            if (userDTO.getRole() == UserRole.STUDENT) {
                try {
                    UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                        .setEmail(userDTO.getEmail())
                        .setPassword(password)
                        .setDisplayName(userDTO.getDisplayName())
                        .setEmailVerified(false);
                    
                    UserRecord userRecord = firebaseAuth.createUser(request);
                    userDTO.setUid(userRecord.getUid());  // Use Firebase UID
                } catch (Exception authError) {
                    throw new RuntimeException("Failed to create Firebase Auth user: " + authError.getMessage(), authError);
                }
            } else {
                // For non-student roles, generate UID
                if (userDTO.getUid() == null || userDTO.getUid().isBlank()) {
                    userDTO.setUid("user-" + System.nanoTime());
                }
            }

            // Hash password and save to Firestore
            String hashedPassword = passwordEncoder.encode(password);
            userDTO.setCreatedAt(Optional.ofNullable(userDTO.getCreatedAt()).orElse(LocalDateTime.now()));
            userDTO.setUpdatedAt(LocalDateTime.now());
            
            return userRepository.saveWithPassword(userDTO, hashedPassword);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create user with password: " + e.getMessage(), e);
        }
    }

    @Override
    public Optional<UserDTO> getUserById(String uid) {
        return userRepository.findById(uid);
    }

    @Override
    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDTO updateUser(String uid, UserDTO userDTO) {
        UserDTO existing = userRepository.findById(uid).orElse(null);
        if (existing == null) {
            return null;
        }
        userDTO.setUid(uid);
        userDTO.setCreatedAt(existing.getCreatedAt());
        userDTO.setUpdatedAt(LocalDateTime.now());
        userRepository.update(uid, userDTO);
        return userDTO;
    }

    @Override
    public void deleteUser(String uid) {
        userRepository.delete(uid);
    }

    @Override
    public List<UserDTO> getUsersByRole(String role) {
        if (role == null) {
            return userRepository.findAll();
        }
        UserRole target;
        try {
            target = UserRole.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException ex) {
            return List.of();
        }
        return userRepository.findByRole(target.name());
    }
}
