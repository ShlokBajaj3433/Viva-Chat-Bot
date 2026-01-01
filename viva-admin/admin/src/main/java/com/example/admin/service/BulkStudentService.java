package com.example.admin.service;

import com.example.admin.dto.BulkStudentUploadResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for handling bulk student operations
 */
public interface BulkStudentService {
    
    /**
     * Process Excel file and create students
     * @param file Excel file with student data
     * @param classroomId Optional classroom to assign students to
     * @return Result containing created students with credentials
     */
    BulkStudentUploadResult processExcelUpload(MultipartFile file, String classroomId);
    
    /**
     * Generate a secure random password
     * @return Generated password
     */
    String generateSecurePassword();
    
    /**
     * Generate a unique student ID
     * @param prefix Optional prefix for the ID
     * @return Generated student ID
     */
    String generateStudentId(String prefix);
}
