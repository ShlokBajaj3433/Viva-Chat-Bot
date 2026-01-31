# VIVA Admin Panel - Backend API

Spring Boot-based administration system for managing users, classrooms, assignments, and system configuration.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Gradle
- Firebase credentials

### Setup
```bash
# Copy environment template
cp .env.example .env

# Configure Firebase credentials
# Add your firebase-service-account.json

# Run backend
./gradlew bootRun
```

Backend runs on: **http://localhost:8080**

---

## 📋 Key Features

✅ **Role-Based Access Control** - 4-tier role system (Super Admin, Admin, Teacher, Student) with granular permissions
✅ **User Management** - Create, update, delete users with role-based restrictions
✅ **Bulk Upload Teachers** - Import teachers via Excel with automatic credential generation (Admin-only)
✅ **Bulk Upload Students** - Import students via Excel with automatic credential generation (Admin & Teacher)
✅ **Classroom Management** - Create classrooms, assign teachers, manage students
✅ **JWT Authentication** - Secure API endpoints with Bearer token authentication
✅ **Excel Integration** - Download templates and credentials for teachers and students
✅ **Permission Enforcement** - Prevent privilege escalation (Admins cannot create other Admins)

---

## 🎯 Role System

### SUPER_ADMIN
- Full system access
- Can manage all roles including other Super Admins
- System configuration and monitoring

### ADMIN
- Manage teachers and students
- Bulk upload teachers and students
- **CANNOT** create or manage other Admins or Super Admins

### TEACHER
- Manage their own classrooms
- Bulk upload students to their classrooms
- Create and grade assignments
- **CANNOT** manage other teachers or access admin features

### STUDENT
- View enrolled classrooms
- Submit assignments
- View grades and progress
- **CANNOT** create or manage any users

**📖 See [RBAC_GUIDE.md](RBAC_GUIDE.md) for detailed role documentation**

---

## 🔌 API Endpoints

### Authentication
- `POST /api/users/login` - User login, returns JWT token
- `GET /api/users/me` - Get current authenticated user

### User Management (Role-based access)
- `GET /api/users` - List all users (SUPER_ADMIN, ADMIN)
- `POST /api/users` - Create new user (SUPER_ADMIN, ADMIN with role restrictions)
- `GET /api/users/{uid}` - Get user details
- `PUT /api/users/{uid}` - Update user (with role-based restrictions)
- `DELETE /api/users/{uid}` - Delete user (SUPER_ADMIN, ADMIN with role restrictions)
- `GET /api/users/role/{role}` - List users by role (SUPER_ADMIN, ADMIN)

### Teacher Management (SUPER_ADMIN & ADMIN only)
- `GET /api/teachers/bulk-upload-template` - Download teacher Excel template
- `POST /api/teachers/bulk-upload` - Bulk upload teachers from Excel
- `POST /api/teachers/download-credentials` - Download teacher credentials Excel

### Student Management (SUPER_ADMIN, ADMIN & TEACHER)
- `GET /api/students/template` - Download student Excel template
- `POST /api/students/bulk-upload` - Upload students from Excel
- `POST /api/students/credentials-export` - Export student credentials

### Classrooms
- `GET /api/classrooms` - List classrooms (role-filtered)
- `POST /api/classrooms` - Create classroom
- `GET /api/classrooms/{id}` - Get classroom details
- `PUT /api/classrooms/{id}` - Update classroom
- `DELETE /api/classrooms/{id}` - Delete classroom, Super Admins)
- `teachers` - Teacher-specific metadata (employeeId, department, qualification, etc.)
- `students` - Student-specific metadata (enrollmentNumber, rollNumber, etc.)
- `classrooms` - Classroom records with teacher and student references
- `assignments` - Assignments & tasks
- `announcements` - System announcements

**Role Field:** Users can have multiple roles stored in a `roles` array.for detailed API documentation with examples**

---

## 🗄️ Database

**Firestore Collections:**
- `users` - All user accounts (Students, Teachers, Admins)
- `teachers` - Teacher-specific metadata (optional)
- `students` - Student-specific metadata (optional)
- `classrooms` - Classroom records
- `assignments` - Assignments & tasks
- `announcements` - System announcements

