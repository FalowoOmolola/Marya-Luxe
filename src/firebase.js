import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// 1. Add this import for Auth
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAB-1pYUwMyidQUl-ewQ5exBb6x79d8ADA",
  authDomain: "marya-luxe.firebaseapp.com",
  projectId: "marya-luxe",
  storageBucket: "marya-luxe.firebasestorage.app",
  messagingSenderId: "327469195627",
  appId: "1:327469195627:web:9e19fa16d75d4165a36c2e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// 2. Add this export for Auth
export const auth = getAuth(app);