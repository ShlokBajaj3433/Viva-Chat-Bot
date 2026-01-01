package com.example.admin.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Result of bulk student upload from Excel
 */
public class BulkStudentUploadResult {
    private boolean ok;
    private String message;
    private int totalProcessed;
    private int successCount;
    private int failureCount;
    private List<StudentCredential> createdStudents = new ArrayList<>();
    private List<FailedStudent> failedStudents = new ArrayList<>();

    public BulkStudentUploadResult() {
    }

    public static BulkStudentUploadResult success(int total, int success, List<StudentCredential> students) {
        BulkStudentUploadResult result = new BulkStudentUploadResult();
        result.ok = true;
        result.message = String.format("Successfully created %d out of %d students", success, total);
        result.totalProcessed = total;
        result.successCount = success;
        result.failureCount = total - success;
        result.createdStudents = students;
        return result;
    }

    public static BulkStudentUploadResult error(String message) {
        BulkStudentUploadResult result = new BulkStudentUploadResult();
        result.ok = false;
        result.message = message;
        return result;
    }

    // Getters and Setters
    public boolean isOk() { return ok; }
    public void setOk(boolean ok) { this.ok = ok; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getTotalProcessed() { return totalProcessed; }
    public void setTotalProcessed(int totalProcessed) { this.totalProcessed = totalProcessed; }

    public int getSuccessCount() { return successCount; }
    public void setSuccessCount(int successCount) { this.successCount = successCount; }

    public int getFailureCount() { return failureCount; }
    public void setFailureCount(int failureCount) { this.failureCount = failureCount; }

    public List<StudentCredential> getCreatedStudents() { return createdStudents; }
    public void setCreatedStudents(List<StudentCredential> createdStudents) { this.createdStudents = createdStudents; }

    public List<FailedStudent> getFailedStudents() { return failedStudents; }
    public void setFailedStudents(List<FailedStudent> failedStudents) { this.failedStudents = failedStudents; }

    /**
     * Represents a successfully created student with credentials
     */
    public static class StudentCredential {
        private String uid;
        private String email;
        private String displayName;
        private String rollNumber;
        private String temporaryPassword;
        private String classroomId;

        public StudentCredential() {}

        public StudentCredential(String uid, String email, String displayName, String rollNumber, String temporaryPassword, String classroomId) {
            this.uid = uid;
            this.email = email;
            this.displayName = displayName;
            this.rollNumber = rollNumber;
            this.temporaryPassword = temporaryPassword;
            this.classroomId = classroomId;
        }

        public String getUid() { return uid; }
        public void setUid(String uid) { this.uid = uid; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getDisplayName() { return displayName; }
        public void setDisplayName(String displayName) { this.displayName = displayName; }

        public String getRollNumber() { return rollNumber; }
        public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

        public String getTemporaryPassword() { return temporaryPassword; }
        public void setTemporaryPassword(String temporaryPassword) { this.temporaryPassword = temporaryPassword; }

        public String getClassroomId() { return classroomId; }
        public void setClassroomId(String classroomId) { this.classroomId = classroomId; }
    }

    /**
     * Represents a failed student record with error reason
     */
    public static class FailedStudent {
        private int rowNumber;
        private String email;
        private String displayName;
        private String reason;

        public FailedStudent() {}

        public FailedStudent(int rowNumber, String email, String displayName, String reason) {
            this.rowNumber = rowNumber;
            this.email = email;
            this.displayName = displayName;
            this.reason = reason;
        }

        public int getRowNumber() { return rowNumber; }
        public void setRowNumber(int rowNumber) { this.rowNumber = rowNumber; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getDisplayName() { return displayName; }
        public void setDisplayName(String displayName) { this.displayName = displayName; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}
