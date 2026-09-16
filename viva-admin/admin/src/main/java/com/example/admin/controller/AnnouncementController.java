package com.example.admin.controller;

import com.example.admin.dto.AnnouncementDTO;
import com.example.admin.service.AnnouncementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping
    public ResponseEntity<AnnouncementDTO> createAnnouncement(@RequestBody AnnouncementDTO announcementDTO) {
        AnnouncementDTO created = announcementService.createAnnouncement(announcementDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> getAnnouncementById(@PathVariable String id) {
        Optional<AnnouncementDTO> announcement = announcementService.getAnnouncementById(id);
        return announcement.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/classroom/{classroomId}")
    public ResponseEntity<List<AnnouncementDTO>> getAnnouncementsByClassroomId(@PathVariable String classroomId) {
        List<AnnouncementDTO> announcements = announcementService.getAnnouncementsByClassroomId(classroomId);
        return ResponseEntity.ok(announcements);
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<AnnouncementDTO>> getAnnouncementsByAuthorId(@PathVariable String authorId) {
        List<AnnouncementDTO> announcements = announcementService.getAnnouncementsByAuthorId(authorId);
        return ResponseEntity.ok(announcements);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(@PathVariable String id, @RequestBody AnnouncementDTO announcementDTO) {
        AnnouncementDTO updated = announcementService.updateAnnouncement(id, announcementDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable String id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<Void> archiveAnnouncement(@PathVariable String id) {
        announcementService.archiveAnnouncement(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/unarchive")
    public ResponseEntity<Void> unarchiveAnnouncement(@PathVariable String id) {
        announcementService.unarchiveAnnouncement(id);
        return ResponseEntity.ok().build();
    }
}
