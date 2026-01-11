# VIVA Admin & Teacher Portal Guide


---

## Overview

The VIVA Admin Panel is a comprehensive backend system designed to manage users, classrooms, assignments, and system configuration. It provides separate portals for **Super Admin** and **Teachers** with role-based access control.

### Key Features
- ✅ Role-Based Access Control (RBAC)
- ✅ User Management (Students, Teachers, Admins)
- ✅ Bulk Excel Import/Export
- ✅ Classroom Management
- ✅ Assignment Tracking
- ✅ JWT Authentication
- ✅ Firestore Integration

---

## System Architecture

### User Roles

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **Super Admin** | Full system access, create admins, manage all classrooms | Highest |
| **Admin** | Manage users, classrooms, teachers | High |
| **Teacher** | Create/manage own classrooms, assign students, create assignments | Medium |
| **Student** | View assigned classrooms, submit assignments | Low |

### Database Structure

**Firestore Collections:**
- `users` - All user accounts with roles
- `teachers` - Teacher-specific metadata
- `students` - Student-specific metadata
- `classrooms` - Classroom records
- `assignments` - Assignment details
- `announcements` - System announcements

---

## Admin Portal Guide

### Accessing the Admin Portal

1. **Login**
   - Navigate to `http://localhost:8080/api/auth/login`
   - Use credentials with Admin or Super Admin role
   - Receive JWT token (valid for 24 hours)

   ```bash
   POST /api/auth/login
   {
     "email": "admin@example.com",
     "password": "admin_password"
   }
   ```

2. **Include JWT Token in Requests**
   - Add `Authorization: Bearer <token>` header to all subsequent requests

### Admin Dashboard Functions

#### 1. User Management

**View All Users**
```bash
GET /api/users
Authorization: Bearer <token>
```

Response includes: All students, teachers, and admins in the system

**Create New User**
```bash
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "student@example.com",
  "name": "John Doe",
  "role": "STUDENT",
  "phone": "1234567890",
  "passwordHash": "hashed_password"
}
```

**Get User Details**
```bash
GET /api/users/{uid}
Authorization: Bearer <token>
```

**Update User Information**
```bash
PUT /api/users/{uid}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543210",
  "status": "ACTIVE"
}
```

**Delete User**
```bash
DELETE /api/users/{uid}
Authorization: Bearer <token>
```

#### 2. Classroom Management

**List All Classrooms**
```bash
GET /api/classrooms
Authorization: Bearer <token>
```

**Create Classroom**
```bash
POST /api/classrooms
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Advanced JavaScript",
  "description": "Learn advanced JS concepts",
  "teacherId": "teacher_uid",
  "subject": "Programming",
  "grade": "12",
  "maxStudents": 50
}
```

**Get Classroom Details**
```bash
GET /api/classrooms/{classroomId}
Authorization: Bearer <token>
```

**Update Classroom**
```bash
PUT /api/classrooms/{classroomId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Advanced JavaScript - Updated",
  "description": "Updated description",
  "maxStudents": 60
}
```

**Delete Classroom**
```bash
DELETE /api/classrooms/{classroomId}
Authorization: Bearer <token>
```

#### 3. Bulk Student Upload

**Download Excel Template**
```bash
GET /api/students/template
Authorization: Bearer <token>
```

Returns an Excel file with required columns:
- Email
- Full Name
- Phone (optional)
- Grade (optional)

**Bulk Upload Students**
```bash
POST /api/students/bulk-upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

[File]: students.xlsx
[ClassroomId]: classroom_uid (optional)
```

The system will:
1. Validate all entries
2. Create student accounts automatically
3. Generate temporary passwords
4. Return success/error report

**Export Student Credentials**
```bash
POST /api/students/credentials-export
Authorization: Bearer <token>
Content-Type: application/json

{
  "classroomId": "classroom_uid"
}
```

Returns Excel file with student credentials:
- Student Email
- Temporary Password
- Classroom Assignment
- Created Date

---

## Teacher Portal Guide

### Accessing the Teacher Portal

1. **Login as Teacher**
   ```bash
   POST /api/auth/login
   {
     "email": "teacher@example.com",
     "password": "teacher_password"
   }
   ```

2. **Store JWT Token for use in subsequent requests**

### Teacher Dashboard Functions

#### 1. My Classrooms

**View My Classrooms**
```bash
GET /api/classrooms?teacherId={teacherUid}
Authorization: Bearer <token>
```

**Create New Classroom**
```bash
POST /api/classrooms
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Introduction to Python",
  "description": "Beginner Python programming course",
  "subject": "Programming",
  "grade": "10",
  "maxStudents": 40
}
```

#### 2. Manage Students in Classroom

