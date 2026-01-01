package com.example.admin.repository.impl;

import com.example.admin.dto.AnnouncementDTO;
import com.example.admin.dto.AssignmentDTO;
import com.example.admin.dto.ClassroomDTO;
import com.example.admin.dto.UserDTO;
import com.example.admin.enums.UserRole;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentSnapshot;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

final class FirestoreConverters {

    private FirestoreConverters() {
    }

    static Map<String, Object> toMap(UserDTO dto) {
        Map<String, Object> data = new HashMap<>();
        data.put("uid", dto.getUid());
        data.put("email", dto.getEmail());
        data.put("displayName", dto.getDisplayName());
        data.put("photoUrl", dto.getPhotoUrl());
        data.put("role", Optional.ofNullable(dto.getRole()).map(Enum::name).orElse(null));
        data.put("emailVerified", dto.isEmailVerified());
        data.put("createdAt", toTimestamp(dto.getCreatedAt()));
        data.put("updatedAt", toTimestamp(dto.getUpdatedAt()));
        return data;
    }

    static Map<String, Object> toMapWithPassword(UserDTO dto, String hashedPassword) {
        Map<String, Object> data = toMap(dto);
        data.put("passwordHash", hashedPassword);
        data.put("mustChangePassword", true); // Force password change on first login
        return data;
    }

    static UserDTO toUser(DocumentSnapshot doc) {
        if (doc == null || !doc.exists()) {
            return null;
        }
        UserDTO dto = new UserDTO();
        dto.setUid(doc.getString("uid"));
        dto.setEmail(doc.getString("email"));
        dto.setDisplayName(doc.getString("displayName"));
        dto.setPhotoUrl(doc.getString("photoUrl"));
        String role = doc.getString("role");
        if (role != null) {
            try {
                dto.setRole(UserRole.valueOf(role));
            } catch (IllegalArgumentException ignored) {
            }
        }
        Boolean emailVerified = doc.getBoolean("emailVerified");
        dto.setEmailVerified(Boolean.TRUE.equals(emailVerified));
        dto.setCreatedAt(fromTimestamp(doc.get("createdAt")));
        dto.setUpdatedAt(fromTimestamp(doc.get("updatedAt")));
        return dto;
    }

    static Map<String, Object> toMap(ClassroomDTO dto) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", dto.getId());
        data.put("name", dto.getName());
        data.put("description", dto.getDescription());
        data.put("teacherId", dto.getTeacherId());
        data.put("teacherName", dto.getTeacherName());
        data.put("studentIds", Optional.ofNullable(dto.getStudentIds()).orElseGet(ArrayList::new));
        data.put("subject", dto.getSubject());
        data.put("grade", dto.getGrade());
        data.put("createdAt", toTimestamp(dto.getCreatedAt()));
        data.put("updatedAt", toTimestamp(dto.getUpdatedAt()));
        return data;
    }

    static ClassroomDTO toClassroom(DocumentSnapshot doc) {
        if (doc == null || !doc.exists()) {
            return null;
        }
        ClassroomDTO dto = new ClassroomDTO();
        dto.setId(doc.getString("id"));
        dto.setName(doc.getString("name"));
        dto.setDescription(doc.getString("description"));
        dto.setTeacherId(doc.getString("teacherId"));
        dto.setTeacherName(doc.getString("teacherName"));
        List<String> students = (List<String>) doc.get("studentIds");
        dto.setStudentIds(students != null ? students : new ArrayList<>());
        dto.setSubject(doc.getString("subject"));
        dto.setGrade(doc.getString("grade"));
        dto.setCreatedAt(fromTimestamp(doc.get("createdAt")));
        dto.setUpdatedAt(fromTimestamp(doc.get("updatedAt")));
        return dto;
    }

    static Map<String, Object> toMap(AssignmentDTO dto) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", dto.getId());
        data.put("classroomId", dto.getClassroomId());
        data.put("title", dto.getTitle());
        data.put("description", dto.getDescription());
        data.put("teacherId", dto.getTeacherId());
        data.put("subject", dto.getSubject());
        data.put("dueDate", toTimestamp(dto.getDueDate()));
        data.put("totalPoints", dto.getTotalPoints());
        data.put("published", dto.isPublished());
        data.put("createdAt", toTimestamp(dto.getCreatedAt()));
        data.put("updatedAt", toTimestamp(dto.getUpdatedAt()));
        return data;
    }

    static AssignmentDTO toAssignment(DocumentSnapshot doc) {
        if (doc == null || !doc.exists()) {
            return null;
        }
        AssignmentDTO dto = new AssignmentDTO();
        dto.setId(doc.getString("id"));
        dto.setClassroomId(doc.getString("classroomId"));
        dto.setTitle(doc.getString("title"));
        dto.setDescription(doc.getString("description"));
        dto.setTeacherId(doc.getString("teacherId"));
        dto.setSubject(doc.getString("subject"));
        Timestamp due = doc.getTimestamp("dueDate");
        dto.setDueDate(fromTimestamp(due));
        Long totalPoints = doc.getLong("totalPoints");
        dto.setTotalPoints(totalPoints != null ? totalPoints.intValue() : 0);
        Boolean published = doc.getBoolean("published");
        dto.setPublished(Boolean.TRUE.equals(published));
        dto.setCreatedAt(fromTimestamp(doc.get("createdAt")));
        dto.setUpdatedAt(fromTimestamp(doc.get("updatedAt")));
        return dto;
    }

    static Map<String, Object> toMap(AnnouncementDTO dto) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", dto.getId());
        data.put("classroomId", dto.getClassroomId());
        data.put("title", dto.getTitle());
        data.put("content", dto.getContent());
        data.put("authorId", dto.getAuthorId());
        data.put("authorName", dto.getAuthorName());
        data.put("publishedAt", toTimestamp(dto.getPublishedAt()));
        data.put("archived", dto.isArchived());
        data.put("createdAt", toTimestamp(dto.getCreatedAt()));
        data.put("updatedAt", toTimestamp(dto.getUpdatedAt()));
        return data;
    }

    static AnnouncementDTO toAnnouncement(DocumentSnapshot doc) {
        if (doc == null || !doc.exists()) {
            return null;
        }
        AnnouncementDTO dto = new AnnouncementDTO();
        dto.setId(doc.getString("id"));
        dto.setClassroomId(doc.getString("classroomId"));
        dto.setTitle(doc.getString("title"));
        dto.setContent(doc.getString("content"));
        dto.setAuthorId(doc.getString("authorId"));
        dto.setAuthorName(doc.getString("authorName"));
        dto.setPublishedAt(fromTimestamp(doc.get("publishedAt")));
        Boolean archived = doc.getBoolean("archived");
        dto.setArchived(Boolean.TRUE.equals(archived));
        dto.setCreatedAt(fromTimestamp(doc.get("createdAt")));
        dto.setUpdatedAt(fromTimestamp(doc.get("updatedAt")));
        return dto;
    }

    static LocalDateTime fromTimestamp(Object value) {
        if (value instanceof Timestamp ts) {
            return LocalDateTime.ofInstant(ts.toDate().toInstant(), ZoneOffset.UTC);
        }
        return null;
    }

    static Timestamp toTimestamp(LocalDateTime dateTime) {
        if (dateTime == null) {
            return null;
        }
        return Timestamp.of(java.util.Date.from(dateTime.toInstant(ZoneOffset.UTC)));
    }
}