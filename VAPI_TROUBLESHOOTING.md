# VAPI Workflow Error Troubleshooting Guide

## Error: POST https://api.vapi.ai/call/web 400 (Bad Request)

This error indicates that the VAPI API is rejecting your request. Here's how to fix it:

## Step 1: Check Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) with:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token_here
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id_here
```

### How to get these values:

1. **VAPI Web Token**:

   - Go to [VAPI Dashboard](https://dashboard.vapi.ai/)
   - Navigate to Account Settings → API Keys
   - Copy your **Public Key** (starts with `pk_`)

2. **VAPI Workflow ID**:
   - Go to VAPI Dashboard → Workflows
   - Find or create your interview workflow
   - Copy the Workflow ID

## Step 2: Verify Workflow Configuration

Your workflow in the VAPI dashboard must accept these variables:

### For "generate" type interview:

- `username` (string)
- `userid` (string)

### For regular interview:

- `questions` (string) - formatted list of questions
- `username` (string)
- `userid` (string)
- `interviewId` (string)

## Step 3: Common Issues and Solutions

### Issue 1: Invalid Workflow ID

**Symptom**: 400 Bad Request
**Solution**:

- Double-check the workflow ID in your .env.local
- Ensure the workflow exists in your VAPI dashboard
- Make sure you're using the correct account

### Issue 2: Variable Mismatch

**Symptom**: 400 Bad Request with workflow found
**Solution**:

- In VAPI Dashboard, open your workflow
- Check the "Variables" section
- Ensure all variable names match exactly (case-sensitive):
  - `username`, `userid`, `questions`, `interviewId`

### Issue 3: Invalid Token

**Symptom**: 401 or 403 errors
**Solution**:

- Generate a new public key in VAPI Dashboard
- Update NEXT_PUBLIC_VAPI_WEB_TOKEN in .env.local
- Restart your Next.js dev server

### Issue 4: Workflow Not Configured Properly

**Solution**:

- Your workflow should have:
  - A voice provider configured
  - A transcriber configured
  - A model/assistant configured
  - Proper variable definitions

## Step 4: Restart Development Server

After updating .env.local:

```powershell
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Check Browser Console

With the updated code, you'll see detailed error information:

1. Open Browser DevTools (F12)
2. Go to Console tab
3. Start an interview
4. Look for error messages that show:
   - Workflow ID being used
   - Variables being sent
   - Specific error response from VAPI

## Step 6: Fallback Behavior

If the workflow fails, the app will now:

1. Show a detailed error message
2. For regular interviews: Fall back to the default interviewer assistant
3. For "generate" type: Stop and show error (no fallback)

## Testing Checklist

- [ ] `.env.local` file exists and has both tokens
- [ ] Tokens don't have extra spaces or quotes
- [ ] Development server restarted after env changes
- [ ] Workflow exists in VAPI dashboard
- [ ] Workflow variables match the code
- [ ] Browser console shows detailed error logs

## Still Having Issues?

Check the browser console for the new detailed logs:

- "Starting VAPI workflow with:" - shows what's being sent
- "Failed to start Vapi workflow" - shows the full error
- "Response error:" - shows HTTP response details

If you see a specific error message, search for it in the VAPI documentation or contact VAPI support.
