# Database Design Guide - Multi-Role User System

## Overview

This guide explains the new Firestore database structure that supports multi-role users (e.g., a user can be both a TEACHER and ADMIN).

## Architecture Decision: Hybrid Approach

**Chosen Pattern:** Hybrid Collection Approach with Role-Based Separation

### Structure
```
Firestore Database
├── users/              (All user profiles)
│   └── {uid}
├── teachers/           (Teacher-specific data - optional)
│   └── {uid}
├── students/           (Student-specific data - optional)
│   └── {uid}
├── classrooms/         (Classroom records)
│   └── {classroomId}
├── assignments/        (Assignments)
└── announcements/      (Announcements)
```

## Rationale for Hybrid Approach

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Single Collection** (All in users) | Simplicity, no joins | Denormalizes data, mixes concerns | ❌ Not chosen |
| **Separate Collections** (users, teachers, students) | Clean separation, flexible metadata | More complex queries, requires joins | ✅ **CHOSEN** |
| **Firestore Subcollections** | Hierarchical, organized | Slower queries for teacher listings | ⚠️ Alternative |

## Collection Schemas

### 1. **users** Collection - Master User Registry

**Purpose:** Single source of truth for all user accounts

**Document ID:** Firebase UID (e.g., `user_12345`)

**Document Structure:**
```json
{
  "uid": "user_12345",
  "email": "john.doe@school.com",
  "displayName": "John Doe",
  "photoUrl": "https://example.com/photos/john.jpg",
  "roles": ["TEACHER", "ADMIN"],
  "emailVerified": true,
  "passwordHash": "bcrypt_hash_here",
  "mustChangePassword": false,
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Field Descriptions:**
- `uid`: Unique identifier (matches Firebase Auth UID)
- `email`: User email address (must be unique)
- `displayName`: Full name or display name
- `photoUrl`: Profile photo URL (optional)
- `roles`: Array of roles the user can have (ADMIN, TEACHER, STUDENT)
- `emailVerified`: Boolean indicating if email is verified
- `passwordHash`: BCrypt hashed password for manual creation (optional)
- `mustChangePassword`: Flag to force password change on first login
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Firestore Indices:**
```
Collection: users
- Field: email (Ascending) - for unique lookups
- Field: roles (Ascending) - for querying by role
```

**Typical Queries:**
```javascript
// Get user by UID
db.collection('users').doc(uid).get()

// Find user by email
db.collection('users').where('email', '==', 'john@example.com').limit(1).get()

// List all teachers
db.collection('users').where('roles', 'array-contains', 'TEACHER').get()

// List all admins
db.collection('users').where('roles', 'array-contains', 'ADMIN').get()

// List users with multiple roles
db.collection('users')
  .where('roles', 'array-contains', 'TEACHER')
  .get()
  .then(teachers => {
    return teachers.docs.filter(doc => doc.data().roles.includes('ADMIN'));
  })
