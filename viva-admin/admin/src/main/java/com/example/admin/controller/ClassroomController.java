package com.example.admin.controller;

import com.example.admin.dto.ClassroomDTO;
import com.example.admin.dto.JoinClassroomRequest;
import com.example.admin.service.ClassroomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping
    public ResponseEntity<ClassroomDTO> createClassroom(@RequestBody ClassroomDTO classroomDTO) {
        ClassroomDTO created = classroomService.createClassroom(classroomDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomDTO> getClassroomById(@PathVariable String id) {
        Optional<ClassroomDTO> classroom = classroomService.getClassroomById(id);
        return classroom.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ClassroomDTO> getClassroomByCode(@PathVariable String code) {
        Optional<ClassroomDTO> classroom = classroomService.getClassroomByCode(code);
        return classroom.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/join")
    public ResponseEntity<ClassroomDTO> joinClassroomByCode(@RequestBody JoinClassroomRequest request) {
        try {
            ClassroomDTO classroom = classroomService.joinClassroomByCode(request.getCode(), request.getStudentId());
            return ResponseEntity.ok(classroom);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<ClassroomDTO>> getClassroomsByTeacherId(@PathVariable String teacherId) {
        List<ClassroomDTO> classrooms = classroomService.getClassroomsByTeacherId(teacherId);
        return ResponseEntity.ok(classrooms);
    }

    @GetMapping
    public ResponseEntity<List<ClassroomDTO>> getAllClassrooms() {
        List<ClassroomDTO> classrooms = classroomService.getAllClassrooms();
        return ResponseEntity.ok(classrooms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassroomDTO> updateClassroom(@PathVariable String id, @RequestBody ClassroomDTO classroomDTO) {
        ClassroomDTO updated = classroomService.updateClassroom(id, classroomDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable String id) {
        classroomService.deleteClassroom(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{classroomId}/students/{studentId}")
    public ResponseEntity<Void> addStudentToClassroom(@PathVariable String classroomId, @PathVariable String studentId) {
        classroomService.addStudentToClassroom(classroomId, studentId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{classroomId}/students/{studentId}")
    public ResponseEntity<Void> removeStudentFromClassroom(@PathVariable String classroomId, @PathVariable String studentId) {
        classroomService.removeStudentFromClassroom(classroomId, studentId);
        return ResponseEntity.noContent().build();
    }
}
