package com.example.admin.service.impl;

import com.example.admin.dto.BulkStudentUploadResult;
import com.example.admin.dto.BulkStudentUploadResult.StudentCredential;
import com.example.admin.dto.BulkStudentUploadResult.FailedStudent;
import com.example.admin.dto.ClassroomDTO;
import com.example.admin.dto.UserDTO;
import com.example.admin.enums.UserRole;
import com.example.admin.repository.ClassroomRepository;
import com.example.admin.repository.UserRepository;
import com.example.admin.service.BulkStudentService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class BulkStudentServiceImpl implements BulkStudentService {

    private final UserRepository userRepository;
    private final ClassroomRepository classroomRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SecureRandom secureRandom;
    private final AtomicInteger counter;

    // Characters for password generation (avoiding ambiguous characters like 0, O, l, 1)
    private static final String PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    private static final int PASSWORD_LENGTH = 12;

    public BulkStudentServiceImpl(UserRepository userRepository, ClassroomRepository classroomRepository) {
        this.userRepository = userRepository;
        this.classroomRepository = classroomRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.secureRandom = new SecureRandom();
        this.counter = new AtomicInteger((int) (System.currentTimeMillis() % 10000));
    }

    @Override
    public BulkStudentUploadResult processExcelUpload(MultipartFile file, String classroomId) {
        if (file == null || file.isEmpty()) {
            return BulkStudentUploadResult.error("No file uploaded or file is empty");
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null || (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls"))) {
            return BulkStudentUploadResult.error("Invalid file format. Please upload an Excel file (.xlsx or .xls)");
        }

        List<StudentCredential> createdStudents = new ArrayList<>();
        List<FailedStudent> failedStudents = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            
            if (sheet.getPhysicalNumberOfRows() <= 1) {
                return BulkStudentUploadResult.error("Excel file is empty or contains only headers");
            }

            // Get header row to identify columns
            Row headerRow = sheet.getRow(0);
            int emailCol = -1, nameCol = -1, rollCol = -1;
            
            for (int i = 0; i < headerRow.getLastCellNum(); i++) {
                Cell cell = headerRow.getCell(i);
                if (cell != null) {
                    String header = getCellValueAsString(cell).toLowerCase().trim();
                    if (header.contains("email")) emailCol = i;
                    else if (header.contains("name") || header.contains("student")) nameCol = i;
                    else if (header.contains("roll") || header.contains("id") || header.contains("number")) rollCol = i;
                }
            }

            if (nameCol == -1) {
                return BulkStudentUploadResult.error("Required column 'Name' not found in Excel. Please include a 'Name' or 'Student Name' column.");
            }
            if (emailCol == -1) {
                return BulkStudentUploadResult.error("Required column 'Email' not found in Excel. Please include an 'Email' column.");
            }
            if (rollCol == -1) {
                return BulkStudentUploadResult.error("Required column 'Roll Number' not found in Excel. Please include a 'Roll Number' or 'Roll No' column.");
            }

            // Process each data row
            for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {
                Row row = sheet.getRow(rowNum);
                if (row == null) continue;

                String name = nameCol >= 0 ? getCellValueAsString(row.getCell(nameCol)).trim() : "";
                String email = emailCol >= 0 ? getCellValueAsString(row.getCell(emailCol)).trim() : "";
                String rollNumber = rollCol >= 0 ? getCellValueAsString(row.getCell(rollCol)).trim() : "";

                // Skip empty rows
                if (name.isEmpty()) continue;

                // Validate required fields
                if (email.isEmpty()) {
                    failedStudents.add(new FailedStudent(rowNum + 1, "", name, "Email is required"));
                    continue;
                }
                if (rollNumber.isEmpty()) {
                    failedStudents.add(new FailedStudent(rowNum + 1, email, name, "Roll Number is required"));
                    continue;
                }

                try {
                    // Use roll number directly as student ID (Enrolment No)
                    String studentId = rollNumber.replaceAll("[^a-zA-Z0-9]", "");

                    // Check if email already exists
                    if (userRepository.findByEmail(email).isPresent()) {
                        failedStudents.add(new FailedStudent(rowNum + 1, email, name, "Email already exists"));
                        continue;
                    }

                    // Generate password: email prefix + @ + last 4 digits of enrollment
                    String emailPrefix = email.substring(0, email.indexOf('@'));
                    String last4Digits = rollNumber.length() >= 4 
                        ? rollNumber.substring(rollNumber.length() - 4) 
                        : rollNumber;
                    String tempPassword = emailPrefix + "@" + last4Digits;
                    String hashedPassword = passwordEncoder.encode(tempPassword);

                    // Create user DTO
                    UserDTO student = new UserDTO();
                    student.setUid(studentId);
                    student.setEmail(email);
                    student.setDisplayName(name);
                    student.setRole(UserRole.STUDENT);
                    student.setCreatedAt(LocalDateTime.now());
                    student.setUpdatedAt(LocalDateTime.now());

                    // Save to repository with hashed password
                    userRepository.saveWithPassword(student, hashedPassword);

                    // Add to success list with plain password for credential sheet
                    StudentCredential credential = new StudentCredential(
                        studentId,
                        email,
                        name,
                        rollNumber.isEmpty() ? studentId : rollNumber,
                        tempPassword, // Plain password for credential download
                        classroomId
                    );
                    createdStudents.add(credential);

                } catch (Exception e) {
                    failedStudents.add(new FailedStudent(rowNum + 1, email, name, "Error: " + e.getMessage()));
                }
            }

            BulkStudentUploadResult result = BulkStudentUploadResult.success(
                createdStudents.size() + failedStudents.size(),
                createdStudents.size(),
                createdStudents
            );
            result.setFailedStudents(failedStudents);
            
            // Add created students to classroom if classroom ID is provided
            if (classroomId != null && !classroomId.isEmpty() && !createdStudents.isEmpty()) {
                try {
                    addStudentsToClassroom(classroomId, createdStudents);
                } catch (Exception e) {
                    // Log error but don't fail the operation - students are already created
                    System.err.println("Warning: Failed to add students to classroom: " + e.getMessage());
                }
            }
            
            return result;

        } catch (IOException e) {
            return BulkStudentUploadResult.error("Failed to read Excel file: " + e.getMessage());
        }
    }

    @Override
    public String generateSecurePassword() {
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        
        // Ensure at least one uppercase, one lowercase, one digit, and one special char
        password.append(PASSWORD_CHARS.charAt(secureRandom.nextInt(24))); // Uppercase A-Z
        password.append(PASSWORD_CHARS.charAt(24 + secureRandom.nextInt(24))); // Lowercase a-z
        password.append(PASSWORD_CHARS.charAt(48 + secureRandom.nextInt(8))); // Digit 2-9
        password.append(PASSWORD_CHARS.charAt(56 + secureRandom.nextInt(5))); // Special !@#$%
        
        // Fill remaining with random chars
        for (int i = 4; i < PASSWORD_LENGTH; i++) {
            password.append(PASSWORD_CHARS.charAt(secureRandom.nextInt(PASSWORD_CHARS.length())));
        }
        
        // Shuffle the password
        char[] chars = password.toString().toCharArray();
        for (int i = chars.length - 1; i > 0; i--) {
            int j = secureRandom.nextInt(i + 1);
            char temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
        }
        
        return new String(chars);
    }

    @Override
    public String generateStudentId(String prefix) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        int count = counter.incrementAndGet();
        return String.format("%s%s%04d", prefix != null ? prefix : "STU", timestamp, count);
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";
        
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> {
                if (DateUtil.isCellDateFormatted(cell)) {
                    yield cell.getLocalDateTimeCellValue().toString();
                }
                // Avoid scientific notation for numbers
                double value = cell.getNumericCellValue();
                if (value == Math.floor(value)) {
                    yield String.format("%.0f", value);
                }
                yield String.valueOf(value);
            }
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> {
                try {
                    yield cell.getStringCellValue();
                } catch (Exception e) {
                    yield String.valueOf(cell.getNumericCellValue());
                }
            }
            default -> "";
        };
    }

    private String generateEmailFromName(String name, String studentId) {
        // Convert name to email-safe format
        String safeName = name.toLowerCase()
            .replaceAll("[^a-z0-9\\s]", "")
            .replaceAll("\\s+", ".")
            .trim();
        
        if (safeName.isEmpty()) {
            safeName = "student";
        }
        
        return safeName + "." + studentId.toLowerCase() + "@student.viva.edu";
    }

    /**
     * Add created students to the specified classroom
     */
    private void addStudentsToClassroom(String classroomId, List<StudentCredential> students) {
        // Fetch the classroom
        ClassroomDTO classroom = classroomRepository.findById(classroomId)
            .orElseThrow(() -> new RuntimeException("Classroom not found: " + classroomId));

        // Initialize studentIds list if null
        if (classroom.getStudentIds() == null) {
            classroom.setStudentIds(new ArrayList<>());
        }

        // Add all new student IDs to the classroom
        for (StudentCredential student : students) {
            if (!classroom.getStudentIds().contains(student.getUid())) {
                classroom.getStudentIds().add(student.getUid());
            }
        }

        // Update the classroom
        classroom.setUpdatedAt(LocalDateTime.now());
        classroomRepository.save(classroom);
    }
}