**View Classroom Students**
```bash
GET /api/classrooms/{classroomId}
Authorization: Bearer <token>
```

**Add Student to Classroom**
```bash
POST /api/classrooms/{classroomId}/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "student_uid"
}
```

**Remove Student from Classroom**
```bash
DELETE /api/classrooms/{classroomId}/students/{studentId}
Authorization: Bearer <token>
```

#### 3. Create & Manage Assignments

**Create Assignment**
```bash
POST /api/assignments
Authorization: Bearer <token>
Content-Type: application/json

{
  "classroomId": "classroom_uid",
  "title": "Assignment 1: Variables and Data Types",
  "description": "Learn about variables and different data types in Python",
  "dueDate": "2026-01-15T23:59:59Z",
  "maxScore": 100,
  "type": "HOMEWORK"
}
```

**View Assignments**
```bash
GET /api/assignments?classroomId={classroomId}
Authorization: Bearer <token>
```

**View Student Submissions**
```bash
GET /api/assignments/{assignmentId}/submissions
Authorization: Bearer <token>
```

**Grade Assignment**
```bash
PUT /api/assignments/{assignmentId}/submissions/{studentId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "score": 85,
  "feedback": "Good work! Keep improving on error handling.",
  "status": "GRADED"
}
```

#### 4. Make Announcements

**Post Announcement**
```bash
POST /api/announcements
Authorization: Bearer <token>
Content-Type: application/json

{
  "classroomId": "classroom_uid",
  "title": "Assignment Deadline Extended",
  "content": "The assignment deadline has been extended to January 20th.",
  "priority": "HIGH"
}
```

---

## User Management

### User Roles & Permissions

#### Super Admin
- Create/modify/delete all users
- Create/remove admin accounts
- View system-wide statistics
- Manage all classrooms
- Access all reports

#### Admin
- Create/modify student and teacher accounts
- Manage classroom assignments
- View user statistics
- Manage announcements

#### Teacher
- View own classroom details
- Manage students in own classrooms
- Create and grade assignments
- Post announcements for own classrooms
- View student progress

#### Student
- View assigned classrooms
- Submit assignments
- View grades and feedback
- Access learning materials

### Creating Users

**Method 1: Individual User Creation**
```bash
POST /api/users
{
  "email": "newuser@example.com",
  "name": "New User",
  "role": "STUDENT",
  "phone": "1234567890"
}
```

**Method 2: Bulk Upload (Recommended for multiple students)**
1. Download template from `/api/students/template`
2. Fill in student details
3. Upload via `/api/students/bulk-upload`

### User Status Management

Users can have the following statuses:
- `ACTIVE` - User can login and access system
- `INACTIVE` - User cannot login
- `SUSPENDED` - User account is temporarily blocked
- `ARCHIVED` - User has completed all courses

---

## Classroom Management

### Creating a Classroom

**Required Fields:**
- Name
- Teacher ID
- Subject
- Grade Level

**Optional Fields:**
- Description
- Maximum Students
- Schedule/Timing

### Classroom Workflow

1. **Create** - Teacher or admin creates classroom
2. **Add Students** - Add students individually or via bulk upload
3. **Create Assignments** - Add coursework and materials
4. **Post Announcements** - Share updates with class
5. **Grade Work** - Evaluate student submissions
6. **Archive** - Close classroom after course completion

### Student Enrollment

**Add Single Student:**
```bash
POST /api/classrooms/{id}/students
{
  "studentId": "student_uid"
}
```

**Bulk Enroll Students:**
1. Use Excel template with student data
2. Upload to `/api/students/bulk-upload`
3. Specify classroom ID
4. System automatically enrolls all valid students

---

## Assignment Management

### Assignment Types
- `HOMEWORK` - Regular homework assignments
- `QUIZ` - Short assessment
- `PROJECT` - Extended project work
- `EXAM` - Final examinations
- `PRACTICE` - Practice problems

### Assignment Workflow

1. **Create** - Define assignment details and due date
2. **Publish** - Make visible to students
3. **Student Submission** - Students submit work
4. **Teacher Review** - Grade submissions
5. **Feedback** - Provide comments to students
6. **Archive** - Close assignment after course ends

### Grading

**Grade Format:**
- Numeric score (0-100)
- Written feedback
- Status (GRADED, PENDING_REVIEW, REGRADED)

---

## Bulk Operations

### Bulk Upload Students

**Process:**
1. Download template: `GET /api/students/template`
2. Fill in required columns
3. Upload file: `POST /api/students/bulk-upload`
4. System validates and creates accounts
5. Download credentials file with temporary passwords

**Excel Columns:**
| Column | Required | Example |
|--------|----------|---------|
| Email | Yes | student@example.com |
| Full Name | Yes | John Doe |
| Phone | No | 9876543210 |
| Grade | No | 10 |

