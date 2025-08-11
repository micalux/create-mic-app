import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let app: FirebaseApp | undefined;

export function getFirebaseApp() {
  if (!app) {
    const apps = getApps();
    if (apps.length) app = apps[0];
    else app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
  }
  return app!;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
