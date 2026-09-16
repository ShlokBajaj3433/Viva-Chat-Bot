# Environment Setup Guide

## ⚠️ SECURITY ALERT

**Never commit the following files to GitHub:**
- `firebase-service-account.json` - Contains your Firebase private key
- `.env` - Contains sensitive credentials
- Any files with passwords, API keys, or credentials

These files are protected by `.gitignore` at multiple levels.

---

## Backend Setup (Spring Boot Admin Panel)

### 1. Obtain Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → Settings → Service Accounts
3. Click "Generate New Private Key"
4. Save the downloaded JSON file as `firebase-service-account.json` in:
   ```
   viva-admin/admin/firebase-service-account.json
   ```

### 2. Create Environment Variables

**Option A: Using firebase-service-account.json** (Recommended for local development)
```bash
# File will be auto-loaded from the path
# Just ensure firebase-service-account.json exists
```

**Option B: Using Environment Variables** (For deployment)
```bash
# Set these environment variables:
export FIREBASE_PROJECT_ID=your-project-id
export FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3. Backend Configuration

Copy `.env.example` to `.env` (but it will be git-ignored):
```bash
cd viva-admin/admin
cp .env.example .env
# Edit .env with your actual values
```

Set JWT_SECRET (minimum 32 characters):
```bash
JWT_SECRET=your-super-secret-jwt-key-at-least-32-chars-long
JWT_EXPIRATION_HOURS=24
SERVER_PORT=8080
```

### 4. Run Backend

```bash
cd viva-admin/admin
./gradlew bootRun
```

---

## Frontend Setup (Next.js Student Portal)

### 1. Copy Environment Template

```bash
cd ai_mock_interviews
cp .env.example .env.local
```

### 2. Get Firebase Web Config

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → Project Settings
3. Copy your **Web App** configuration (Config object)
4. Fill in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...

NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. Install Dependencies & Run

```bash
cd ai_mock_interviews
npm install
npm run dev
```

Access at: http://localhost:3000

---

## GitHub Deployment Security

### Files Protected by `.gitignore`:

**Root level (.gitignore):**
```
.env
.env.local
firebase-service-account.json
.vscode/
.idea/
```

**Backend (.gitignore):**
```
firebase-service-account.json
.env
.env.local
application.properties
application-*.properties
```

**Frontend (.gitignore):**
```
.env
.env.local
.env.*.local
```

### Before Pushing to GitHub:

```bash
# 1. Verify no sensitive files will be committed
git status

# 2. Check .gitignore files exist
ls -la .gitignore
ls -la viva-admin/admin/.gitignore
ls -la ai_mock_interviews/.gitignore

# 3. Verify sensitive files are ignored
git check-ignore firebase-service-account.json      # Should return path
git check-ignore .env                               # Should return path
git check-ignore ai_mock_interviews/.env.local      # Should return path

# 4. List what WILL be committed
git add .
git status

# If you see any .env or firebase-service-account.json files, DO NOT COMMIT
```

---

## Environment Variables Summary

| Variable | Purpose | Backend | Frontend | Required | Notes |
|----------|---------|---------|----------|----------|-------|
| `FIREBASE_PROJECT_ID` | Firebase project | ✓ | ✓ | Yes | From Firebase Console |
| `FIREBASE_CLIENT_EMAIL` | Service account email | ✓ | ✗ | Yes | From service account JSON |
| `FIREBASE_PRIVATE_KEY` | Service account key | ✓ | ✗ | Yes | **Keep secret!** |
| `JWT_SECRET` | JWT signing key | ✓ | ✗ | Yes | Min 32 characters |
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | ✗ | ✓ | No | Default: http://localhost:8080 |

---

## Docker/Container Deployment

For Docker, set environment variables at runtime:

```bash
docker run -e FIREBASE_PROJECT_ID=xxx \
           -e FIREBASE_CLIENT_EMAIL=xxx \
           -e FIREBASE_PRIVATE_KEY="xxx" \
           -e JWT_SECRET=xxx \
           your-image:tag
```

Or use Docker Secrets for production:

```dockerfile
RUN --mount=type=secret,id=firebase_key \
    export FIREBASE_PRIVATE_KEY="$(cat /run/secrets/firebase_key)"
```

---

## Troubleshooting

### "Firebase credentials not found"
- Check `firebase-service-account.json` exists in `viva-admin/admin/`
- Or set environment variables `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

### ".env file not found"
- For Next.js: Create `.env.local` (not `.env`)
- For Spring Boot: Optional, but recommended for local development

### "JWT_SECRET too short"
- Ensure `JWT_SECRET` has at least 32 characters

### Cannot connect to backend from frontend
- Check `NEXT_PUBLIC_API_URL` matches backend server address
- Ensure backend is running on the specified port
- Check CORS configuration in backend

---

## Production Deployment

### Use GitHub Secrets for CI/CD:

1. Go to Repository Settings → Secrets and Variables → Actions
2. Create secrets:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `JWT_SECRET`
3. Reference in `.github/workflows/deploy.yml`:

```yaml
env:
  FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
  FIREBASE_PRIVATE_KEY: ${{ secrets.FIREBASE_PRIVATE_KEY }}
```

---

**Remember: Never commit `.env` or `firebase-service-account.json` files!**
