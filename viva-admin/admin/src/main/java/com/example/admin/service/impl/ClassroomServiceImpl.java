package com.example.admin.service.impl;

import com.example.admin.dto.ClassroomDTO;
import com.example.admin.repository.ClassroomRepository;
import com.example.admin.service.ClassroomService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomServiceImpl(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @Override
    public ClassroomDTO createClassroom(ClassroomDTO classroomDTO) {
        if (classroomDTO.getId() == null || classroomDTO.getId().isBlank()) {
            classroomDTO.setId("classroom-" + System.nanoTime());
        }
        classroomDTO.setCreatedAt(Optional.ofNullable(classroomDTO.getCreatedAt()).orElse(LocalDateTime.now()));
        classroomDTO.setUpdatedAt(LocalDateTime.now());
        return classroomRepository.save(classroomDTO);
    }

    @Override
    public Optional<ClassroomDTO> getClassroomById(String id) {
        return classroomRepository.findById(id);
    }

    @Override
    public List<ClassroomDTO> getClassroomsByTeacherId(String teacherId) {
        return classroomRepository.findByTeacherId(teacherId);
    }

    @Override
    public List<ClassroomDTO> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    @Override
    public ClassroomDTO updateClassroom(String id, ClassroomDTO classroomDTO) {
        ClassroomDTO existing = classroomRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        classroomDTO.setId(id);
        classroomDTO.setCreatedAt(existing.getCreatedAt());
        classroomDTO.setUpdatedAt(LocalDateTime.now());
        classroomRepository.update(id, classroomDTO);
        return classroomDTO;
    }

    @Override
    public void deleteClassroom(String id) {
        classroomRepository.delete(id);
    }

    @Override
    public void addStudentToClassroom(String classroomId, String studentId) {
        classroomRepository.addStudent(classroomId, studentId);
    }

    @Override
    public void removeStudentFromClassroom(String classroomId, String studentId) {
        classroomRepository.removeStudent(classroomId, studentId);
    }
}
