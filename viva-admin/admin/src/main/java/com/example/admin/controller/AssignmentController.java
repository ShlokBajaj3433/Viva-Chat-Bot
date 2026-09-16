package com.example.admin.controller;

import com.example.admin.dto.AssignmentDTO;
import com.example.admin.service.AssignmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public ResponseEntity<AssignmentDTO> createAssignment(@RequestBody AssignmentDTO assignmentDTO) {
        AssignmentDTO created = assignmentService.createAssignment(assignmentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<AssignmentDTO>> getAllAssignments() {
        List<AssignmentDTO> assignments = assignmentService.getAllAssignments();
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssignmentDTO> getAssignmentById(@PathVariable String id) {
        Optional<AssignmentDTO> assignment = assignmentService.getAssignmentById(id);
        return assignment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/classroom/{classroomId}")
    public ResponseEntity<List<AssignmentDTO>> getAssignmentsByClassroomId(@PathVariable String classroomId) {
        List<AssignmentDTO> assignments = assignmentService.getAssignmentsByClassroomId(classroomId);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<AssignmentDTO>> getAssignmentsByTeacherId(@PathVariable String teacherId) {
        List<AssignmentDTO> assignments = assignmentService.getAssignmentsByTeacherId(teacherId);
        return ResponseEntity.ok(assignments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssignmentDTO> updateAssignment(@PathVariable String id, @RequestBody AssignmentDTO assignmentDTO) {
        AssignmentDTO updated = assignmentService.updateAssignment(id, assignmentDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable String id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<Void> publishAssignment(@PathVariable String id) {
        assignmentService.publishAssignment(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/unpublish")
    public ResponseEntity<Void> unpublishAssignment(@PathVariable String id) {
        assignmentService.unpublishAssignment(id);
        return ResponseEntity.ok().build();
    }
}
