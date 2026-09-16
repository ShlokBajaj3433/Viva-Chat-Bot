package com.example.admin.enums;

public enum UserRole {
    SUPER_ADMIN("SUPER_ADMIN", "Super administrator with full system access including admin management"),
    ADMIN("ADMIN", "Administrator who can manage teachers and students"),
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
    
    public boolean hasPermissionFor(UserRole targetRole) {
        switch (this) {
            case SUPER_ADMIN:
                return true; // Can manage all roles
            case ADMIN:
                return targetRole == TEACHER || targetRole == STUDENT; // Can only manage teachers and students
            case TEACHER:
                return targetRole == STUDENT; // Can only manage students in their classrooms
            case STUDENT:
                return false; // Cannot manage anyone
            default:
                return false;
        }
    }
}
