# Role-Based Access Control (RBAC) System

## Overview
The VIVA Admin Panel implements a comprehensive role-based access control system with four distinct roles, each with specific permissions and capabilities.

---

## 🎯 Role Hierarchy

### 1. SUPER_ADMIN
**Highest privilege level** - Full system access

**Capabilities:**
- ✅ Manage all users (create, update, delete)
- ✅ Create and manage other SUPER_ADMINs and ADMINs
- ✅ Create and manage TEACHERS
- ✅ Create and manage STUDENTS
- ✅ Access all system features
- ✅ Bulk upload teachers and students
- ✅ View all classrooms and assignments
- ✅ System configuration

**Use Case:** System administrators who need complete control over the platform.

---

### 2. ADMIN
**Administrative level** - Can manage teachers and students

**Capabilities:**
- ✅ Create and manage TEACHERS (bulk upload, edit, delete)
- ✅ Create and manage STUDENTS (bulk upload, edit, delete)
- ✅ View all classrooms
- ✅ Assign teachers to classrooms
- ✅ Generate and download credentials
- ❌ **CANNOT** create or manage other ADMINs or SUPER_ADMINs
- ❌ **CANNOT** access system configuration

**Use Case:** School/college administrators who manage staff and students but shouldn't modify admin accounts.

---

### 3. TEACHER
**Teaching level** - Can manage their own classrooms and students

**Capabilities:**
- ✅ View and manage their own classrooms
- ✅ Create assignments for their classrooms
- ✅ Add/remove students to/from their classrooms
- ✅ Bulk upload students to their classrooms
- ✅ View and grade student submissions
- ✅ Update their own profile
- ❌ **CANNOT** create or manage other teachers
- ❌ **CANNOT** access other teachers' classrooms
- ❌ **CANNOT** create or delete users

**Use Case:** Teachers who need to manage their classes and students.

---

### 4. STUDENT
**Basic level** - Limited access to their own data

**Capabilities:**
- ✅ View their enrolled classrooms
- ✅ View and submit assignments
- ✅ View their own grades and progress
- ✅ Update their own profile
- ❌ **CANNOT** access other students' data
- ❌ **CANNOT** create or manage any users
- ❌ **CANNOT** access administrative features

**Use Case:** Students who need access to their learning materials and assignments.

---

## 📋 Permission Matrix

| Action | SUPER_ADMIN | ADMIN | TEACHER | STUDENT |
|--------|-------------|-------|---------|---------|
| Create SUPER_ADMIN | ✅ | ❌ | ❌ | ❌ |
| Create ADMIN | ✅ | ❌ | ❌ | ❌ |
| Create TEACHER | ✅ | ✅ | ❌ | ❌ |
| Create STUDENT | ✅ | ✅ | ✅ | ❌ |
| Bulk Upload Teachers | ✅ | ✅ | ❌ | ❌ |
| Bulk Upload Students | ✅ | ✅ | ✅ | ❌ |
| Delete ADMIN | ✅ | ❌ | ❌ | ❌ |
| Delete TEACHER | ✅ | ✅ | ❌ | ❌ |
| Delete STUDENT | ✅ | ✅ | ✅ | ❌ |
| View All Users | ✅ | ✅ | ❌ | ❌ |
| Create Classroom | ✅ | ✅ | ✅ | ❌ |
| Assign Teacher to Classroom | ✅ | ✅ | ❌ | ❌ |
| Create Assignment | ✅ | ✅ | ✅ | ❌ |
| View All Classrooms | ✅ | ✅ | ❌ | ❌ |
| View Own Classrooms | ✅ | ✅ | ✅ | ✅ |
| Update Own Profile | ✅ | ✅ | ✅ | ✅ |

---

## 🔐 Implementation Details

### Authorization Annotation
Use `@RequireRole` annotation on controller methods to specify required roles:

```java
// Only SUPER_ADMIN and ADMIN can access
@RequireRole({UserRole.SUPER_ADMIN, UserRole.ADMIN})
@GetMapping("/api/users")
public ResponseEntity<List<UserDTO>> getAllUsers() { ... }

// All authenticated users can access
@GetMapping("/api/users/me")
public ResponseEntity<UserDTO> getCurrentUser() { ... }
```

### Permission Checking
The `UserRole` enum includes a `hasPermissionFor()` method for checking if a role has permission to manage another role:

```java
UserRole creatorRole = UserRole.ADMIN;
UserRole targetRole = UserRole.TEACHER;

if (creatorRole.hasPermissionFor(targetRole)) {
    // Allow the operation
}
```

### Hierarchy Rules
- **SUPER_ADMIN** can manage all roles (including other SUPER_ADMINs)
- **ADMIN** can manage TEACHER and STUDENT only
- **TEACHER** can manage STUDENT only (in their classrooms)
- **STUDENT** cannot manage anyone

---

## 🚀 API Endpoints by Role

### Teacher Management (SUPER_ADMIN & ADMIN only)

#### 1. Bulk Upload Teachers
```http
POST /api/teachers/bulk-upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: teachers.xlsx
```

**Response:**
```json
{
  "success": true,
  "message": "Processed 10 teachers: 10 successful, 0 failed",
  "totalProcessed": 10,
  "successfulCreations": 10,
  "failedCreations": 0,
  "teachers": [
    {
      "uid": "firebase_uid_1",
      "email": "john.doe@school.edu",
      "displayName": "John Doe",
      "employeeId": "EMP001",
      "password": "Teacher@EMP001",
      "department": "Computer Science"
    }
  ],
  "failedTeachers": []
}
```

#### 2. Download Teacher Template
```http
GET /api/teachers/bulk-upload-template
Authorization: Bearer <token>
```

Returns Excel file with columns:
- Name
- Email
- Employee ID
- Department
- Subject
- Qualification
- Phone

