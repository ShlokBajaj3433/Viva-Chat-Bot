package com.example.admin.controller;

import com.example.admin.dto.BulkStudentUploadResult;
import com.example.admin.enums.UserRole;
import com.example.admin.security.RequireRole;
import com.example.admin.service.BulkStudentService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class BulkStudentController {

    private final BulkStudentService bulkStudentService;

    public BulkStudentController(BulkStudentService bulkStudentService) {
        this.bulkStudentService = bulkStudentService;
    }

    /**
     * Upload Excel file to bulk create students
     * Accessible by SUPER_ADMIN, ADMIN, and TEACHER
     */
    @PostMapping("/bulk-upload")
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER})
    public ResponseEntity<BulkStudentUploadResult> bulkUploadStudents(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "classroomId", required = false) String classroomId) {
        
        BulkStudentUploadResult result = bulkStudentService.processExcelUpload(file, classroomId);
        
        if (!result.isOk()) {
            return ResponseEntity.badRequest().body(result);
        }
        
        return ResponseEntity.ok(result);
    }

    /**
     * Download Excel template for student upload
     * Accessible by SUPER_ADMIN, ADMIN, and TEACHER
     */
    @GetMapping("/template")
    @RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER})
    public ResponseEntity<byte[]> downloadTemplate() {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Students");
            
            // Create header row with styling
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Student Name *", "Email *", "Roll Number *"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 6000);
            }
            
            // Add sample rows
            String[][] sampleData = {
                {"Rajesh Kumar", "rajesh.kumar@example.com", "ADT23SOCB0000"},
                {"Priya Singh", "priya.singh@example.com", "ADT23SOCB0001"},
                {"Arjun Patel", "arjun.patel@example.com", "ADT23SOCB0002"}
            };
            
            for (int i = 0; i < sampleData.length; i++) {
                Row row = sheet.createRow(i + 1);
                for (int j = 0; j < sampleData[i].length; j++) {
                    row.createCell(j).setCellValue(sampleData[i][j]);
                }
            }
            
            // Add instructions sheet
            Sheet instructionSheet = workbook.createSheet("Instructions");
            String[] instructions = {
                "VIVA Student Bulk Upload Template",
                "",
                "Instructions:",
                "1. Fill in student details in the 'Students' sheet",
                "2. All fields marked with * are REQUIRED",
                "3. 'Student Name' - Full name of the student",
                "4. 'Email' - Student's email address (used for login)",
                "5. 'Roll Number' - Student's roll number or enrollment ID",
                "",
                "Notes:",
                "- Secure passwords will be auto-generated for each student",
                "- After upload, download the credentials file to share with students",
                "- Students must change their password on first login",
                "",
                "Column Details:",
                "- Student Name: Full name of the student (Required)",
                "- Email: Student's email address (used for login)",
                "- Roll Number: Student's roll number or enrollment ID"
            };
            
            for (int i = 0; i < instructions.length; i++) {
                Row row = instructionSheet.createRow(i);
                Cell cell = row.createCell(0);
                cell.setCellValue(instructions[i]);
                if (i == 0) {
                    CellStyle titleStyle = workbook.createCellStyle();
                    Font titleFont = workbook.createFont();
                    titleFont.setBold(true);
                    titleFont.setFontHeightInPoints((short) 14);
                    titleStyle.setFont(titleFont);
                    cell.setCellStyle(titleStyle);
                }
            }
            instructionSheet.setColumnWidth(0, 15000);
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            responseHeaders.setContentDispositionFormData("attachment", "student_upload_template.xlsx");
            
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Download credentials file for uploaded students
     */
    @PostMapping("/credentials-export")
    public ResponseEntity<byte[]> exportCredentials(
            @RequestBody List<BulkStudentUploadResult.StudentCredential> credentials) {
        
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Student Credentials");
            
            // Create header row with styling
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Enrolment No", "Name", "Email", "Roll Number", "Temporary Password"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5000);
            }
            sheet.setColumnWidth(4, 6000); // Wider column for password
            
            // Add student credentials
            int rowNum = 1;
            for (BulkStudentUploadResult.StudentCredential cred : credentials) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(cred.getUid());
                row.createCell(1).setCellValue(cred.getDisplayName());
                row.createCell(2).setCellValue(cred.getEmail());
                row.createCell(3).setCellValue(cred.getRollNumber());
                row.createCell(4).setCellValue(cred.getTemporaryPassword());
            }
            
            // Add warning sheet
            Sheet warningSheet = workbook.createSheet("IMPORTANT");
            CellStyle warningStyle = workbook.createCellStyle();
            Font warningFont = workbook.createFont();
            warningFont.setBold(true);
            warningFont.setColor(IndexedColors.RED.getIndex());
            warningStyle.setFont(warningFont);
            
            String[] warnings = {
                "⚠️ CONFIDENTIAL - HANDLE WITH CARE ⚠️",
                "",
                "This file contains sensitive login credentials.",
                "",
                "Security Guidelines:",
                "1. Do not share this file via email or unsecured channels",
                "2. Distribute credentials to students individually and securely",
                "3. Instruct students to change their password immediately",
                "4. Delete this file after credentials have been distributed",
                "5. Never store this file on shared or public drives",
                "",
                "Each student should:",
                "- Log in using their email and temporary password",
                "- Change their password immediately after first login",
                "- Keep their new password confidential"
            };
            
            for (int i = 0; i < warnings.length; i++) {
                Row row = warningSheet.createRow(i);
                Cell cell = row.createCell(0);
                cell.setCellValue(warnings[i]);
                if (i == 0) {
                    cell.setCellStyle(warningStyle);
                }
            }
            warningSheet.setColumnWidth(0, 15000);
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            responseHeaders.setContentDispositionFormData("attachment", "student_credentials.xlsx");
            
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(outputStream.toByteArray());
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
