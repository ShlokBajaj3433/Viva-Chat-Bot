# VIVA - Interview Practice Platform

A comprehensive platform for conducting mock interviews with AI-powered assessment and admin management.

## 📁 Project Structure

### 🎓 [`ai_mock_interviews/`](ai_mock_interviews)
**Next.js Student Portal** - Interactive interview practice platform
- Student authentication & profile management
- AI-powered mock interviews with real-time feedback
- Past interview history and performance analytics
- Dashboard with leaderboard and statistics
- **Tech Stack:** Next.js, React, TypeScript, Firebase

### 👨‍💼 [`viva-admin/admin/`](viva-admin/admin)
**Spring Boot Admin Panel** - Complete administration system
- User management (Students, Teachers, Admins)
- Classroom and assignment management
- Bulk student upload via Excel
- Teacher assignment and performance tracking
- Role-based access control (RBAC)
- **Tech Stack:** Spring Boot, Java 17, Firebase Firestore

---

## 🚀 Quick Start

### Backend (Admin Panel)
```bash
cd viva-admin/admin
./gradlew bootRun
# Runs on http://localhost:8080
```

### Frontend (Student Portal)
```bash
cd ai_mock_interviews
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 📚 Documentation

- **[Admin Portal Setup](viva-admin/admin/README.md)** - Backend configuration and API docs
- **[Environment Setup](ENVIRONMENT_SETUP.md)** - Firebase & credential configuration
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[Database Schema](viva-admin/admin/FIRESTORE_SCHEMA.md)** - Data structure and relationships

---

## 🔐 Security

- JWT authentication with 24-hour token expiration
- Role-based access control (RBAC)
- Firestore security rules
- Encrypted password storage (BCrypt)
- **Never commit:** `.env`, `firebase-service-account.json`

---

## 📋 Features

✅ Student registration & management
✅ AI-powered mock interviews
✅ Classroom organization
✅ Bulk student upload (Excel)
✅ Teacher assignment & tracking
✅ Performance analytics & leaderboard
✅ Multi-role user system (Admin, Teacher, Student)
✅ Real-time feedback & assessment

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14, React, TypeScript |
| Backend | Spring Boot 4.0, Java 17 |
| Database | Firebase Firestore |
| Auth | Firebase Auth + JWT |
| Deployment | Vercel (frontend), Cloud Run (backend) |

---

## 📞 Support

For setup issues, refer to [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)

---

**Ready to deploy?** See [Deployment Guide](DEPLOYMENT_GUIDE.md)