```

---

### 2. **teachers** Collection - Teacher-Specific Metadata

**Purpose:** Store teacher-specific information (optional but recommended)

**Document ID:** Same as user UID (enables 1:1 reference)

**Document Structure:**
```json
{
  "uid": "user_12345",
  "qualification": "M.Sc. Physics, B.Ed",
  "experience": 8,
  "department": "Science",
  "subjectsTeaching": ["Physics", "Chemistry"],
  "bio": "Experienced educator with 8 years in high school science.",
  "specialization": "Experimental Physics",
  "availability": {
    "monday": ["09:00", "17:00"],
    "tuesday": ["09:00", "17:00"],
    "wednesday": ["09:00", "13:00"]
  },
  "classroomsCount": 4,
  "studentsCount": 120,
  "performanceRating": 4.8,
  "yearsAtSchool": 5,
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Field Descriptions:**
- `uid`: Reference to users collection
- `qualification`: Educational qualifications
- `experience`: Years of teaching experience
- `department`: Department or faculty
- `subjectsTeaching`: Array of subjects taught
- `bio`: Short professional biography
- `specialization`: Area of expertise
- `availability`: Weekly availability schedule (optional)
- `classroomsCount`: Number of classrooms assigned
- `studentsCount`: Total students across all classrooms
- `performanceRating`: Teacher performance rating (1-5)
- `yearsAtSchool`: Years teaching at this institution

**Firestore Indices:**
```
Collection: teachers
- Field: department (Ascending) - for department-based queries
- Field: subjectsTeaching (Ascending) - for subject-based lookups
- Field: performanceRating (Descending) - for rankings
```

**Typical Queries:**
```javascript
// Get teacher details by UID
db.collection('teachers').doc(uid).get()

// List teachers by department
db.collection('teachers').where('department', '==', 'Science').get()

// Find teachers for a specific subject
db.collection('teachers')
  .where('subjectsTeaching', 'array-contains', 'Physics')
  .get()

// Get top-rated teachers
db.collection('teachers')
  .orderBy('performanceRating', 'desc')
  .limit(10)
  .get()
```

---

### 3. **students** Collection - Student-Specific Metadata

**Purpose:** Store student-specific information (optional but recommended)

**Document ID:** Same as user UID (enables 1:1 reference)

**Document Structure:**
```json
{
  "uid": "user_12345",
  "enrollmentNumber": "ADT23SOCB0001",
  "rollNumber": "001",
  "classroomIds": ["classroom_1", "classroom_2"],
  "classroomsCount": 2,
  "gpa": 3.85,
  "academicYear": "2024-2025",
  "admissionDate": "2023-08-15",
  "parentEmail": "parent@example.com",
  "parentPhone": "+1-555-0123",
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Field Descriptions:**
- `uid`: Reference to users collection
- `enrollmentNumber`: Unique enrollment ID (no STU_ prefix)
- `rollNumber`: Student roll number
- `classroomIds`: Array of classroom IDs the student is enrolled in
- `classroomsCount`: Number of classrooms
- `gpa`: Current grade point average
- `academicYear`: Academic year of enrollment
- `admissionDate`: Date of admission
- `parentEmail`: Parent/guardian email
- `parentPhone`: Parent/guardian contact number

**Firestore Indices:**
```
Collection: students
- Field: enrollmentNumber (Ascending) - for unique lookups
- Field: classroomIds (Ascending) - for classroom-based queries
- Field: academicYear (Descending) - for year-based filtering
```

**Typical Queries:**
```javascript
// Get student details by UID
db.collection('students').doc(uid).get()

// Find student by enrollment number
db.collection('students')
  .where('enrollmentNumber', '==', 'ADT23SOCB0001')
  .limit(1)
  .get()

// List students in a classroom
db.collection('students')
  .where('classroomIds', 'array-contains', 'classroom_1')
  .get()

// Get students by academic year
db.collection('students')
  .where('academicYear', '==', '2024-2025')
  .orderBy('enrollmentNumber')
  .get()
```

---

## Implementation Strategy

### Phase 1: User Creation (All Roles)

When creating a new user:

1. **Create in users collection:**
   ```java
   // Backend - UserService.createUser()
   UserDTO user = new UserDTO();
   user.setEmail("john@example.com");
   user.setDisplayName("John Doe");
   user.addRole(UserRole.TEACHER);  // Add role
   user.setPasswordHash(bcryptPasswordEncoder.encode(password));
   
   // Save to Firestore users collection
   usersCollection.document(uid).set(user);
   ```

2. **If role is TEACHER - Create in teachers collection:**
   ```java
   TeacherDTO teacher = new TeacherDTO();
   teacher.setUid(uid);
   teacher.setDepartment("Science");
   teacher.setSubjectsTeaching(Arrays.asList("Physics"));
   
   // Save to Firestore teachers collection
   teachersCollection.document(uid).set(teacher);
   ```

3. **If role is STUDENT - Create in students collection:**
   ```java
   StudentDTO student = new StudentDTO();
   student.setUid(uid);
   student.setEnrollmentNumber("ADT23SOCB0001");
   student.setRollNumber("001");
   
   // Save to Firestore students collection
   studentsCollection.document(uid).set(student);
   ```

### Phase 2: Updating User

When a user needs a role change:

1. **Add role to users collection:**
   ```java
   // Promote teacher to admin
   user.addRole(UserRole.ADMIN);
   usersCollection.document(uid).update("roles", user.getRoles());
   ```

2. **Create corresponding sub-collection data if needed:**
   ```java
   // If promoting to teacher
   if (!user.hasRole(UserRole.TEACHER)) {
       user.addRole(UserRole.TEACHER);
       TeacherDTO teacher = new TeacherDTO();
       teacher.setUid(uid);
       teachersCollection.document(uid).set(teacher);
   }
   ```

### Phase 3: Querying Multi-Role Users

```java
// Find all users who are teachers
Query query = usersCollection
    .whereArrayContains("roles", UserRole.TEACHER.toString());

// Find users who are BOTH teacher and admin
Query query = usersCollection
    .whereArrayContains("roles", UserRole.TEACHER.toString());
// Then filter in code for ADMIN role
```

---

## Migration Guide (From Single Role to Multi-Role)

If migrating from existing single-role system:

### 1. Add Multi-Role Support to Existing Users

```java
// Firestore batch operation
WriteBatch batch = db.batch();

QuerySnapshot snapshot = usersCollection.get();
for (DocumentSnapshot doc : snapshot.getDocuments()) {
    UserDTO user = doc.toObject(UserDTO.class);
    List<UserRole> roles = new ArrayList<>();
    
    // Convert single role to list
    if (user.getRole() != null) {
        roles.add(user.getRole());
    }
    
    batch.update(doc.getReference(), "roles", roles);
}

batch.commit();
```

### 2. Bulk Create Teacher Collection for Existing Teachers

```java
// Create teachers collection entries for all users with TEACHER role
QuerySnapshot snapshot = usersCollection
    .whereArrayContains("roles", "TEACHER")
    .get();

for (DocumentSnapshot doc : snapshot.getDocuments()) {
    UserDTO user = doc.toObject(UserDTO.class);
    
    TeacherDTO teacher = new TeacherDTO();
    teacher.setUid(user.getUid());
    teacher.setDepartment("General");  // Default value
    
    teachersCollection.document(user.getUid()).set(teacher);
}
```

---

## Best Practices

### 1. **Data Consistency**
- Always keep uid consistent across collections
- Update timestamp whenever modifying data
- Validate role changes before persisting

### 2. **Query Optimization**
- Use Firestore indices for frequently queried fields
- Avoid N+1 queries by batching reads
- Cache teacher/student lists in memory if not frequently changing

### 3. **Security Rules**

```javascript
// Firestore security rules example
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only self-access unless admin
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid || 
                          hasRole(request.auth.uid, 'ADMIN');
    }
    
    // Teachers collection - read by all, write by admin only
    match /teachers/{uid} {
      allow read: if request.auth != null;
      allow write: if hasRole(request.auth.uid, 'ADMIN');
    }
    
    // Students collection - read by own teacher, self, or admin
    match /students/{uid} {
      allow read: if request.auth.uid == uid || 
                     hasRole(request.auth.uid, 'ADMIN');
      allow write: if hasRole(request.auth.uid, 'ADMIN');
    }
  }
  
  function hasRole(uid, role) {
    return get(/databases/$(database)/documents/users/$(uid))
      .data.roles.hasAny([role]);
  }
}
```

### 4. **Transaction Handling**
- Use transactions for operations spanning multiple collections
- Example: Adding teacher + updating users collection

```java
db.runTransaction(transaction -> {
    DocumentReference userRef = usersCollection.document(uid);
    DocumentReference teacherRef = teachersCollection.document(uid);
    
    // Read user first
    UserDTO user = transaction.get(userRef).toObject(UserDTO.class);
    user.addRole(UserRole.TEACHER);
    
    // Update user with new role
    transaction.update(userRef, "roles", user.getRoles());
    
    // Create teacher document
    TeacherDTO teacher = new TeacherDTO();
    teacher.setUid(uid);
    transaction.set(teacherRef, teacher);
    
    return null;
});
```

---

## DTOs for New Collections

### TeacherDTO.java
```java
public class TeacherDTO {
    private String uid;
    private String qualification;
    private Integer experience;
    private String department;
    private List<String> subjectsTeaching;
    private String bio;
    private String specialization;
    private Integer classroomsCount;
    private Integer studentsCount;
    private Double performanceRating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Getters and setters...
}
```

### StudentDTO.java
```java
public class StudentDTO {
    private String uid;
    private String enrollmentNumber;
    private String rollNumber;
    private List<String> classroomIds;
    private Integer classroomsCount;
    private Double gpa;
    private String academicYear;
    private LocalDate admissionDate;
    private String parentEmail;
    private String parentPhone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Getters and setters...
}
```

---

## Summary

**When a user is created as a teacher:**

1. **users collection** stores: uid, email, displayName, roles=[TEACHER], authentication data
2. **teachers collection** stores: uid, qualification, department, subjects, etc.
3. Both are linked via uid
4. Queries can filter by role in users, then join with teachers for additional metadata

**Benefits:**
- ✅ Users can have multiple roles
- ✅ Role-based queries remain efficient
- ✅ Teacher-specific data kept separate (clean architecture)
- ✅ Easy to extend with more role-specific collections later
- ✅ Backward compatible with existing single-role code
