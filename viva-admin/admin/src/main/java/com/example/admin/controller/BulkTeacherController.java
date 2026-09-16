package com.example.admin.controller;

import com.example.admin.dto.BulkTeacherUploadResult;
import com.example.admin.security.JwtAuthDetails;
import com.example.admin.service.BulkTeacherService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/teachers")
public class BulkTeacherController {

    private final BulkTeacherService bulkTeacherService;

    public BulkTeacherController(BulkTeacherService bulkTeacherService) {
        this.bulkTeacherService = bulkTeacherService;
    }

    /**
     * Upload Excel file to bulk create teachers
     * Only accessible by SUPER_ADMIN and ADMIN
     */
    @PostMapping("/bulk-upload")
    public ResponseEntity<BulkTeacherUploadResult> uploadTeachers(
            @RequestParam("file") MultipartFile file) {
        
        try {
            // Get authenticated user details
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !(authentication.getDetails() instanceof JwtAuthDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(BulkTeacherUploadResult.error("Unauthorized access"));
            }

            JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
            String role = authDetails.getRole();
            
            // Check if user has permission to create teachers
            if (!"SUPER_ADMIN".equals(role) && !"ADMIN".equals(role)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(BulkTeacherUploadResult.error("Only SUPER_ADMIN and ADMIN can create teachers"));
            }

            String creatorUid = authDetails.getUid();
            BulkTeacherUploadResult result = bulkTeacherService.processExcelUpload(file, creatorUid);
            
            if (!result.isSuccess()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BulkTeacherUploadResult.error("Upload failed: " + e.getMessage()));
        }
    }

    /**
     * Download Excel template for bulk teacher upload
     * Accessible by SUPER_ADMIN and ADMIN
     */
    @GetMapping("/bulk-upload-template")
    public ResponseEntity<byte[]> downloadTemplate() {
        try {
            // Get authenticated user details
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !(authentication.getDetails() instanceof JwtAuthDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
            String role = authDetails.getRole();
            
            // Check if user has permission
            if (!"SUPER_ADMIN".equals(role) && !"ADMIN".equals(role)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            byte[] excelBytes = bulkTeacherService.generateTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "teacher_upload_template.xlsx");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(excelBytes);
                    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Download teacher credentials as Excel
     * Accessible by SUPER_ADMIN and ADMIN
     */
    @PostMapping("/download-credentials")
    public ResponseEntity<byte[]> downloadCredentials(
            @RequestBody BulkTeacherUploadResult uploadResult) {
        
        try {
            // Get authenticated user details
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !(authentication.getDetails() instanceof JwtAuthDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            JwtAuthDetails authDetails = (JwtAuthDetails) authentication.getDetails();
            String role = authDetails.getRole();
            
            // Check if user has permission
            if (!"SUPER_ADMIN".equals(role) && !"ADMIN".equals(role)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            byte[] excelBytes = bulkTeacherService.generateCredentialsExcel(uploadResult);
            
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String filename = "teacher_credentials_" + timestamp + ".xlsx";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", filename);
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(excelBytes);
                    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
