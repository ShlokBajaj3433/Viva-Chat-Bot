package com.example.admin.repository;

import com.example.admin.dto.ClassroomDTO;
import java.util.List;
import java.util.Optional;

public interface ClassroomRepository {
    ClassroomDTO save(ClassroomDTO classroomDTO);
    Optional<ClassroomDTO> findById(String id);
    Optional<ClassroomDTO> findByCode(String code);
    List<ClassroomDTO> findByTeacherId(String teacherId);
    List<ClassroomDTO> findAll();
    void update(String id, ClassroomDTO classroomDTO);
    void delete(String id);
    void addStudent(String classroomId, String studentId);
    void removeStudent(String classroomId, String studentId);
}