### Export Student Credentials

After bulk upload, export credentials:
```bash
POST /api/students/credentials-export
{
  "classroomId": "classroom_uid"
}
```

Contains:
- Email addresses
- Temporary passwords (for initial login)
- Classroom assignments
- Account creation date

---

## API Endpoints Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login, returns JWT token |
| GET | `/api/users/me` | Get current user info |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create new user |
| GET | `/api/users/{uid}` | Get user details |
| PUT | `/api/users/{uid}` | Update user |
| DELETE | `/api/users/{uid}` | Delete user |
| GET | `/api/users/email/{email}` | Get user by email |

### Classroom Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/classrooms` | List classrooms |
| POST | `/api/classrooms` | Create classroom |
| GET | `/api/classrooms/{id}` | Get classroom details |
| PUT | `/api/classrooms/{id}` | Update classroom |
| DELETE | `/api/classrooms/{id}` | Delete classroom |
| POST | `/api/classrooms/{id}/students` | Add student to classroom |
| DELETE | `/api/classrooms/{id}/students/{sid}` | Remove student from classroom |

### Assignments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments` | List assignments |
| POST | `/api/assignments` | Create assignment |
| GET | `/api/assignments/{id}` | Get assignment details |
| PUT | `/api/assignments/{id}` | Update assignment |
| DELETE | `/api/assignments/{id}` | Delete assignment |
| GET | `/api/assignments/{id}/submissions` | View submissions |
| PUT | `/api/assignments/{id}/submissions/{sid}` | Grade submission |

### Bulk Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students/template` | Download Excel template |
| POST | `/api/students/bulk-upload` | Upload students from Excel |
| POST | `/api/students/credentials-export` | Export student credentials |

### Announcements

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/announcements` | List announcements |
| POST | `/api/announcements` | Create announcement |
| GET | `/api/announcements/{id}` | Get announcement |
| PUT | `/api/announcements/{id}` | Update announcement |
| DELETE | `/api/announcements/{id}` | Delete announcement |

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Authentication Errors

**Error: "Unauthorized - Invalid token"**
- Solution: Ensure JWT token is included in Authorization header
- Format: `Authorization: Bearer <token>`
- Check token expiration (24 hours)
- Re-login if token expired

**Error: "403 Forbidden"**
- Solution: Check user role has required permissions
- Super Admin: All permissions
- Admin: Most permissions except admin management
- Teacher: Can only manage own classrooms
- Student: Read-only access

#### 2. Bulk Upload Issues

**Error: "Invalid Excel format"**
- Solution: Use template downloaded from system
- Ensure required columns are present
- Check data types (email must be valid)

**Error: "Duplicate email entries"**
- Solution: Remove duplicate student emails from upload file
- System rejects uploads with duplicate emails

#### 3. Firebase Connection

**Error: "Failed to initialize Firebase"**
- Solution: Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable
  ```bash
  $env:GOOGLE_APPLICATION_CREDENTIALS = "path/to/firebase-service-account.json"
  ```
- Or configure environment variables:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`

#### 4. Database Errors

**Error: "Classroom not found"**
- Solution: Verify classroom ID is correct
- Check classroom exists in system
- Ensure user has access to classroom

**Error: "Student already enrolled"**
- Solution: Cannot add same student to classroom twice
- Remove and re-add if needed

### Debug Mode

Enable debug logging:
```properties
logging.level.com.example.admin=DEBUG
logging.level.root=INFO
```

### Support

For additional help:
1. Check server logs for error details
2. Verify Firebase connection
3. Review API endpoint documentation
4. Contact system administrator

---

## Best Practices

### For Admins

1. **Regular Backups** - Backup Firestore data regularly
2. **Monitor Users** - Review user accounts and access levels
3. **Classroom Verification** - Verify all classrooms have assigned teachers
4. **Archive Old Data** - Archive completed classrooms after semester ends
5. **Update Credentials** - Change JWT secret periodically in production

### For Teachers

1. **Organize Assignments** - Create clear assignment names and descriptions
2. **Timely Grading** - Grade assignments within 48 hours
3. **Provide Feedback** - Add constructive feedback for student improvement
4. **Announcements** - Post updates before holidays or important dates
5. **Student Communication** - Maintain regular contact with students

### For Developers

1. **API Rate Limiting** - Implement rate limiting for bulk operations
2. **Error Handling** - Always handle API errors gracefully
3. **Token Management** - Refresh tokens before expiration
4. **Data Validation** - Validate all input on client and server
5. **Logging** - Log important operations for audit trail

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-01 | Initial release with admin and teacher portals |

---

**Last Updated:** January 1, 2026
**Backend Version:** 4.0.1 (Spring Boot)
**Database:** Firestore
