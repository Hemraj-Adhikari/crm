import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore
} from "firebase/firestore";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator, type Functions } from "firebase/functions";

/**
 * Single Firebase app instance for the whole application. Guards against
 * re-initialization during Next.js Fast Refresh / SSR module re-evaluation.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore with multi-tab offline persistence enabled — critical for the
// Internal Chat module and for counselors working across multiple tabs.
export const db: Firestore = getApps().length
  ? getFirestore(firebaseApp)
  : initializeFirestore(firebaseApp, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });

export const auth: Auth = getAuth(firebaseApp);
export const storage: FirebaseStorage = getStorage(firebaseApp);
export const functions: Functions = getFunctions(firebaseApp);

let emulatorsConnected = false;

/** Call once on app bootstrap when NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true. */
export function connectEmulatorsIfEnabled(): void {
  if (emulatorsConnected) return;
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS !== "true") return;
  if (typeof window === "undefined") return;

  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectStorageEmulator(storage, "localhost", 9199);
  connectFunctionsEmulator(functions, "localhost", 5001);
  emulatorsConnected = true;
}
