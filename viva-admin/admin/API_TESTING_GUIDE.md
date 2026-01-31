# Quick API Testing Guide

## 🚀 Testing the Role-Based Access Control System

### Prerequisites
- Backend running on `http://localhost:8080`
- Postman, cURL, or similar API testing tool
- Firebase project configured

---

## Step 1: Create Super Admin

```bash
curl -X POST http://localhost:8080/api/users/setup/superadmin
```

**Response:**
```json
{
  "ok": true,
  "message": "Super Admin created successfully",
  "user": {
    "uid": "super_admin_001",
    "email": "admin@viva.com",
    "displayName": "Super Admin",
    "role": "SUPER_ADMIN"
  }
}
```

**Note:** Set password in Firebase Console or update the endpoint to accept password.

---

## Step 2: Login as Super Admin

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@viva.com",
    "password": "YourPassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "super_admin_001",
    "email": "admin@viva.com",
    "displayName": "Super Admin",
    "role": "SUPER_ADMIN"
  }
}
```

**Save the token for subsequent requests!**

---

## Step 3: Create Admin User (as Super Admin)

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Authorization: Bearer YOUR_SUPER_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin1@school.edu",
    "displayName": "Admin One",
    "role": "ADMIN"
  }'
```

**Expected:** ✅ 201 Created

---

## Step 4: Login as Admin

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin1@school.edu",
    "password": "SetInFirebase123"
  }'
```

**Save the Admin token!**

---

## Step 5: Admin tries to create another Admin (SHOULD FAIL)

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin2@school.edu",
    "displayName": "Admin Two",
    "role": "ADMIN"
  }'
```

**Expected:** ❌ 403 Forbidden
```json
{
  "error": "You don't have permission to create users with this role"
}
```

---

## Step 6: Admin creates Teacher (SHOULD SUCCEED)

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher1@school.edu",
    "displayName": "Teacher One",
    "role": "TEACHER"
  }'
```

**Expected:** ✅ 201 Created

---

## Step 7: Download Teacher Upload Template

```bash
curl -X GET http://localhost:8080/api/teachers/bulk-upload-template \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -o teacher_template.xlsx
```

**Expected:** Excel file downloaded with columns:
- Name
- Email
- Employee ID
- Department
- Subject
- Qualification
- Phone

---

## Step 8: Bulk Upload Teachers (Admin)

### Prepare Excel File
Fill `teacher_template.xlsx` with sample data:

| Name | Email | Employee ID | Department | Subject | Qualification | Phone |
|------|-------|-------------|------------|---------|---------------|-------|
| John Doe | john.doe@school.edu | EMP001 | Computer Science | Data Structures | M.Sc. CS | 1234567890 |
| Jane Smith | jane.smith@school.edu | EMP002 | Mathematics | Calculus | Ph.D. Math | 0987654321 |

### Upload

```bash
curl -X POST http://localhost:8080/api/teachers/bulk-upload \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "file=@teacher_template.xlsx"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Processed 2 teachers: 2 successful, 0 failed",
  "totalProcessed": 2,
  "successfulCreations": 2,
  "failedCreations": 0,
  "teachers": [
    {
      "uid": "firebase_uid_1",
      "email": "john.doe@school.edu",
      "displayName": "John Doe",
      "employeeId": "EMP001",
      "password": "Teacher@EMP001",
      "department": "Computer Science"
    },
    {
      "uid": "firebase_uid_2",
      "email": "jane.smith@school.edu",
      "displayName": "Jane Smith",
      "employeeId": "EMP002",
      "password": "Teacher@EMP002",
      "department": "Mathematics"
    }
  ],
  "failedTeachers": []
}
```

---

## Step 9: Download Teacher Credentials

```bash
curl -X POST http://localhost:8080/api/teachers/download-credentials \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "teachers": [...],
    "failedTeachers": []
  }' \
  -o teacher_credentials.xlsx
```

**Expected:** Excel file with teacher login credentials

---

## Step 10: Login as Teacher

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@school.edu",
    "password": "Teacher@EMP001"
  }'
```

**Save the Teacher token!**

---

## Step 11: Teacher tries to bulk upload teachers (SHOULD FAIL)

```bash
curl -X POST http://localhost:8080/api/teachers/bulk-upload \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -F "file=@teachers.xlsx"
```

