package com.example.admin.service.impl;

import com.example.admin.dto.UserDTO;
import com.example.admin.enums.UserRole;
import com.example.admin.repository.UserRepository;
import com.example.admin.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
