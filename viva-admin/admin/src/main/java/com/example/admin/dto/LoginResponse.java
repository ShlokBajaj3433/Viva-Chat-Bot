package com.example.admin.dto;

public class LoginResponse {
    private boolean ok;
    private String message;
    private String token;
    private UserDTO user;
    
    public LoginResponse() {}
    
    public LoginResponse(boolean ok, String message, String token, UserDTO user) {
        this.ok = ok;
        this.message = message;
        this.token = token;
        this.user = user;
    }
    
    public static LoginResponse success(String token, UserDTO user) {
        return new LoginResponse(true, "Login successful", token, user);
    }
    
    public static LoginResponse error(String message) {
        return new LoginResponse(false, message, null, null);
    }
    
    public boolean isOk() {
        return ok;
    }
    
    public void setOk(boolean ok) {
        this.ok = ok;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public UserDTO getUser() {
        return user;
    }
    
    public void setUser(UserDTO user) {
        this.user = user;
    }
}
