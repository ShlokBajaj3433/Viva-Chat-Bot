package com.example.admin.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class BulkTeacherUploadResult {
    private boolean success;
    private String message;
    private int totalProcessed;
    private int successfulCreations;
    private int failedCreations;
    private List<TeacherCredential> teachers;
    private List<FailedTeacher> failedTeachers;
    private LocalDateTime timestamp;

    public BulkTeacherUploadResult() {
        this.teachers = new ArrayList<>();
        this.failedTeachers = new ArrayList<>();
        this.timestamp = LocalDateTime.now();
    }

    public static BulkTeacherUploadResult success(List<TeacherCredential> teachers, List<FailedTeacher> failedTeachers) {
        BulkTeacherUploadResult result = new BulkTeacherUploadResult();
        result.setSuccess(true);
        result.setTeachers(teachers);
        result.setFailedTeachers(failedTeachers);
        result.setTotalProcessed(teachers.size() + failedTeachers.size());
        result.setSuccessfulCreations(teachers.size());
        result.setFailedCreations(failedTeachers.size());
        result.setMessage(String.format("Processed %d teachers: %d successful, %d failed",
                result.getTotalProcessed(), result.getSuccessfulCreations(), result.getFailedCreations()));
        return result;
    }

    public static BulkTeacherUploadResult error(String message) {
        BulkTeacherUploadResult result = new BulkTeacherUploadResult();
        result.setSuccess(false);
        result.setMessage(message);
        return result;
    }

    // Inner class for teacher credentials
    public static class TeacherCredential {
        private String uid;
        private String email;
        private String displayName;
        private String employeeId;
        private String password;
        private String department;
        private LocalDateTime createdAt;

        public TeacherCredential(String uid, String email, String displayName, String employeeId, String password, String department) {
            this.uid = uid;
            this.email = email;
            this.displayName = displayName;
            this.employeeId = employeeId;
            this.password = password;
            this.department = department;
            this.createdAt = LocalDateTime.now();
        }

        // Getters and Setters
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

        public String getEmployeeId() {
            return employeeId;
        }

        public void setEmployeeId(String employeeId) {
            this.employeeId = employeeId;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }
    }

    // Inner class for failed teacher entries
    public static class FailedTeacher {
        private int rowNumber;
        private String email;
        private String name;
        private String reason;

        public FailedTeacher(int rowNumber, String email, String name, String reason) {
            this.rowNumber = rowNumber;
            this.email = email;
            this.name = name;
            this.reason = reason;
        }

        // Getters and Setters
        public int getRowNumber() {
            return rowNumber;
        }

        public void setRowNumber(int rowNumber) {
            this.rowNumber = rowNumber;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }

    // Getters and Setters for main class
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getTotalProcessed() {
        return totalProcessed;
    }

    public void setTotalProcessed(int totalProcessed) {
        this.totalProcessed = totalProcessed;
    }

    public int getSuccessfulCreations() {
        return successfulCreations;
    }

    public void setSuccessfulCreations(int successfulCreations) {
        this.successfulCreations = successfulCreations;
    }

    public int getFailedCreations() {
        return failedCreations;
    }

    public void setFailedCreations(int failedCreations) {
        this.failedCreations = failedCreations;
    }

    public List<TeacherCredential> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<TeacherCredential> teachers) {
        this.teachers = teachers;
    }

    public List<FailedTeacher> getFailedTeachers() {
        return failedTeachers;
    }

    public void setFailedTeachers(List<FailedTeacher> failedTeachers) {
        this.failedTeachers = failedTeachers;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
