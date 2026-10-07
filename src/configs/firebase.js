import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Guard against missing REACT_APP_FIREBASE_* env vars (e.g. not set in the
// Cloudflare Pages dashboard at build time). Without this, initializeApp
// throws synchronously at import time and crashes the whole app.
let database = null;
try {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn(
      'Firebase Realtime Database is disabled: missing REACT_APP_FIREBASE_API_KEY / REACT_APP_FIREBASE_PROJECT_ID.'
    );
  } else {
    const app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  }
} catch (error) {
  console.error('Firebase Realtime Database init failed:', error);
  database = null;
}

export default database;
