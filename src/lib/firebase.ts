import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: config.projectId,
  appId: config.appId,
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
};

let app;
let db: ReturnType<typeof getFirestore>;

try {
  app = initializeApp(firebaseConfig);
  db = initializeFirestore(app, {
    ignoreUndefinedProperties: true
  }, config.firestoreDatabaseId);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, db };
