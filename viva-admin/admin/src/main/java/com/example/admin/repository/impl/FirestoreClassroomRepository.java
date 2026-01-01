package com.example.admin.repository.impl;

import com.example.admin.dto.ClassroomDTO;
import com.example.admin.repository.ClassroomRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
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

import static com.example.admin.repository.impl.FirestoreConverters.toClassroom;
import static com.example.admin.repository.impl.FirestoreConverters.toMap;

@Repository
public class FirestoreClassroomRepository implements ClassroomRepository {

    private static final String COLLECTION = "classrooms";

    private final Firestore firestore;

    public FirestoreClassroomRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public ClassroomDTO save(ClassroomDTO classroomDTO) {
        try {
            if (classroomDTO.getId() == null || classroomDTO.getId().isBlank()) {
                classroomDTO.setId("classroom-" + System.nanoTime());
            }
            if (classroomDTO.getCreatedAt() == null) {
                classroomDTO.setCreatedAt(LocalDateTime.now());
            }
            classroomDTO.setUpdatedAt(LocalDateTime.now());
            DocumentReference ref = firestore.collection(COLLECTION).document(classroomDTO.getId());
            ref.set(toMap(classroomDTO)).get();
            return classroomDTO;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to save classroom", e);
        }
    }

    @Override
    public Optional<ClassroomDTO> findById(String id) {
        try {
            DocumentSnapshot doc = firestore.collection(COLLECTION).document(id).get().get();
            return Optional.ofNullable(toClassroom(doc));
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find classroom", e);
        }
    }

    @Override
    public List<ClassroomDTO> findByTeacherId(String teacherId) {
        try {
            Query query = firestore.collection(COLLECTION).whereEqualTo("teacherId", teacherId);
            ApiFuture<QuerySnapshot> future = query.get();
            List<ClassroomDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
                ClassroomDTO dto = toClassroom(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find classrooms by teacher", e);
        }
    }

    @Override
    public List<ClassroomDTO> findAll() {
        try {
            List<ClassroomDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : firestore.collection(COLLECTION).get().get().getDocuments()) {
                ClassroomDTO dto = toClassroom(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to list classrooms", e);
        }
    }

    @Override
    public void update(String id, ClassroomDTO classroomDTO) {
        try {
            classroomDTO.setId(id);
            classroomDTO.setUpdatedAt(LocalDateTime.now());
            firestore.collection(COLLECTION).document(id).set(toMap(classroomDTO)).get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to update classroom", e);
        }
    }

    @Override
    public void delete(String id) {
        try {
            firestore.collection(COLLECTION).document(id).delete().get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to delete classroom", e);
        }
    }

    @Override
    public void addStudent(String classroomId, String studentId) {
        try {
            firestore.collection(COLLECTION)
                    .document(classroomId)
                    .update("studentIds", FieldValue.arrayUnion(studentId),
                            "updatedAt", com.google.cloud.Timestamp.now())
                    .get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to add student", e);
        }
    }

    @Override
    public void removeStudent(String classroomId, String studentId) {
        try {
            firestore.collection(COLLECTION)
                    .document(classroomId)
                    .update("studentIds", FieldValue.arrayRemove(studentId),
                            "updatedAt", com.google.cloud.Timestamp.now())
                    .get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to remove student", e);
        }
    }
}