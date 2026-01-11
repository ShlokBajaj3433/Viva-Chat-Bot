package com.example.admin.dto;

import java.time.LocalDateTime;

public class AssignmentDTO {
    private String id;
    private String classroomId;
    private String title;
    private String description;
    private String teacherId;
    private LocalDateTime dueDate;
    private String subject;
    private int totalPoints;
    private boolean published;
    private String type; // QUIZ, HOMEWORK, PROJECT, EXAM, VIVA
    private String status; // active, inactive, closed
    private VivaConfig vivaConfig; // optional, only for VIVA
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AssignmentDTO() {
    }

    public AssignmentDTO(String classroomId, String title, String teacherId) {
        this.classroomId = classroomId;
        this.title = title;
        this.teacherId = teacherId;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.published = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(String classroomId) {
        this.classroomId = classroomId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public VivaConfig getVivaConfig() {
        return vivaConfig;
    }

    public void setVivaConfig(VivaConfig vivaConfig) {
        this.vivaConfig = vivaConfig;
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

    public static class VivaConfig {
        private String role;
        private String level;
        private java.util.List<String> techStack;
        private Integer questionCount;
        private Integer duration; // minutes

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }

        public java.util.List<String> getTechStack() { return techStack; }
        public void setTechStack(java.util.List<String> techStack) { this.techStack = techStack; }

        public Integer getQuestionCount() { return questionCount; }
        public void setQuestionCount(Integer questionCount) { this.questionCount = questionCount; }

        public Integer getDuration() { return duration; }
        public void setDuration(Integer duration) { this.duration = duration; }
    }
}
