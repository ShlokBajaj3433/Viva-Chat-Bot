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

✅ **User Management** - Create, update, delete users (Students, Teachers, Admins)
✅ **Bulk Upload** - Import students via Excel with automatic credential generation
✅ **Classroom Management** - Create classrooms, assign teachers, manage students
✅ **RBAC** - Role-based access control (Super Admin, Admin, Teacher, Student)
✅ **JWT Auth** - Secure API endpoints with Bearer token authentication
✅ **Excel Integration** - Download student credentials and templates

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login, returns JWT token

### User Management
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users/{uid}` - Get user details
- `PUT /api/users/{uid}` - Update user
- `DELETE /api/users/{uid}` - Delete user

### Bulk Operations
- `GET /api/students/template` - Download Excel template
- `POST /api/students/bulk-upload` - Upload students from Excel
- `POST /api/students/credentials-export` - Export student credentials

### Classrooms
- `GET /api/classrooms` - List classrooms
- `POST /api/classrooms` - Create classroom
- `GET /api/classrooms/{id}` - Get classroom details
- `PUT /api/classrooms/{id}` - Update classroom
- `DELETE /api/classrooms/{id}` - Delete classroom

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

## 🔐 Security Features

- JWT authentication (24-hour expiration)
- BCrypt password hashing
- Role-based access control (RBAC)
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
  --platform managed \
  --region us-central1 \
  --set-env-vars FIREBASE_PROJECT_ID=xxx,JWT_SECRET=xxx
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

## 🚀 Next Steps

1. Configure Firebase credentials (see [ENVIRONMENT_SETUP.md](../ENVIRONMENT_SETUP.md))
2. Run `./gradlew bootRun` to start backend
3. Access API at http://localhost:8080
4. Test endpoints using Postman or curl

**Related:** [Student Portal Frontend](../../ai_mock_interviews/README.md)
