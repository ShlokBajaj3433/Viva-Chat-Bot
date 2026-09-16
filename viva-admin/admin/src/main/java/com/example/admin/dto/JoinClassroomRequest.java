package com.example.admin.dto;

public class JoinClassroomRequest {
    private String code;
    private String studentId;

    public JoinClassroomRequest() {
    }

    public JoinClassroomRequest(String code, String studentId) {
        this.code = code;
        this.studentId = studentId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
