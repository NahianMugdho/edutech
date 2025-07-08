import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";


import  auth  from "../../../firebase.config";

const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {

const [user,setUser]= useState(null);
const [loading,setLoading]= useState(true);
const createUser = (email,password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
}
const loginUser = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}
const logOut=()=>{
    setLoading(true);
    return signOut(auth)
}
const googleSign=()=>{
    setLoading(true);
    return signInWithPopup(auth, provider)

}
useEffect(()=>{

  const unsubscribe =  onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser);
        console.log('state captured');
        setLoading(false);

    })
    return () =>{
        unsubscribe();
    }

},[])

const authInfo ={
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    googleSign

}




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;