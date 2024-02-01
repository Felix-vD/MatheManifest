// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxL-67juH5Khc2g5vzPII2-kP8IzMgsxM",
  authDomain: "mathemanifest.firebaseapp.com",
  projectId: "mathemanifest",
  storageBucket: "mathemanifest.appspot.com",
  messagingSenderId: "713546605210",
  appId: "1:713546605210:web:ef0039fc080b5794bc7523",
  measurementId: "G-ED7W4WZGHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore

export { db, analytics }; // Export Firestore instance
