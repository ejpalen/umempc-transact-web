// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: `${process.env.FIREBASE_API_KEY}`,
  // authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  // projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  // storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  // messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  // appId: `${process.env.FIREBASE_APP_ID}`,
  // measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
  apiKey: "AIzaSyCcsxJX1ZKgGuXCBDA3DxHPBuvRHPkAkVA",
  authDomain: "umempc-transact-app.firebaseapp.com",
  projectId: "umempc-transact-app",
  storageBucket: "umempc-transact-app.appspot.com",
  messagingSenderId: "5051680414",
  appId: "1:5051680414:web:70212d1ed32b148c089d8f",
  measurementId: "G-WGWXJZMYEN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imageDb = getStorage(app);
export const db = getFirestore(app);
