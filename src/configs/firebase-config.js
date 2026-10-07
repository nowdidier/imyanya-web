import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';


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
let db = null;
try {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn(
      'Firestore is disabled: missing REACT_APP_FIREBASE_API_KEY / REACT_APP_FIREBASE_PROJECT_ID.'
    );
  } else {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.error('Firestore init failed:', error);
  db = null;
}

export { serverTimestamp };
export default db;
