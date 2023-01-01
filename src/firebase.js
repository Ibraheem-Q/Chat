import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCskeSrn3MQ_Tw-GDV7zW43RsgHNuzpEQI",
  authDomain: "chat-b5b43.firebaseapp.com",
  projectId: "chat-b5b43",
  storageBucket: "chat-b5b43.appspot.com",
  messagingSenderId: "955356723588",
  appId: "1:955356723588:web:0ac0aba867a54fea7205d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);