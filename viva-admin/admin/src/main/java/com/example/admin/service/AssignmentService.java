package com.example.admin.service;

import com.example.admin.dto.AssignmentDTO;
import java.util.List;
import java.util.Optional;

public interface AssignmentService {
    AssignmentDTO createAssignment(AssignmentDTO assignmentDTO);
    Optional<AssignmentDTO> getAssignmentById(String id);
    List<AssignmentDTO> getAssignmentsByClassroomId(String classroomId);
    List<AssignmentDTO> getAssignmentsByTeacherId(String teacherId);
    List<AssignmentDTO> getAllAssignments();
    AssignmentDTO updateAssignment(String id, AssignmentDTO assignmentDTO);
    void deleteAssignment(String id);
    void publishAssignment(String id);
    void unpublishAssignment(String id);
}
