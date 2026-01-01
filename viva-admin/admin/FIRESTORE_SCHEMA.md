# Firestore Collections Schema

## Overview
This document defines the Firestore database structure for the Viva Admin Panel. The database is organized into four main collections with subcollections for hierarchical data.

---

## 1. **users** Collection

**Purpose:** Store user profiles and authentication metadata. Single source of truth for all user accounts.

**Collection Path:** `users/{uid}`

**Document Structure:**
```json
{
  "uid": "user_firebase_id",
  "email": "user@example.com",
  "displayName": "John Doe",
  "photoUrl": "https://example.com/photo.jpg",
  "roles": ["TEACHER", "ADMIN"],  // Array for multi-role support
  "passwordHash": "bcrypt_hashed_password",
  "mustChangePassword": false,
  "emailVerified": true,
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Important Notes:**
- A user can have **multiple roles** (e.g., both TEACHER and ADMIN)
- All user data is stored in this single collection
- Teacher-specific metadata is stored in the separate `teachers` collection
- Student-specific metadata is stored in the separate `students` collection
- The `roles` array allows checking permissions efficiently

**Indices:**
- `email` (unique via Firebase Auth)
- `roles` (for querying users by role)

**Typical Queries:**
- Find user by UID
- Find user by email
- List all users with TEACHER role
- List all users with ADMIN role
- Find users with multiple roles

---

## 1.1 **teachers** Collection (Optional, Teacher-Specific Data)

**Purpose:** Store teacher-specific metadata and performance data.

**Collection Path:** `teachers/{uid}`

**Document Structure:**
```json
{
  "uid": "user_firebase_id",
  "qualification": "M.Sc. Physics",
  "experience": 5,
  "department": "Science",
  "classroomsCount": 3,
  "studentsCount": 45,
  "bio": "Experienced physics educator",
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Relationship:**
- Linked to `users` collection via `uid`
- Only exists if user has TEACHER role
- References classrooms via their `teacherId`

---

## 1.2 **students** Collection (Optional, Student-Specific Data)

**Purpose:** Store student-specific metadata and progress data.

**Collection Path:** `students/{uid}`

**Document Structure:**
```json
{
  "uid": "user_firebase_id",
  "enrollmentNumber": "ADT23SOCB0001",
  "rollNumber": "001",
  "classroomIds": ["classroom1", "classroom2"],
  "classroomsCount": 2,
  "gpa": 3.8,
  "academicYear": "2024-2025",
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Relationship:**
- Linked to `users` collection via `uid`
- Only exists if user has STUDENT role
- References classrooms via `classroomIds`

---

## 2. **classrooms** Collection

**Purpose:** Store classroom information managed by teachers.

**Collection Path:** `classrooms/{classroomId}`

**Document Structure:**
```json
{
  "id": "classroom_doc_id",
  "name": "Physics 101",
  "description": "Advanced Physics Course",
  "teacherId": "user_uid",
  "teacherName": "John Doe",
  "subject": "Physics",
  "grade": "Grade 10",
  "studentIds": ["uid1", "uid2", "uid3"],
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Indices:**
- `teacherId` (for listing teacher's classrooms)
- `subject` (for filtering by subject)

**Subcollections:**
None at this level. Use top-level assignments and announcements with `classroomId` reference.

**Typical Queries:**
- Get classroom by ID
- List classrooms by teacher
- Get all classrooms
- Add/remove students from classroom

---

## 3. **assignments** Collection

**Purpose:** Store assignments created by teachers for their classrooms.

**Collection Path:** `assignments/{assignmentId}`

**Document Structure:**
```json
{
  "id": "assignment_doc_id",
  "classroomId": "classroom_doc_id",
  "title": "Chapter 5 Exercises",
  "description": "Complete all exercises on page 45-50",
  "teacherId": "user_uid",
  "subject": "Physics",
  "dueDate": "2024-12-31T23:59:59Z",
  "totalPoints": 100,
  "published": true,
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Indices:**
- `classroomId` (for listing assignments in a classroom)
- `teacherId` (for listing teacher's assignments)
- `published` (for filtering published/draft assignments)

**Subcollections:**
Consider adding a `submissions/{studentId}` subcollection under assignments for student submissions.

**Typical Queries:**
- Get assignment by ID
- List assignments by classroom
- List assignments by teacher
- List published assignments for a classroom
- Filter by due date

---

## 4. **announcements** Collection

**Purpose:** Store announcements posted by teachers to their classrooms.

**Collection Path:** `announcements/{announcementId}`

**Document Structure:**
```json
{
  "id": "announcement_doc_id",
  "classroomId": "classroom_doc_id",
  "title": "Exam Postponed",
  "content": "The physics exam scheduled for Jan 5 has been postponed to Jan 12...",
  "authorId": "user_uid",
  "authorName": "John Doe",
  "publishedAt": "2024-12-25T10:00:00Z",
  "archived": false,
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

**Indices:**
- `classroomId` (for listing announcements in a classroom)
- `authorId` (for listing announcements by teacher)
- `archived` (for filtering active/archived announcements)

**Typical Queries:**
- Get announcement by ID
- List announcements by classroom
- List announcements by author
- List active (non-archived) announcements
- Filter by publish date

---

## Relationships & Data Integrity

| Collection | References | Type |
|-----------|-----------|------|
| classrooms | users.uid (teacherId) | Foreign Key |
| assignments | classrooms.id, users.uid (teacherId) | Foreign Keys |
| announcements | classrooms.id, users.uid (authorId) | Foreign Keys |

**Important:** Firebase does not enforce referential integrity. Applications should:
1. Validate references before operations
2. Cascade deletes when a teacher is deleted
3. Handle orphaned documents gracefully

---

## Security Rules (Firestore)

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users: ADMIN can read/write all, TEACHER can read/write own
    match /users/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == resource.id || 
                      request.auth.token.role == 'ADMIN';
    }
    
    // Classrooms: TEACHER owns, ADMIN can manage
    match /classrooms/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.token.uid == resource.data.teacherId ||
                      request.auth.token.role == 'ADMIN';
    }
    
    // Assignments: Same as classrooms
    match /assignments/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.token.uid == resource.data.teacherId ||
                      request.auth.token.role == 'ADMIN';
    }
    
    // Announcements: Same as classrooms
    match /announcements/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.token.uid == resource.data.authorId ||
                      request.auth.token.role == 'ADMIN';
    }
  }
}
```

---

## Migration Path

When implementing the repository layer:

1. **Phase 1:** Implement basic CRUD for all collections
2. **Phase 2:** Add subcollections for submissions if needed
3. **Phase 3:** Implement real-time listeners for classroom updates
4. **Phase 4:** Add batch operations for bulk student enrollment

---

## Notes

- Document IDs are auto-generated by Firestore (recommended)
- Timestamps should use ISO 8601 format (e.g., 2024-12-25T10:00:00Z)
- Denormalize `teacherName` and `authorName` in classrooms/announcements for query efficiency
- Consider caching strategies for frequently accessed data (e.g., classroom list by teacher)
