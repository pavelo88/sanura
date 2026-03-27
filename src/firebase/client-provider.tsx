
'use client';

import React, { useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebase, setFirebase] = useState<ReturnType<typeof initializeFirebase> | null>(null);

  useEffect(() => {
    setFirebase(initializeFirebase());
  }, []);

  if (!firebase) return null;

  return (
    <FirebaseProvider app={firebase.app} firestore={firebase.firestore} auth={firebase.auth}>
      {children}
    </FirebaseProvider>
  );
};
