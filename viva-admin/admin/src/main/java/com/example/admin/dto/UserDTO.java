package com.example.admin.dto;

import com.example.admin.enums.UserRole;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

public class UserDTO {
    private String uid;
    private String email;
    private String displayName;
    private String photoUrl;
    private List<UserRole> roles;  // Changed from single role to list for multi-role support
    private boolean emailVerified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String passwordHash;  // For manual password management
    private boolean mustChangePassword;  // Flag to force password change on first login
    
    // Student-specific fields
    private String enrollmentNumber;  // Unique enrollment number for students
    private String rollNumber;  // Roll number for students

    public UserDTO() {
    }

    public UserDTO(String uid, String email, String displayName, UserRole role) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.roles = new ArrayList<>();
        this.roles.add(role);  // Initialize with single role
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UserDTO(String uid, String email, String displayName, List<UserRole> roles) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.roles = roles;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public UserRole getRole() {
        // For backward compatibility, return the first role if list exists
        return (roles != null && !roles.isEmpty()) ? roles.get(0) : null;
    }

    public void setRole(UserRole role) {
        // For backward compatibility, set as single role in list
        this.roles = new ArrayList<>();
        if (role != null) {
            this.roles.add(role);
        }
    }

    public List<UserRole> getRoles() {
        return roles;
    }

    public void setRoles(List<UserRole> roles) {
        this.roles = roles;
    }

    public boolean hasRole(UserRole role) {
        return roles != null && roles.contains(role);
    }

    public void addRole(UserRole role) {
        if (this.roles == null) {
            this.roles = new ArrayList<>();
        }
        if (!this.roles.contains(role)) {
            this.roles.add(role);
        }
    }

    public void removeRole(UserRole role) {
        if (this.roles != null) {
            this.roles.remove(role);
        }
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public boolean isMustChangePassword() {
        return mustChangePassword;
    }

    public void setMustChangePassword(boolean mustChangePassword) {
        this.mustChangePassword = mustChangePassword;
    }

    public String getEnrollmentNumber() {
        return enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
}