**Expected:** ❌ 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource",
  "requiredRoles": ["SUPER_ADMIN", "ADMIN"],
  "yourRole": "TEACHER"
}
```

---

## Step 12: Teacher downloads student template (SHOULD SUCCEED)

```bash
curl -X GET http://localhost:8080/api/students/template \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -o student_template.xlsx
```

**Expected:** ✅ Excel file downloaded

---

## Step 13: Teacher bulk uploads students (SHOULD SUCCEED)

### Prepare Student Excel
| Student Name | Email | Roll Number |
|--------------|-------|-------------|
| Alice Johnson | alice.j@student.edu | ADT23SOCB0001 |
| Bob Williams | bob.w@student.edu | ADT23SOCB0002 |

### Upload
```bash
curl -X POST http://localhost:8080/api/students/bulk-upload \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -F "file=@students.xlsx" \
  -F "classroomId=classroom_123"
```

**Expected:** ✅ 200 OK with student credentials

---

## Step 14: Teacher updates another teacher's profile (SHOULD FAIL)

```bash
curl -X PUT http://localhost:8080/api/users/{other_teacher_uid} \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Updated Name"
  }'
```

**Expected:** ❌ 403 Forbidden
```json
{
  "error": "Teachers can only update their own profile"
}
```

---

## Step 15: Teacher updates own profile (SHOULD SUCCEED)

```bash
curl -X PUT http://localhost:8080/api/users/{own_teacher_uid} \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "John Doe Updated"
  }'
```

**Expected:** ✅ 200 OK

---

## Test Summary

### ✅ Should Succeed
- [x] Super Admin creates Admin
- [x] Super Admin creates Teacher
- [x] Super Admin creates Student
- [x] Admin creates Teacher
- [x] Admin creates Student
- [x] Admin bulk uploads Teachers
- [x] Admin bulk uploads Students
- [x] Teacher bulk uploads Students (to their classroom)
- [x] Teacher updates own profile
- [x] Admin views all users

### ❌ Should Fail (403 Forbidden)
- [x] Admin creates another Admin
- [x] Admin creates Super Admin
- [x] Teacher creates Teacher
- [x] Teacher creates Admin
- [x] Teacher bulk uploads Teachers
- [x] Teacher updates other teacher's profile
- [x] Student creates anything
- [x] Student bulk uploads anything

---

## Postman Collection

### Environment Variables
```
BASE_URL: http://localhost:8080
SUPER_ADMIN_TOKEN: <token_from_super_admin_login>
ADMIN_TOKEN: <token_from_admin_login>
TEACHER_TOKEN: <token_from_teacher_login>
STUDENT_TOKEN: <token_from_student_login>
```

### Collection Structure
```
VIVA Admin API
├── Authentication
│   ├── POST Setup Super Admin
│   ├── POST Login
│   └── GET Current User
├── User Management (SUPER_ADMIN & ADMIN)
│   ├── GET All Users
│   ├── POST Create User
│   ├── GET User by ID
│   ├── PUT Update User
│   ├── DELETE Delete User
│   └── GET Users by Role
├── Teacher Management (SUPER_ADMIN & ADMIN)
│   ├── GET Download Template
│   ├── POST Bulk Upload
│   └── POST Download Credentials
└── Student Management (SUPER_ADMIN, ADMIN & TEACHER)
    ├── GET Download Template
    ├── POST Bulk Upload
    └── POST Download Credentials
```

---

## Common Issues

### Issue: 401 Unauthorized
**Cause:** Token expired or missing
**Solution:** Login again and get new token

### Issue: 403 Forbidden
**Cause:** Insufficient permissions
**Solution:** Check user role and endpoint requirements

### Issue: Token doesn't work
**Cause:** Wrong Authorization header format
**Solution:** Use `Bearer <token>`, not just `<token>`

### Issue: Excel upload fails
**Cause:** Wrong column names or missing required fields
**Solution:** Download template and follow exact column names

---

## Quick Role Reference

| Role | Can Create | Can Bulk Upload | Can Update | Can Delete |
|------|------------|-----------------|------------|------------|
| SUPER_ADMIN | All roles | Teachers, Students | All | All |
| ADMIN | Teacher, Student | Teachers, Students | Teacher, Student | Teacher, Student |
| TEACHER | Student (via classroom) | Students | Self, Students | Students |
| STUDENT | None | None | Self | None |

---

## Next Steps

1. ✅ Test all endpoints with different roles
2. ✅ Verify permission enforcement
3. ✅ Test bulk upload with large files
4. ⏭️ Implement frontend UI with role-based views
5. ⏭️ Add audit logging
6. ⏭️ Set up email notifications

---

## Support

For issues, refer to:
- [RBAC_GUIDE.md](./RBAC_GUIDE.md)
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- [README.md](./README.md)
