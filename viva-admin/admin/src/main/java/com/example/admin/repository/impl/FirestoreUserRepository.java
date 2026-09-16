package com.example.admin.repository.impl;

import com.example.admin.dto.UserDTO;
import com.example.admin.repository.UserRepository;
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

import static com.example.admin.repository.impl.FirestoreConverters.toMap;
import static com.example.admin.repository.impl.FirestoreConverters.toMapWithPassword;
import static com.example.admin.repository.impl.FirestoreConverters.toUser;

@Repository
public class FirestoreUserRepository implements UserRepository {

    private static final String COLLECTION = "users";

    private final Firestore firestore;

    public FirestoreUserRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public UserDTO save(UserDTO userDTO) {
        try {
            if (userDTO.getUid() == null || userDTO.getUid().isBlank()) {
                userDTO.setUid("user-" + System.nanoTime());
            }
            if (userDTO.getCreatedAt() == null) {
                userDTO.setCreatedAt(LocalDateTime.now());
            }
            userDTO.setUpdatedAt(LocalDateTime.now());

            DocumentReference ref = firestore.collection(COLLECTION).document(userDTO.getUid());
            ref.set(toMap(userDTO)).get();
            return userDTO;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to save user", e);
        }
    }

    @Override
    public UserDTO saveWithPassword(UserDTO userDTO, String hashedPassword) {
        try {
            if (userDTO.getUid() == null || userDTO.getUid().isBlank()) {
                userDTO.setUid("user-" + System.nanoTime());
            }
            if (userDTO.getCreatedAt() == null) {
                userDTO.setCreatedAt(LocalDateTime.now());
            }
            userDTO.setUpdatedAt(LocalDateTime.now());

            DocumentReference ref = firestore.collection(COLLECTION).document(userDTO.getUid());
            ref.set(toMapWithPassword(userDTO, hashedPassword)).get();
            return userDTO;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to save user with password", e);
        }
    }

    @Override
    public Optional<String> getPasswordHash(String email) {
        try {
            Query query = firestore.collection(COLLECTION).whereEqualTo("email", email).limit(1);
            ApiFuture<QuerySnapshot> future = query.get();
            List<QueryDocumentSnapshot> docs = future.get().getDocuments();
            if (docs.isEmpty()) {
                return Optional.empty();
            }
            return Optional.ofNullable(docs.get(0).getString("passwordHash"));
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to get password hash", e);
        }
    }

    @Override
    public Optional<UserDTO> findById(String uid) {
        try {
            DocumentSnapshot doc = firestore.collection(COLLECTION).document(uid).get().get();
            return Optional.ofNullable(toUser(doc));
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find user by id", e);
        }
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        try {
            Query query = firestore.collection(COLLECTION).whereEqualTo("email", email).limit(1);
            ApiFuture<QuerySnapshot> future = query.get();
            List<QueryDocumentSnapshot> docs = future.get().getDocuments();
            if (docs.isEmpty()) {
                return Optional.empty();
            }
            return Optional.ofNullable(toUser(docs.get(0)));
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find user by email", e);
        }
    }

    @Override
    public List<UserDTO> findAll() {
        try {
            List<UserDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : firestore.collection(COLLECTION).get().get().getDocuments()) {
                UserDTO dto = toUser(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to list users", e);
        }
    }

    @Override
    public void update(String uid, UserDTO userDTO) {
        try {
            userDTO.setUid(uid);
            userDTO.setUpdatedAt(LocalDateTime.now());
            firestore.collection(COLLECTION).document(uid).set(toMap(userDTO)).get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to update user", e);
        }
    }

    @Override
    public void delete(String uid) {
        try {
            firestore.collection(COLLECTION).document(uid).delete().get();
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to delete user", e);
        }
    }

    @Override
    public List<UserDTO> findByRole(String role) {
        try {
            Query query = firestore.collection(COLLECTION).whereEqualTo("role", role);
            ApiFuture<QuerySnapshot> future = query.get();
            List<UserDTO> result = new ArrayList<>();
            for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
                UserDTO dto = toUser(doc);
                if (dto != null) {
                    result.add(dto);
                }
            }
            return result;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to find users by role", e);
        }
    }
}