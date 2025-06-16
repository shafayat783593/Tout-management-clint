// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

// const firebaseConfig = {
//     apiKey:import.meta.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
//   };


// const firebaseConfig = {
//     apiKey: "AIzaSyAE33GUmJYT_PxFjtOm1DDVTpzrGot8ClY",
//     authDomain: "tour-management-c1ca2.firebaseapp.com",
//     projectId: "tour-management-c1ca2",
//     storageBucket: "tour-management-c1ca2.firebasestorage.app",
//     messagingSenderId: "1044324834758",
//     appId: "1:1044324834758:web:e35264103ba7828ef566c7"
//   };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)