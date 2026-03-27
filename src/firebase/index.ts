
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore as getFirestoreSDK, Firestore } from 'firebase/firestore';
import { getAuth as getAuthSDK, Auth } from 'firebase/auth';
import { getStorage as getStorageSDK, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

export function initializeFirebase() {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  firestore = getFirestoreSDK(app);
  auth = getAuthSDK(app);
  storage = getStorageSDK(app);
  return { app, firestore, auth, storage };
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

export const getStorageInstance = () => {
  if (!storage) initializeFirebase();
  return storage;
};

export { FirebaseProvider, useFirestore, useAuth, useFirebaseApp, useFirebase, useStorage } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';

export const getFirestore = getFirestoreInstance;
export const getAuth = getAuthInstance;
export const getStorage = getStorageInstance;
