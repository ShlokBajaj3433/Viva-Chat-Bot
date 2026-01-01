package com.example.admin.service.impl;

import com.example.admin.dto.AssignmentDTO;
import com.example.admin.repository.AssignmentRepository;
import com.example.admin.service.AssignmentService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentServiceImpl(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public AssignmentDTO createAssignment(AssignmentDTO assignmentDTO) {
        if (assignmentDTO.getId() == null || assignmentDTO.getId().isBlank()) {
            assignmentDTO.setId("assignment-" + System.nanoTime());
        }
        assignmentDTO.setCreatedAt(Optional.ofNullable(assignmentDTO.getCreatedAt()).orElse(LocalDateTime.now()));
        assignmentDTO.setUpdatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignmentDTO);
    }

    @Override
    public Optional<AssignmentDTO> getAssignmentById(String id) {
        return assignmentRepository.findById(id);
    }

    @Override
    public List<AssignmentDTO> getAssignmentsByClassroomId(String classroomId) {
        return assignmentRepository.findByClassroomId(classroomId);
    }

    @Override
    public List<AssignmentDTO> getAssignmentsByTeacherId(String teacherId) {
        return assignmentRepository.findByTeacherId(teacherId);
    }

    @Override
    public AssignmentDTO updateAssignment(String id, AssignmentDTO assignmentDTO) {
        AssignmentDTO existing = assignmentRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        assignmentDTO.setId(id);
        assignmentDTO.setCreatedAt(existing.getCreatedAt());
        assignmentDTO.setUpdatedAt(LocalDateTime.now());
        assignmentRepository.update(id, assignmentDTO);
        return assignmentDTO;
    }

    @Override
    public void deleteAssignment(String id) {
        assignmentRepository.delete(id);
    }

    @Override
    public void publishAssignment(String id) {
        assignmentRepository.findById(id).ifPresent(a -> {
            a.setPublished(true);
            a.setUpdatedAt(LocalDateTime.now());
            assignmentRepository.update(id, a);
        });
    }

    @Override
    public void unpublishAssignment(String id) {
        assignmentRepository.findById(id).ifPresent(a -> {
            a.setPublished(false);
            a.setUpdatedAt(LocalDateTime.now());
            assignmentRepository.update(id, a);
        });
    }
}
