package com.example.admin.repository;

import com.example.admin.dto.AnnouncementDTO;
import java.util.List;
import java.util.Optional;

public interface AnnouncementRepository {
    AnnouncementDTO save(AnnouncementDTO announcementDTO);
    Optional<AnnouncementDTO> findById(String id);
    List<AnnouncementDTO> findByClassroomId(String classroomId);
    List<AnnouncementDTO> findByAuthorId(String authorId);
    List<AnnouncementDTO> findAll();
    void update(String id, AnnouncementDTO announcementDTO);
    void delete(String id);
}
