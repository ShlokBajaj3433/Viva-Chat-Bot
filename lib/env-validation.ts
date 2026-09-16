export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'NEXT_PUBLIC_VAPI_WEB_TOKEN',
    'NEXT_PUBLIC_VAPI_WORKFLOW_ID',
    'GOOGLE_AI_API_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    const errorMsg = `Missing required environment variables: ${missing.join(', ')}`;
    console.error('[ENV VALIDATION]', errorMsg);
    throw new Error(errorMsg);
  }

  const optional = ['GEMINI_MODEL', 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID', 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'];
  const missingOptional = optional.filter(key => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn('[ENV VALIDATION] Optional vars not set:', missingOptional.join(', '));
  }

  console.log('[ENV VALIDATION] All required environment variables present');
}

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';