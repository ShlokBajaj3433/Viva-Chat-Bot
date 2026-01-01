"use server";

import { cookies } from "next/headers";
import { initializeApp, getApps } from "firebase-admin/app";
import { cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminAuth = null;
let adminDb = null;

// Initialize Firebase Admin SDK
try {
  const apps = getApps();
  if (!apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    } as ServiceAccount;

    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  adminAuth = getAuth();
  adminDb = getFirestore();
} catch (error) {
  console.warn("Firebase Admin SDK not initialized. Using client-side auth only.", error);
}

// Set session cookie with user token
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  try {
    // Create session cookie from ID token
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    cookieStore.set("__session", sessionCookie, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Failed to create session cookie:", error);
  }
}

// Sign up user with Firebase Auth
export async function signUp(params: SignUpParams) {
  const { displayName, email, password } = params;

  try {
    if (!adminAuth || !adminDb) {
      throw new Error("Firebase not initialized");
    }

    // Check if user already exists
    try {
      const existingUser = await adminAuth.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          message: "Email already in use. Please sign in.",
        };
      }
    } catch (error: any) {
      // User doesn't exist, which is good for sign up
      if (error.code !== "auth/user-not-found") {
        throw error;
      }
    }

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
    });

    // Save user data to Firestore
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName,
      role: "STUDENT",
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
      user: {
        uid: userRecord.uid,
        email,
        displayName,
        role: "STUDENT",
      },
    };
  } catch (error: any) {
    console.error("Sign up error:", error);
    return {
      success: false,
      message: error.message || "Failed to create account",
    };
  }
}

// Sign in user with Firebase Auth (called from client)
export async function signIn(params: SignInParams) {
  const { idToken } = params;

  try {
    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Get user data from Firestore
    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      // Create user document if it doesn't exist
      await adminDb.collection("users").doc(decodedToken.uid).set({
        uid: decodedToken.uid,
        email: decodedToken.email || "",
        displayName: decodedToken.name || decodedToken.email || "User",
        role: "STUDENT",
        emailVerified: decodedToken.email_verified || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // Create session cookie
    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Signed in successfully",
      user: userDoc.exists ? userDoc.data() : { uid: decodedToken.uid, email: decodedToken.email },
    };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message: error.message || "Failed to sign in",
    };
  }
}

// Sign out user by clearing session cookie
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("__session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) return null;

  try {
    if (!adminAuth || !adminDb) {
      return null;
    }

    // Verify session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    // Get user data from Firestore
    const userDoc = await adminDb.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) {
      return null;
    }

    return {
      uid: userDoc.data()?.uid,
      id: userDoc.data()?.uid,
      displayName: userDoc.data()?.displayName,
      name: userDoc.data()?.displayName,
      email: userDoc.data()?.email,
      role: userDoc.data()?.role,
    } as User;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}


