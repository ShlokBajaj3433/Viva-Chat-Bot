package com.example.admin.service;

import com.example.admin.dto.BulkTeacherUploadResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for handling bulk teacher operations
 */
public interface BulkTeacherService {

    /**
     * Process Excel file and create teachers
     * @param file Excel file with teacher data
     * @param creatorUid UID of the admin creating these teachers
     * @return Upload result with created teacher credentials
     */
    BulkTeacherUploadResult processExcelUpload(MultipartFile file, String creatorUid);

    /**
     * Generate Excel template for bulk teacher upload
     * @return byte array of Excel file
     */
    byte[] generateTemplate();

    /**
     * Download teacher credentials as Excel
     * @param uploadResult Result containing teacher credentials
     * @return byte array of Excel file with credentials
     */
    byte[] generateCredentialsExcel(BulkTeacherUploadResult uploadResult);
}
