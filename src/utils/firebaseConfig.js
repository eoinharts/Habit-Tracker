// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// import { setPersistence,browserLocalPersistence } from "firebase/auth"; // Only include if actually used

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, 
  authDomain: "momentum-83277.firebaseapp.com",
  projectId: "momentum-83277",
  storageBucket: "momentum-83277.appspot.com",
  messagingSenderId: "351082494789",
  appId: "1:351082494789:web:70f43d7d82845921941c2c",
  measurementId: "G-39518BE1NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// If setPersistence is used, uncomment and ensure it's called
// setPersistence(auth, browserLocalPersistence);

export { auth,db };