#### 3. Download Teacher Credentials
```http
POST /api/teachers/download-credentials
Authorization: Bearer <token>
Content-Type: application/json

{
  "teachers": [...],
  "failedTeachers": [...]
}
```

Returns Excel file with generated credentials.

---

### Student Management (SUPER_ADMIN, ADMIN & TEACHER)

#### 1. Bulk Upload Students
```http
POST /api/students/bulk-upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: students.xlsx
classroomId: classroom_id (optional)
```

#### 2. Download Student Template
```http
GET /api/students/template
Authorization: Bearer <token>
```

---

### User Management

#### 1. Create User (SUPER_ADMIN & ADMIN)
```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "teacher@school.edu",
  "displayName": "Teacher Name",
  "role": "TEACHER"
}
```

**Permission Check:** Creator must have permission to create the target role.

#### 2. Update User
```http
PUT /api/users/{uid}
Authorization: Bearer <token>
Content-Type: application/json

{
  "displayName": "Updated Name",
  ...
}
```

**Rules:**
- SUPER_ADMIN & ADMIN can update users they have permission for
- TEACHER can only update their own profile
- STUDENT can only update their own profile

#### 3. Delete User (SUPER_ADMIN & ADMIN)
```http
DELETE /api/users/{uid}
Authorization: Bearer <token>
```

**Permission Check:** Creator must have permission to delete the target role.

---

## 🔧 Setup Instructions

### 1. Create Initial Super Admin
```http
POST /api/users/setup/superadmin
```

This creates the first SUPER_ADMIN account:
- Email: admin@viva.com
- Password: (set manually in Firebase Console initially)
- Role: SUPER_ADMIN

### 2. Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "admin@viva.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "uid": "...",
    "email": "admin@viva.com",
    "role": "SUPER_ADMIN"
  }
}
```

### 3. Use Token for Authenticated Requests
```http
Authorization: Bearer <jwt_token>
```

---

## 📊 Password Generation

### Teachers
- **Format:** `Teacher@<EmployeeID>`
- **Example:** `Teacher@EMP001`
- **Must Change:** Yes (forced on first login)

### Students
- **Format:** `<emailPrefix>@<last4DigitsOfRollNumber>`
- **Example:** `john.smith@0123`
- **Must Change:** Yes (forced on first login)

---

## 🛡️ Security Best Practices

1. **Always use JWT tokens** for API requests
2. **Validate permissions** on both client and server side
3. **Never expose super admin credentials**
4. **Force password change** on first login
5. **Log all admin actions** for audit trails
6. **Use HTTPS** in production
7. **Implement rate limiting** on authentication endpoints
8. **Store credentials securely** (never in plain text)

---

## ⚠️ Important Notes

### ADMIN Limitations
- ADMINs **CANNOT** create or modify other ADMIN accounts
- ADMINs **CANNOT** promote users to ADMIN or SUPER_ADMIN
- Only SUPER_ADMINs can manage admin accounts
- This prevents privilege escalation attacks

### Teacher Limitations
- Teachers can only see and manage their own classrooms
- Teachers cannot assign other teachers
- Teachers can bulk upload students to their own classrooms only
- Teachers cannot delete users

### Student Limitations
- Students have read-only access to most data
- Students can only modify their own profile
- Students cannot create or delete anything

---

## 🔍 Error Handling

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource",
  "requiredRoles": ["SUPER_ADMIN", "ADMIN"],
  "yourRole": "TEACHER"
}
```

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "You don't have permission to create users with this role"
}
```

---

## 📝 Testing the System

### Test Scenario 1: Admin tries to create another Admin
**Expected:** 403 Forbidden

### Test Scenario 2: Teacher tries to bulk upload teachers
**Expected:** 403 Forbidden

### Test Scenario 3: Admin bulk uploads teachers
**Expected:** 200 OK with credentials

### Test Scenario 4: Teacher updates another teacher's profile
**Expected:** 403 Forbidden

### Test Scenario 5: Teacher updates their own profile
**Expected:** 200 OK

---

## 🎓 Usage Examples

### Example 1: Admin Creates Teachers
1. Admin logs in and receives JWT token
2. Admin downloads teacher template: `GET /api/teachers/bulk-upload-template`
3. Admin fills Excel with teacher data
4. Admin uploads file: `POST /api/teachers/bulk-upload`
5. System creates Firebase Auth accounts
6. System creates user and teacher documents in Firestore
7. Admin downloads credentials: `POST /api/teachers/download-credentials`
8. Admin shares credentials with teachers securely

### Example 2: Teacher Creates Students
1. Teacher logs in
2. Teacher downloads student template: `GET /api/students/template`
3. Teacher fills Excel with student data
4. Teacher uploads to their classroom: `POST /api/students/bulk-upload?classroomId=xyz`
5. System creates students and adds them to the classroom
6. Teacher downloads credentials and shares with students

---

## 🐛 Troubleshooting

### Issue: "You don't have permission to create users with this role"
**Solution:** Check if your role has permission for the target role. ADMINs cannot create other ADMINs.

### Issue: "Forbidden" error on teacher bulk upload
**Solution:** Ensure you're logged in as SUPER_ADMIN or ADMIN. Teachers cannot bulk upload teachers.

### Issue: Teacher cannot see all classrooms
**Solution:** This is expected. Teachers can only see their own classrooms. Use ADMIN account to see all classrooms.

---

## 📞 Support

For issues or questions about the RBAC system, please refer to:
- [FIRESTORE_SCHEMA.md](./FIRESTORE_SCHEMA.md) - Database structure
- [DATABASE_DESIGN_GUIDE.md](./DATABASE_DESIGN_GUIDE.md) - Database design
- [README.md](./README.md) - General documentation
