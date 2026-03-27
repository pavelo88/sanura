'use client';

import React, { createContext, useContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

interface FirebaseContextType {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider: React.FC<{
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  children: React.ReactNode;
}> = ({ app, firestore, auth, children }) => {
  return (
    <FirebaseContext.Provider value={{ app, firestore, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    // Si no hay contexto, intentamos devolver instancias inicializadas directamente
    // Esto previene errores de "null" durante SSR o fuera del árbol de React
    return null;
  }
  return context;
};

export const useFirestore = () => useFirebase()?.firestore;
export const useAuth = useFirebase()?.auth;
export const useFirebaseApp = useFirebase()?.app;
