'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore as getFirestoreSDK, Firestore } from 'firebase/firestore';
import { getAuth as getAuthSDK, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

export function initializeFirebase() {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  firestore = getFirestoreSDK(app);
  auth = getAuthSDK(app);
  return { app, firestore, auth };
}

export const getFirebaseApp = () => {
  if (!app) initializeFirebase();
  return app;
};

export const getFirestoreInstance = () => {
  if (!firestore) initializeFirebase();
  return firestore;
};

export const getAuthInstance = () => {
  if (!auth) initializeFirebase();
  return auth;
};

// Exportamos hooks y proveedores desde sus archivos específicos
export { FirebaseProvider, useFirestore, useAuth, useFirebaseApp, useFirebase } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';

// Alias para mantener compatibilidad
export const getFirestore = getFirestoreInstance;
export const getAuth = getAuthInstance;
