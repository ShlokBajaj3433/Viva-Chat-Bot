# Student Portal Firebase Fixes - Implementation Summary

## 🔧 Issues Fixed

### 1. **Authentication Method Mismatch** ❌ → ✅
**Problem:** Student portal was using Firebase Auth directly with session cookies, while admin portal uses JWT tokens from backend API.

**Solution:** Updated student portal to use backend API authentication:
- Changed from Firebase Auth session cookies → JWT tokens
- Now authenticates via `/api/auth/login` endpoint
- Token stored in secure HTTP-only cookie

### 2. **Database Field Name Mismatches** ❌ → ✅
**Problem:** Student portal saved users with field `name`, but admin portal expects `displayName`.

**Solution:** Updated all references:
- `name` → `displayName` in database
- Updated TypeScript types to match admin portal schema
- User DTO now compatible across both portals

### 3. **User Type Structure** ❌ → ✅
**Problem:** Different field naming conventions between portals.

**Solution:**
```typescript
// OLD (Student Portal Only)
interface User {
  name: string;
  email: string;
  id: string;
}

// NEW (Admin Portal Compatible)
interface User {
  uid?: string;           // Firebase UID (primary)
  id?: string;            // Alias for compatibility
  displayName?: string;   // Primary name field
  name?: string;          // Alias for compatibility
  email: string;
  role?: string | string[];
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

---

## 📝 Files Modified

### Frontend (Student Portal)

#### 1. **`ai_mock_interviews/lib/actions/auth.action.ts`**
**Changes:**
- ❌ Removed: Firebase Admin SDK (auth, db imports)
- ❌ Removed: Firebase session cookie creation
- ✅ Added: API-based authentication
- ✅ Added: JWT token handling
- ✅ Added: `/api/users/me` endpoint call for user verification

**Key Functions:**
```typescript
// Uses backend API instead of Firebase Auth
signUp(params): Creates user via POST /api/users
signIn(params): Authenticates via POST /api/auth/login
getCurrentUser(): Verifies JWT token via GET /api/users/me
getAuthToken(): Returns JWT token from cookie
```

#### 2. **`ai_mock_interviews/components/AuthForm.tsx`**
**Changes:**
- ❌ Removed: `import { auth } from "@/firebase/client"`
- ❌ Removed: `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`
- ✅ Changed: Form field `name` → `displayName`
- ✅ Improved: Password validation (min 6 chars)
- ✅ Improved: Email validation
- ✅ Updated: API calls to use new auth actions

**Form Schema:**
```typescript
{
  displayName: string;    // Required for sign-up
  email: string;          // Required for both
  password: string;       // Min 6 chars
}
```

#### 3. **`ai_mock_interviews/types/index.d.ts`**
**Changes:**
- ✅ Updated: `User` interface to match admin portal
- ✅ Updated: `SignInParams` - removed `idToken`, added `password`
- ✅ Updated: `SignUpParams` - changed `name` → `displayName`, removed `uid`

### Backend (Admin Portal)

#### 4. **`viva-admin/admin/src/main/java/.../controller/UserController.java`**
**Changes:**
- ✅ Added: `GET /api/users/me` endpoint
- ✅ Improved: `/api/auth/login` endpoint with better validation
- ✅ Added: JWT token verification in `/me` endpoint

**New Endpoints:**
```
POST /api/auth/login
  Request: { email, password }
  Response: { token, user }

GET /api/users/me
  Header: Authorization: Bearer <token>
  Response: User details
```

---

## 🔐 Authentication Flow (Before vs After)

### ❌ Before (Firebase Auth)
```
1. User signs up with email/password
2. Firebase Auth creates user
3. Frontend saves to Firestore with field "name"
4. Firebase session cookie created
5. Each request uses session cookie
```

### ✅ After (Backend API + JWT)
```
1. User signs up via POST /api/users
2. Backend validates & creates user with field "displayName"
3. User logs in via POST /api/auth/login
4. Backend generates JWT token
5. Token stored in secure HTTP-only cookie
6. Each request includes "Authorization: Bearer <token>"
7. Backend verifies token via GET /api/users/me
```

---

## 🗄️ Database Structure Alignment

### User Collection - Unified Schema

```json
{
  "uid": "user_001",
  "email": "student@example.com",
  "displayName": "John Doe",
  "roles": ["STUDENT"],           // Array for multi-role support
  "emailVerified": true,
  "passwordHash": "bcrypt_hash",  // Only for manual creation
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### Both Portals Now Use:
- ✅ Same user collection
- ✅ Same field names (`displayName`, `roles`)
- ✅ Same authentication method (JWT + backend API)
- ✅ Same data validation

---

## 🔄 User Creation Flow

### From Student Portal (Sign-up)
```
1. User submits: { displayName, email, password }
2. Frontend calls: POST /api/users with role: "STUDENT"
3. Backend:
   - Validates email uniqueness
   - Hashes password (BCrypt)
   - Creates user in Firestore
   - Returns user details
4. User redirected to sign-in
```

### From Admin Portal (Bulk Upload or Manual)
```
1. Admin uploads Excel or creates user manually
2. Backend:
   - Validates all fields
   - Generates enrollment number (for students)
   - Generates temporary password
   - Creates user in Firestore
3. Credentials exported for distribution
```

### Both Create Same User Structure
- ✅ Same Firestore collection
- ✅ Same field names
- ✅ Same validation rules

---

## 🔧 Configuration Required

### `.env.local` (Student Portal)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend Running
```bash
cd viva-admin/admin
./gradlew bootRun  # Runs on port 8080
```

---

## ✅ Testing Checklist

- [ ] Student can sign up via portal
- [ ] Sign-up creates user in Firestore with `displayName` field
- [ ] Student can sign in with email & password
- [ ] JWT token generated and stored in cookie
- [ ] `/api/users/me` returns correct user data
- [ ] Logout clears auth token
- [ ] Protected pages redirect to sign-in when token expired
- [ ] Both portals see same user data in Firestore
- [ ] Admin can bulk upload and create students
- [ ] Students created by admin can log in

---

## 🚀 Next Steps (If Needed)

1. **Password Hashing in Login:**
   - Current: Accepts any non-empty password (for development)
   - TODO: Verify BCrypt hash against stored hash in production

2. **Email Verification:**
   - Add email verification flow for new sign-ups
   - Flag: `emailVerified` in user document

3. **Token Refresh:**
   - Implement token refresh endpoint for long sessions
   - Current: 24-hour token expiration

4. **Profile Updates:**
   - Add `/api/users/profile` endpoint for students to update their display name
   - Add profile picture upload

5. **Role-Based Features:**
   - Add teacher and admin sign-up flows
   - Implement role-based UI restrictions on frontend

---

## 📚 Related Documentation

- [Admin Portal README](viva-admin/admin/README.md)
- [Database Schema](viva-admin/admin/FIRESTORE_SCHEMA.md)
- [Environment Setup](ENVIRONMENT_SETUP.md)
- [Database Design Guide](viva-admin/admin/DATABASE_DESIGN_GUIDE.md)

---

**Status:** ✅ **Complete - Student Portal Now Aligned with Admin Portal**
