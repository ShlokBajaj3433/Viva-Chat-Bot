package com.example.admin.service;

import com.example.admin.dto.AnnouncementDTO;
import java.util.List;
import java.util.Optional;

public interface AnnouncementService {
    AnnouncementDTO createAnnouncement(AnnouncementDTO announcementDTO);
    Optional<AnnouncementDTO> getAnnouncementById(String id);
    List<AnnouncementDTO> getAnnouncementsByClassroomId(String classroomId);
    List<AnnouncementDTO> getAnnouncementsByAuthorId(String authorId);
    AnnouncementDTO updateAnnouncement(String id, AnnouncementDTO announcementDTO);
    void deleteAnnouncement(String id);
    void archiveAnnouncement(String id);
    void unarchiveAnnouncement(String id);
}
