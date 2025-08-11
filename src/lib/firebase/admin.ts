import { App, getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App | undefined;

export function getAdminApp() {
  if (!adminApp) {
    const apps = getApps();
    if (apps.length) adminApp = apps[0]!;
    else {
      const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
      if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !privateKey) {
        throw new Error('Missing Firebase admin env vars');
      }
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey,
        }),
      });
    }
  }
  return adminApp!;
}

export const adminAuth = () => getAuth(getAdminApp());
