package com.example.admin.service.impl;

import com.example.admin.dto.AnnouncementDTO;
import com.example.admin.repository.AnnouncementRepository;
import com.example.admin.service.AnnouncementService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementServiceImpl(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @Override
    public AnnouncementDTO createAnnouncement(AnnouncementDTO announcementDTO) {
        if (announcementDTO.getId() == null || announcementDTO.getId().isBlank()) {
            announcementDTO.setId("announcement-" + System.nanoTime());
        }
        announcementDTO.setCreatedAt(Optional.ofNullable(announcementDTO.getCreatedAt()).orElse(LocalDateTime.now()));
        announcementDTO.setUpdatedAt(LocalDateTime.now());
        return announcementRepository.save(announcementDTO);
    }

    @Override
    public Optional<AnnouncementDTO> getAnnouncementById(String id) {
        return announcementRepository.findById(id);
    }

    @Override
    public List<AnnouncementDTO> getAnnouncementsByClassroomId(String classroomId) {
        return announcementRepository.findByClassroomId(classroomId);
    }

    @Override
    public List<AnnouncementDTO> getAnnouncementsByAuthorId(String authorId) {
        return announcementRepository.findByAuthorId(authorId);
    }

    @Override
    public AnnouncementDTO updateAnnouncement(String id, AnnouncementDTO announcementDTO) {
        AnnouncementDTO existing = announcementRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        announcementDTO.setId(id);
        announcementDTO.setCreatedAt(existing.getCreatedAt());
        announcementDTO.setUpdatedAt(LocalDateTime.now());
        announcementRepository.update(id, announcementDTO);
        return announcementDTO;
    }

    @Override
    public void deleteAnnouncement(String id) {
        announcementRepository.delete(id);
    }

    @Override
    public void archiveAnnouncement(String id) {
        announcementRepository.findById(id).ifPresent(a -> {
            a.setArchived(true);
            a.setUpdatedAt(LocalDateTime.now());
            announcementRepository.update(id, a);
        });
    }

    @Override
    public void unarchiveAnnouncement(String id) {
        announcementRepository.findById(id).ifPresent(a -> {
            a.setArchived(false);
            a.setUpdatedAt(LocalDateTime.now());
            announcementRepository.update(id, a);
        });
    }
}
