import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {  
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut
} from "firebase/auth";

import auth from "../../../firebase.config";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch admin status from backend
          const res = await fetch(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/users/admin/${firebaseUser.email}`);
          const data = await res.json();

          // data.admin is true or false, set role accordingly
          const role = data.admin ? 'admin' : 'user';

          // Merge Firebase user info + role
          setUser({ ...firebaseUser, role });
        } catch (error) {
          console.error('Failed to fetch user role:', error);
          // fallback to user role 'user'
          setUser({ ...firebaseUser, role: 'user' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    googleSign,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
