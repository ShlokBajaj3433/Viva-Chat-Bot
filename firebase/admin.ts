import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    // Debug: Check if environment variables are loaded
    console.log("Firebase Admin Init - projectId exists:", !!projectId);
    console.log("Firebase Admin Init - clientEmail exists:", !!clientEmail);
    console.log("Firebase Admin Init - privateKey exists:", !!privateKey);

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        `Missing Firebase Admin credentials. projectId: ${!!projectId}, clientEmail: ${!!clientEmail}, privateKey: ${!!privateKey}`
      );
    }

    const serviceAccount: ServiceAccount = {
      projectId,
      clientEmail,
      privateKey,
    };

    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
