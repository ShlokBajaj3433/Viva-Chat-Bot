package com.example.admin.security;

public class JwtAuthDetails {
    private String uid;
    private String email;
    private String role;
    
    public JwtAuthDetails(String uid, String email, String role) {
        this.uid = uid;
        this.email = email;
        this.role = role;
    }
    
    public String getUid() {
        return uid;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getRole() {
        return role;
    }
}
