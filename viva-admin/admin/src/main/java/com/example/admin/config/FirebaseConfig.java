package com.example.admin.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.Firestore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
@Profile("!test")
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() {
        List<FirebaseApp> apps = FirebaseApp.getApps();
        if (apps != null && !apps.isEmpty()) {
            return apps.get(0);
        }

        try {
            String projectId = getEnv("FIREBASE_PROJECT_ID");
            String clientEmail = getEnv("FIREBASE_CLIENT_EMAIL");
            String privateKey = getEnv("FIREBASE_PRIVATE_KEY");

            GoogleCredentials credentials = null;

            if (projectId != null && clientEmail != null && privateKey != null) {
                // Replace escaped newlines as commonly stored in env vars
                privateKey = privateKey.replace("\\n", "\n");

                String json = "{" +
                        "\"type\":\"service_account\"," +
                        "\"project_id\":\"" + projectId + "\"," +
                        "\"private_key_id\":\"env\"," +
                        "\"private_key\":\"" + escapeJson(privateKey) + "\"," +
                        "\"client_email\":\"" + clientEmail + "\"," +
                        "\"client_id\":\"env\"," +
                        "\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\"," +
                        "\"token_uri\":\"https://oauth2.googleapis.com/token\"," +
                        "\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\"," +
                        "\"client_x509_cert_url\":\"\"" +
                        "}";
                try (InputStream is = new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8))) {
                    credentials = GoogleCredentials.fromStream(is);
                }
            }

            if (credentials == null) {
                // Fallback to GOOGLE_APPLICATION_CREDENTIALS or application default
                String credsPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
                if (credsPath != null && !credsPath.isBlank()) {
                    try (InputStream is = new FileInputStream(credsPath)) {
                        credentials = GoogleCredentials.fromStream(is);
                    }
                } else {
                    credentials = GoogleCredentials.getApplicationDefault();
                }
            }

            FirebaseOptions.Builder builder = FirebaseOptions.builder()
                    .setCredentials(credentials);
            if (projectId != null && !projectId.isBlank()) {
                builder.setProjectId(projectId);
            }

            FirebaseOptions options = builder.build();
            FirebaseApp app = FirebaseApp.initializeApp(options);
            System.out.println("Firebase initialized for project: " + (projectId != null ? projectId : "(default)"));
            return app;
        } catch (Exception e) {
            throw new IllegalStateException("Failed to initialize Firebase: " + e.getMessage(), e);
        }
    }

    @Bean
    public Firestore firestore(FirebaseApp app) {
        return FirestoreClient.getFirestore(app);
    }

    private static String getEnv(String key) {
        String value = System.getenv(key);
        if (value == null) {
            value = System.getProperty(key);
        }
        return value;
    }

    private static String escapeJson(String input) {
        return input
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n");
    }
}
