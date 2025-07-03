// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4MaIzZY9uxUBJisxrRnmiqjvaG4dguAk",
  authDomain: "borno-9e597.firebaseapp.com",
  projectId: "borno-9e597",
  storageBucket: "borno-9e597.firebasestorage.app",
  messagingSenderId: "593528894402",
  appId: "1:593528894402:web:d1ccd95dcf93fdc0405c5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;