package com.example.admin.service;

import com.example.admin.dto.UserDTO;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO createUserWithPassword(UserDTO userDTO, String password);
    Optional<UserDTO> getUserById(String uid);
    Optional<UserDTO> getUserByEmail(String email);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(String uid, UserDTO userDTO);
    void deleteUser(String uid);
    List<UserDTO> getUsersByRole(String role);
}
