// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_STORAGE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_STORAGE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_STORAGE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_STORAGE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_STORAGE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_STORAGE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get the database of the firebase app that was initialised
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
