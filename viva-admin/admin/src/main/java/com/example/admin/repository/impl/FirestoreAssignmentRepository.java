package com.example.admin.repository.impl;

import com.example.admin.dto.AssignmentDTO;
import com.example.admin.repository.AssignmentRepository;
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

import static com.example.admin.repository.impl.FirestoreConverters.toAssignment;
import static com.example.admin.repository.impl.FirestoreConverters.toMap;

@Repository
public class FirestoreAssignmentRepository implements AssignmentRepository {

    private static final String COLLECTION = "assignments";

    private final Firestore firestore;

    public FirestoreAssignmentRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public AssignmentDTO save(AssignmentDTO assignmentDTO) {
        try {
            if (assignmentDTO.getId() == null || assignmentDTO.getId().isBlank()) {
                assignmentDTO.setId("assignment-" + System.nanoTime());
            }
            if (assignmentDTO.getCreatedAt() == null) {
                assignmentDTO.setCreatedAt(LocalDateTime.now());
            }
            assignmentDTO.setUpdatedAt(LocalDateTime.now());
            DocumentReference ref = firestore.collection(COLLECTION).document(assignmentDTO.getId());
            ref.set(toMap(assignmentDTO)).get();
            return assignmentDTO;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to save assignment", e);
        }
    }

    @Override
    public Optional<AssignmentDTO> findById(String id) {
        try {
            DocumentSnapshot doc = firestore.collection(COLLECTION).document(id).get().get();
            return Optional.ofNullable(toAssignment(doc));
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find assignment", e);
        }
    }

    @Override
    public List<AssignmentDTO> findByClassroomId(String classroomId) {
        return queryList(firestore.collection(COLLECTION).whereEqualTo("classroomId", classroomId));
    }

    @Override
    public List<AssignmentDTO> findByTeacherId(String teacherId) {
        return queryList(firestore.collection(COLLECTION).whereEqualTo("teacherId", teacherId));
    }

    @Override
    public List<AssignmentDTO> findAll() {
        try {
            List<AssignmentDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : firestore.collection(COLLECTION).get().get().getDocuments()) {
                AssignmentDTO dto = toAssignment(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to list assignments", e);
        }
    }

    @Override
    public void update(String id, AssignmentDTO assignmentDTO) {
        try {
            assignmentDTO.setId(id);
            assignmentDTO.setUpdatedAt(LocalDateTime.now());
            firestore.collection(COLLECTION).document(id).set(toMap(assignmentDTO)).get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to update assignment", e);
        }
    }

    @Override
    public void delete(String id) {
        try {
            firestore.collection(COLLECTION).document(id).delete().get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to delete assignment", e);
        }
    }

    private List<AssignmentDTO> queryList(Query query) {
        try {
            ApiFuture<QuerySnapshot> future = query.get();
            List<AssignmentDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
                AssignmentDTO dto = toAssignment(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to query assignments", e);
        }
    }
}