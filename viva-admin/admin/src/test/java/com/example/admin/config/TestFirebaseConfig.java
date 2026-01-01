package com.example.admin.config;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
public class TestFirebaseConfig {

    @Bean
    @Primary
    public FirebaseApp firebaseApp() {
        return Mockito.mock(FirebaseApp.class);
    }

    @Bean
    @Primary
    public Firestore firestore() {
        return Mockito.mock(Firestore.class);
    }
}