See [FIRESTORE_SCHEMA.md](FIRESTORE_SCHEMA.md) for detailed schema

---

##**JWT Authentication** (24-hour expiration, configurable)
- **BCrypt Password Hashing** for all user passwords
- **Role-Based Access Control (RBAC)** with 4-tier hierarchy
- **Permission Enforcement** prevents privilege escalation
- **AOP-based Authorization** using `@RequireRole` annotation
- **Firestore Security Rules** for database-level protection
- **Request Validation** & comprehensive error handling
- **Forced Password Change** on first login

### Security Highlights
- ✅ Admins **CANNOT** create other Admins (only Super Admins can)
- ✅ Teachers can only manage their own classrooms
- ✅ Role-based filtering on all list endpoints
- ✅ Token-based authentication with automatic expiration
- Firestore security rules
- Request validation & error handling

---

## 🛠️ Configuration

### Environment Variables (`.env`)

```env
# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=your-private-key

# JWT
JWT_SECRET=your-jwt-secret-key-min-32-chars
JWT_EXPIRATION_HOURS=24

# Server
SERVER_PORT=8080
```

### Application Properties

See `application.properties` for additional Spring Boot configuration

---

## 📦 Building & Deployment

### Local Build
```bash
./gradlew build
```

### Docker Build
```bash
docker build -t viva-admin:latest .
docker run -p 8080:8080 -e FIREBASE_PROJECT_ID=xxx viva-admin:latest
```

### Cloud Run Deploy
```bash
gcloud run deploy viva-admin \
  --source . \
  **[RBAC_GUIDE.md](RBAC_GUIDE.md)** - Complete role-based access control guide with examples
- **[FIRESTORE_SCHEMA.md](FIRESTORE_SCHEMA.md)** - Database structure and schema details
- **[DATABASE_DESIGN_GUIDE.md](DATABASE_DESIGN_GUIDE.md)** - Multi-role user architecture
- **[ENVIRONMENT_SETUP.md](../ENVIRONMENT_SETUP.md)** - Firebase & credentials setup
- **[ADMIN_TEACHER_PORTAL_GUIDE.md](ADMIN_TEACHER_PORTAL_GUIDE.md)** - Admin/Teacher portal usag
```

---

## 📚 Documentation

- [Database Schema](FIRESTORE_SCHEMA.md) - Data structure details
- [Environment Setup](../ENVIRONMENT_SETUP.md) - Firebase & credentials
- [Database Design Guide](DATABASE_DESIGN_GUIDE.md) - Multi-role user architecture

---

## 🧪 Testing

```bash
# Run tests
./gradlew test

# Run with coverage
./gradlew test jacocoTestReport
```

---

## 📞 Troubleshooting

**Firebase credentials not found?**
- Ensure `firebase-service-account.json` exists in this directory
- Or set environment variables: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

**Port 8080 already in use?**
- Change in `.env`: `SERVER_PORT=8081`

**JWT token expired?**
- Default: 24 hours. Change `JWT_EXPIRATION_HOURS` in `.env`

---

## **Setup Firebase:** Configure credentials (see [ENVIRONMENT_SETUP.md](../ENVIRONMENT_SETUP.md))
2. **Create Super Admin:** `POST /api/users/setup/superadmin`
3. **Start Backend:** `./gradlew bootRun`
4. **Login as Super Admin:** Use `/api/users/login`
5. **Create Admins:** Use Super Admin to create Admin users
6. **Bulk Upload Teachers:** Admins can upload teachers via Excel
7. **Teachers Create Classrooms:** Teachers can create and manage their classrooms
8. **Bulk Upload Students:** Admins/Teachers upload students to classrooms

**📖 Detailed Workflow:** See [RBAC_GUIDE.md](RBAC_GUIDE.md) for step-by-step exampleskend
3. Access API at http://localhost:8080
4. Test endpoints using Postman or curl

**Related:** [Student Portal Frontend](../../ai_mock_interviews/README.md)
