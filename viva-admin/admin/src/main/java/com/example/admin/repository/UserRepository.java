package com.example.admin.repository;

import com.example.admin.dto.UserDTO;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    UserDTO save(UserDTO userDTO);
    UserDTO saveWithPassword(UserDTO userDTO, String hashedPassword);
    Optional<UserDTO> findById(String uid);
    Optional<UserDTO> findByEmail(String email);
    Optional<String> getPasswordHash(String email);
    List<UserDTO> findAll();
    void update(String uid, UserDTO userDTO);
    void delete(String uid);
    List<UserDTO> findByRole(String role);
}
