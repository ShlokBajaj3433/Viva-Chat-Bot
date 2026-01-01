package com.example.admin.repository;

import com.example.admin.dto.AssignmentDTO;
import java.util.List;
import java.util.Optional;

public interface AssignmentRepository {
    AssignmentDTO save(AssignmentDTO assignmentDTO);
    Optional<AssignmentDTO> findById(String id);
    List<AssignmentDTO> findByClassroomId(String classroomId);
    List<AssignmentDTO> findByTeacherId(String teacherId);
    List<AssignmentDTO> findAll();
    void update(String id, AssignmentDTO assignmentDTO);
    void delete(String id);
}
