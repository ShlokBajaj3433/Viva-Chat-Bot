import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE_BUILD) {
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
      console.error('[ENV VALIDATION] Missing required env vars:', missing.join(', '));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/interview/:path*',
  ],
};