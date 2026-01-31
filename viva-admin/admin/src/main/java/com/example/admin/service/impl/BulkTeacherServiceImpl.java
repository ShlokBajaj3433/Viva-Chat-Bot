package com.example.admin.service.impl;

import com.example.admin.dto.BulkTeacherUploadResult;
import com.example.admin.dto.BulkTeacherUploadResult.TeacherCredential;
import com.example.admin.dto.BulkTeacherUploadResult.FailedTeacher;
import com.example.admin.dto.TeacherDTO;
import com.example.admin.dto.UserDTO;
import com.example.admin.enums.UserRole;
import com.example.admin.repository.UserRepository;
import com.example.admin.service.BulkTeacherService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.cloud.firestore.Firestore;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BulkTeacherServiceImpl implements BulkTeacherService {

    private final UserRepository userRepository;
    private final FirebaseAuth firebaseAuth;
    private final Firestore firestore;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SecureRandom secureRandom;

    // Characters for password generation
    private static final String PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    private static final int PASSWORD_LENGTH = 12;

    public BulkTeacherServiceImpl(UserRepository userRepository, FirebaseAuth firebaseAuth, Firestore firestore) {
        this.userRepository = userRepository;
        this.firebaseAuth = firebaseAuth;
        this.firestore = firestore;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.secureRandom = new SecureRandom();
    }

    @Override
    public BulkTeacherUploadResult processExcelUpload(MultipartFile file, String creatorUid) {
        if (file == null || file.isEmpty()) {
            return BulkTeacherUploadResult.error("No file uploaded or file is empty");
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null || (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls"))) {
            return BulkTeacherUploadResult.error("Invalid file format. Please upload an Excel file (.xlsx or .xls)");
        }

        List<TeacherCredential> createdTeachers = new ArrayList<>();
        List<FailedTeacher> failedTeachers = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            
            if (sheet.getPhysicalNumberOfRows() <= 1) {
                return BulkTeacherUploadResult.error("Excel file is empty or contains only headers");
            }

            // Get header row to identify columns
            Row headerRow = sheet.getRow(0);
            int emailCol = -1, nameCol = -1, employeeIdCol = -1, departmentCol = -1, 
                subjectCol = -1, qualificationCol = -1, phoneCol = -1;
            
            for (int i = 0; i < headerRow.getLastCellNum(); i++) {
                Cell cell = headerRow.getCell(i);
                if (cell != null) {
                    String header = getCellValueAsString(cell).toLowerCase().trim();
                    if (header.contains("email")) emailCol = i;
                    else if (header.contains("name")) nameCol = i;
                    else if (header.contains("employee") || header.contains("emp")) employeeIdCol = i;
                    else if (header.contains("department")) departmentCol = i;
                    else if (header.contains("subject")) subjectCol = i;
                    else if (header.contains("qualification")) qualificationCol = i;
                    else if (header.contains("phone") || header.contains("mobile")) phoneCol = i;
                }
            }

            if (nameCol == -1) {
                return BulkTeacherUploadResult.error("Required column 'Name' not found in Excel.");
            }
            if (emailCol == -1) {
                return BulkTeacherUploadResult.error("Required column 'Email' not found in Excel.");
            }
            if (employeeIdCol == -1) {
                return BulkTeacherUploadResult.error("Required column 'Employee ID' not found in Excel.");
            }

            // Process each data row
            for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {
                Row row = sheet.getRow(rowNum);
                if (row == null) continue;

                String name = nameCol >= 0 ? getCellValueAsString(row.getCell(nameCol)).trim() : "";
                String email = emailCol >= 0 ? getCellValueAsString(row.getCell(emailCol)).trim() : "";
                String employeeId = employeeIdCol >= 0 ? getCellValueAsString(row.getCell(employeeIdCol)).trim() : "";
                String department = departmentCol >= 0 ? getCellValueAsString(row.getCell(departmentCol)).trim() : "";
                String subject = subjectCol >= 0 ? getCellValueAsString(row.getCell(subjectCol)).trim() : "";
                String qualification = qualificationCol >= 0 ? getCellValueAsString(row.getCell(qualificationCol)).trim() : "";
                String phone = phoneCol >= 0 ? getCellValueAsString(row.getCell(phoneCol)).trim() : "";

                // Skip empty rows
                if (name.isEmpty()) continue;

                // Validate required fields
                if (email.isEmpty()) {
                    failedTeachers.add(new FailedTeacher(rowNum + 1, "", name, "Email is required"));
                    continue;
                }
                if (employeeId.isEmpty()) {
                    failedTeachers.add(new FailedTeacher(rowNum + 1, email, name, "Employee ID is required"));
                    continue;
                }

                try {
                    // Check if email already exists
                    if (userRepository.findByEmail(email).isPresent()) {
                        failedTeachers.add(new FailedTeacher(rowNum + 1, email, name, "Email already exists"));
                        continue;
                    }

                    // Generate password: Teacher@ + employeeId
                    String tempPassword = "Teacher@" + employeeId;
                    String hashedPassword = passwordEncoder.encode(tempPassword);

                    // Create user in Firebase Authentication
                    String firebaseUid;
                    try {
                        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                            .setEmail(email)
                            .setPassword(tempPassword)
                            .setDisplayName(name)
                            .setEmailVerified(false);
                        
                        UserRecord userRecord = firebaseAuth.createUser(request);
                        firebaseUid = userRecord.getUid();
                    } catch (Exception authError) {
                        // If user already exists in Firebase Auth, try to get their UID
                        try {
                            UserRecord existingUser = firebaseAuth.getUserByEmail(email);
                            firebaseUid = existingUser.getUid();
                        } catch (Exception e) {
                            failedTeachers.add(new FailedTeacher(rowNum + 1, email, name, 
                                "Firebase Auth error: " + authError.getMessage()));
                            continue;
                        }
                    }

                    // Create user document in Firestore users collection
                    UserDTO userDTO = new UserDTO(firebaseUid, email, name, UserRole.TEACHER);
                    userDTO.setPasswordHash(hashedPassword);
                    userDTO.setMustChangePassword(true);
                    userDTO.setEmailVerified(false);
                    userRepository.save(userDTO);

                    // Create teacher document in Firestore teachers collection
                    TeacherDTO teacherDTO = new TeacherDTO(firebaseUid, email, name);
                    teacherDTO.setEmployeeId(employeeId);
                    teacherDTO.setDepartment(department);
                    teacherDTO.setSubject(subject);
                    teacherDTO.setQualification(qualification);
                    teacherDTO.setPhoneNumber(phone);
                    teacherDTO.setClassroomsCount(0);
                    teacherDTO.setStudentsCount(0);

                    // Save to Firestore teachers collection
                    firestore.collection("teachers").document(firebaseUid).set(teacherDTO).get();

                    createdTeachers.add(new TeacherCredential(
                        firebaseUid, email, name, employeeId, tempPassword, department
                    ));

                } catch (Exception e) {
                    failedTeachers.add(new FailedTeacher(rowNum + 1, email, name, 
                        "Error: " + e.getMessage()));
                }
            }

            return BulkTeacherUploadResult.success(createdTeachers, failedTeachers);

        } catch (IOException e) {
            return BulkTeacherUploadResult.error("Error reading Excel file: " + e.getMessage());
        }
    }

    @Override
    public byte[] generateTemplate() {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Teachers");
            
            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Name", "Email", "Employee ID", "Department", "Subject", "Qualification", "Phone"};
            
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5000);
            }
            
            // Add sample data row
            Row sampleRow = sheet.createRow(1);
            String[] sampleData = {
                "John Doe", 
                "john.doe@school.edu", 
                "EMP001", 
                "Computer Science", 
                "Data Structures", 
                "M.Sc. Computer Science",
                "1234567890"
            };
            
            for (int i = 0; i < sampleData.length; i++) {
                Cell cell = sampleRow.createCell(i);
                cell.setCellValue(sampleData[i]);
            }
            
            workbook.write(outputStream);
            return outputStream.toByteArray();
            
        } catch (IOException e) {
            throw new RuntimeException("Error generating template: " + e.getMessage());
        }
    }

    @Override
    public byte[] generateCredentialsExcel(BulkTeacherUploadResult uploadResult) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Teacher Credentials");
            
            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Name", "Email", "Employee ID", "Password", "Department", "Created At"};
            
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5000);
            }
            
            // Add data rows
            int rowNum = 1;
            for (TeacherCredential teacher : uploadResult.getTeachers()) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(teacher.getDisplayName());
                row.createCell(1).setCellValue(teacher.getEmail());
                row.createCell(2).setCellValue(teacher.getEmployeeId());
                row.createCell(3).setCellValue(teacher.getPassword());
                row.createCell(4).setCellValue(teacher.getDepartment());
                row.createCell(5).setCellValue(teacher.getCreatedAt().toString());
            }
            
            workbook.write(outputStream);
            return outputStream.toByteArray();
            
        } catch (IOException e) {
            throw new RuntimeException("Error generating credentials Excel: " + e.getMessage());
        }
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}
