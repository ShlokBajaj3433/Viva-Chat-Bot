package com.example.admin.enums;

public enum UserRole {
    ADMIN("ADMIN", "System administrator with full access"),
    TEACHER("TEACHER", "Teacher can manage classrooms, assignments, and students"),
    STUDENT("STUDENT", "Student with limited access to assigned classrooms");

    private final String code;
    private final String description;

    UserRole(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
