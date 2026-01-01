package com.example.admin.controller;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/firebase")
public class FirebaseHealthController {

    private final Firestore firestore;

    public FirebaseHealthController(Firestore firestore) {
        this.firestore = firestore;
    }

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> result = new HashMap<>();
        try {
            // Simple check: count documents in classrooms collection (if exists)
            QuerySnapshot snapshot = firestore.collection("classrooms").get().get();
            result.put("ok", true);
            result.put("classroomsCount", snapshot.size());
        } catch (Exception e) {
            result.put("ok", false);
            result.put("error", e.getMessage());
        }
        return ResponseEntity.ok(result);
    }
}
