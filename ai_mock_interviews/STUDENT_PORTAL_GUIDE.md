# Student Portal - Updated Authentication Guide

## Quick Start

### 1. Start the Backend (Admin Portal)
```bash
cd viva-admin/admin
./gradlew bootRun
# Backend runs on http://localhost:8080
```

### 2. Start the Frontend (Student Portal)
```bash
cd ai_mock_interviews
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### 3. Test Sign-Up
1. Go to `http://localhost:3000/sign-up`
2. Enter:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
3. Click "Create an Account"
4. You should see: "Account created successfully. Please sign in."
5. Redirected to `/sign-in`

### 4. Test Sign-In
1. Enter email: "john@example.com"
2. Enter password: "password123"
3. Click "Sign In"
4. You should be logged in and redirected to dashboard

---

## How It Works Now

### Authentication Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    SIGN-UP FLOW                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User Form (AuthForm.tsx)                                        │
│       │                                                          │
│       ├─ displayName (John Doe)                                  │
│       ├─ email (john@example.com)                                │
│       └─ password (password123)                                  │
│            │                                                     │
│            ▼                                                     │
│  signUp() action [auth.action.ts]                                │
│            │                                                     │
│            ▼                                                     │
│  POST /api/users (Backend)                                       │
│            │                                                     │
│            ├─ Validate email unique                              │
│            ├─ Hash password (BCrypt)                             │
│            ├─ Create user in Firestore:                          │
│            │  {                                                  │
│            │    uid: "user_001",                                 │
│            │    email: "john@example.com",                       │
│            │    displayName: "John Doe",                         │
│            │    role: "STUDENT"                                  │
│            │  }                                                  │
│            └─ Return user details                                │
│            │                                                     │
│            ▼                                                     │
│  Redirect to /sign-in                                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SIGN-IN FLOW                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User Form (AuthForm.tsx)                                        │
│       │                                                          │
│       ├─ email (john@example.com)                                │
│       └─ password (password123)                                  │
│            │                                                     │
│            ▼                                                     │
│  signIn() action [auth.action.ts]                                │
│            │                                                     │
│            ▼                                                     │
│  POST /api/auth/login (Backend)                                  │
│            │                                                     │
│            ├─ Find user by email                                 │
│            ├─ Verify password                                    │
│            ├─ Generate JWT token                                 │
│            └─ Return { token, user }                             │
│            │                                                     │
│            ▼                                                     │
│  setSessionCookie(token)                                         │
│            │                                                     │
│            └─ Store in HTTP-only secure cookie                   │
│            │                                                     │
│            ▼                                                     │
│  Redirect to /  (Dashboard)                                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│               PROTECTED PAGE ACCESS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User visits protected page (e.g., /profile)                     │
│            │                                                     │
│            ▼                                                     │
│  getCurrentUser() [auth.action.ts]                               │
│            │                                                     │
│            ├─ Get JWT token from cookie                          │
│            │                                                     │
│            ▼                                                     │
│  GET /api/users/me (Backend)                                     │
│  Header: Authorization: Bearer <JWT_TOKEN>                       │
│            │                                                     │
│            ├─ Verify JWT token is valid                          │
│            ├─ Extract user UID from token                        │
│            ├─ Fetch user from Firestore                          │
│            └─ Return user details                                │
│            │                                                     │
│            ├─ If token valid ─▶ Return user data                 │
│            └─ If token invalid ─▶ Delete cookie, redirect /sign-in
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints (Backend)

### User Creation
```
POST /api/users
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "displayName": "John Doe",
  "password": "password123",
  "role": "STUDENT"
}

Response: 201 Created
{
  "uid": "user_001",
  "email": "john@example.com",
  "displayName": "John Doe",
  "roles": ["STUDENT"],
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "user_001",
    "email": "john@example.com",
    "displayName": "John Doe",
    "roles": ["STUDENT"],
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### Get Current User
```
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: 200 OK
{
  "uid": "user_001",
  "email": "john@example.com",
  "displayName": "John Doe",
  "roles": ["STUDENT"],
  "emailVerified": false,
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

---

## Frontend Integration

### Get Current User in Components
```typescript
import { getCurrentUser } from "@/lib/actions/auth.action";

export default async function Profile() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Sign Out
```typescript
import { signOut } from "@/lib/actions/auth.action";

export default function LogoutButton() {
  async function handleLogout() {
    await signOut();
    router.push("/sign-in");
  }
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

### Get Auth Token (for API calls)
```typescript
import { getAuthToken } from "@/lib/actions/auth.action";

async function fetchUserInterviews() {
  const token = await getAuthToken();
  
  const response = await fetch('/api/interviews', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
}
```

---

## Database Changes

### User Document Structure
All users are now stored with unified structure in Firestore:

```json
{
  "collection": "users",
  "document": "user_001",
  "data": {
    "uid": "user_001",
    "email": "john@example.com",
    "displayName": "John Doe",
    "roles": ["STUDENT"],
    "emailVerified": false,
    "passwordHash": "$2a$10$...",  // BCrypt hash
    "mustChangePassword": false,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
}
```

### Important Changes from Old System
- ❌ Old: `"name"` field
- ✅ New: `"displayName"` field
- ❌ Old: `"role"` (string)
- ✅ New: `"roles"` (array - supports multiple roles)
- ✅ Added: `"passwordHash"` field
- ✅ Added: `"mustChangePassword"` flag
- ✅ Added: Timestamps (`createdAt`, `updatedAt`)

---

## Troubleshooting

### "Failed to sign in. Please try again."
**Possible Causes:**
- Backend not running on http://localhost:8080
- Wrong email or password
- User doesn't exist in database

**Fix:**
1. Ensure backend is running: `./gradlew bootRun`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify user exists in Firestore under `users` collection

### "Invalid email or password"
**Causes:**
- Email not found in database
- Password doesn't match

**Fix:**
1. Try signing up instead
2. Check Firestore console to see all users
3. Ensure you're using correct email

### "Get current user error"
**Causes:**
- JWT token expired
- Token not stored in cookie
- Backend `/api/users/me` endpoint not working

**Fix:**
1. Clear cookies and sign in again
2. Check browser DevTools → Application → Cookies
3. Verify backend is running and responding

### Sign-in page after refresh
**Cause:** Session cookie missing or expired

**Fix:**
- Normal behavior - sign in again
- OR implement auto-refresh of tokens (future enhancement)

---

## Security Notes

### Passwords
- ✅ Hashed with BCrypt (10 rounds)
- ✅ Never sent in response after creation
- ✅ Only password hash stored in database

### JWT Tokens
- ✅ Stored in HTTP-only secure cookie
- ✅ Automatically sent with all requests
- ✅ Cannot be accessed via JavaScript (XSS protection)
- ⏱️ Expires in 24 hours

### Cookie Security
- ✅ `httpOnly: true` - Prevents JavaScript access
- ✅ `secure: true` (in production) - HTTPS only
- ✅ `sameSite: 'lax'` - CSRF protection

---

## Future Enhancements

1. **Email Verification** - Verify email before allowing login
2. **Password Reset** - Allow users to reset forgotten passwords
3. **Token Refresh** - Implement refresh tokens for extended sessions
4. **2FA** - Two-factor authentication for security
5. **OAuth** - Google/GitHub login integration
6. **Social Profiles** - Link social media accounts

---

**All systems are now aligned! Students and admin use the same backend, database, and authentication method.** ✅
