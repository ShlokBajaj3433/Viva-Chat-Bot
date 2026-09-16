package com.example.admin.repository.impl;

import com.example.admin.dto.AnnouncementDTO;
import com.example.admin.repository.AnnouncementRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import static com.example.admin.repository.impl.FirestoreConverters.toAnnouncement;
import static com.example.admin.repository.impl.FirestoreConverters.toMap;

@Repository
public class FirestoreAnnouncementRepository implements AnnouncementRepository {

    private static final String COLLECTION = "announcements";

    private final Firestore firestore;

    public FirestoreAnnouncementRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public AnnouncementDTO save(AnnouncementDTO announcementDTO) {
        try {
            if (announcementDTO.getId() == null || announcementDTO.getId().isBlank()) {
                announcementDTO.setId("announcement-" + System.nanoTime());
            }
            if (announcementDTO.getCreatedAt() == null) {
                announcementDTO.setCreatedAt(LocalDateTime.now());
            }
            announcementDTO.setUpdatedAt(LocalDateTime.now());
            DocumentReference ref = firestore.collection(COLLECTION).document(announcementDTO.getId());
            ref.set(toMap(announcementDTO)).get();
            return announcementDTO;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to save announcement", e);
        }
    }

    @Override
    public Optional<AnnouncementDTO> findById(String id) {
        try {
            DocumentSnapshot doc = firestore.collection(COLLECTION).document(id).get().get();
            return Optional.ofNullable(toAnnouncement(doc));
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find announcement", e);
        }
    }

    @Override
    public List<AnnouncementDTO> findByClassroomId(String classroomId) {
        return queryList(firestore.collection(COLLECTION).whereEqualTo("classroomId", classroomId));
    }

    @Override
    public List<AnnouncementDTO> findByAuthorId(String authorId) {
        return queryList(firestore.collection(COLLECTION).whereEqualTo("authorId", authorId));
    }

    @Override
    public List<AnnouncementDTO> findAll() {
        try {
            List<AnnouncementDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : firestore.collection(COLLECTION).get().get().getDocuments()) {
                AnnouncementDTO dto = toAnnouncement(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to list announcements", e);
        }
    }

    @Override
    public void update(String id, AnnouncementDTO announcementDTO) {
        try {
            announcementDTO.setId(id);
            announcementDTO.setUpdatedAt(LocalDateTime.now());
            firestore.collection(COLLECTION).document(id).set(toMap(announcementDTO)).get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to update announcement", e);
        }
    }

    @Override
    public void delete(String id) {
        try {
            firestore.collection(COLLECTION).document(id).delete().get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to delete announcement", e);
        }
    }

    private List<AnnouncementDTO> queryList(Query query) {
        try {
            ApiFuture<QuerySnapshot> future = query.get();
            List<AnnouncementDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
                AnnouncementDTO dto = toAnnouncement(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to query announcements", e);
        }
    }
}