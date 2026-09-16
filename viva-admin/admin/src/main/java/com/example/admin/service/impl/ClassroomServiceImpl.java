package com.example.admin.service.impl;

import com.example.admin.dto.ClassroomDTO;
import com.example.admin.dto.UserDTO;
import com.example.admin.repository.ClassroomRepository;
import com.example.admin.repository.UserRepository;
import com.example.admin.service.ClassroomService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final UserRepository userRepository;

    public ClassroomServiceImpl(ClassroomRepository classroomRepository, UserRepository userRepository) {
        this.classroomRepository = classroomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ClassroomDTO createClassroom(ClassroomDTO classroomDTO) {
        if (classroomDTO.getId() == null || classroomDTO.getId().isBlank()) {
            classroomDTO.setId("classroom-" + System.nanoTime());
        }
        // Use document ID as the classroom code
        classroomDTO.setCode(classroomDTO.getId());
        
        // Fetch and set teacher name from teacherId
        if (classroomDTO.getTeacherId() != null && !classroomDTO.getTeacherId().isBlank()) {
            Optional<UserDTO> teacher = userRepository.findById(classroomDTO.getTeacherId());
            if (teacher.isPresent()) {
                classroomDTO.setTeacherName(teacher.get().getDisplayName());
            }
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
    public Optional<ClassroomDTO> getClassroomByCode(String code) {
        return classroomRepository.findByCode(code.toUpperCase());
    }

    @Override
    public ClassroomDTO joinClassroomByCode(String code, String studentId) {
        // Find classroom by document ID (code is the same as ID)
        Optional<ClassroomDTO> classroomOpt = classroomRepository.findById(code.trim());
        if (classroomOpt.isEmpty()) {
            throw new IllegalArgumentException("Classroom not found. Please check the classroom ID.");
        }

        ClassroomDTO classroom = classroomOpt.get();

        // Check if student is already enrolled
        if (classroom.getStudentIds() != null && classroom.getStudentIds().contains(studentId)) {
            throw new IllegalArgumentException("You are already enrolled in this classroom.");
        }

        // Add student to classroom
        classroomRepository.addStudent(classroom.getId(), studentId);

        // Return updated classroom
        return classroomRepository.findById(classroom.getId()).orElse(classroom);
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
        
        // Fetch and set teacher name from teacherId if provided
        if (classroomDTO.getTeacherId() != null && !classroomDTO.getTeacherId().isBlank()) {
            Optional<UserDTO> teacher = userRepository.findById(classroomDTO.getTeacherId());
            if (teacher.isPresent()) {
                classroomDTO.setTeacherName(teacher.get().getDisplayName());
            }
        } else if (existing.getTeacherName() != null) {
            // Preserve existing teacher name if teacherId not provided
            classroomDTO.setTeacherName(existing.getTeacherName());
        }
        
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
