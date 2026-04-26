// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc8XHeOAKUtJtB5vcOaO1iyn8b_1CaX4k",
  authDomain: "travel-world-a4765.firebaseapp.com",
  projectId: "travel-world-a4765",
  storageBucket: "travel-world-a4765.firebasestorage.app",
  messagingSenderId: "762733362833",
  appId: "1:762733362833:web:6110c8f7b50cbe787e4930",
  measurementId: "G-PQZ7Y506BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;