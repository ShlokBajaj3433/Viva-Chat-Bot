package com.example.admin.service;

import com.example.admin.dto.ClassroomDTO;
import java.util.List;
import java.util.Optional;

public interface ClassroomService {
    ClassroomDTO createClassroom(ClassroomDTO classroomDTO);
    Optional<ClassroomDTO> getClassroomById(String id);
    Optional<ClassroomDTO> getClassroomByCode(String code);
    ClassroomDTO joinClassroomByCode(String code, String studentId);
    List<ClassroomDTO> getClassroomsByTeacherId(String teacherId);
    List<ClassroomDTO> getAllClassrooms();
    ClassroomDTO updateClassroom(String id, ClassroomDTO classroomDTO);
    void deleteClassroom(String id);
    void addStudentToClassroom(String classroomId, String studentId);
    void removeStudentFromClassroom(String classroomId, String studentId);
}
