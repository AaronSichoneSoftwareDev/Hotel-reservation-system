// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOofO2zf4iYMmJ6W5jLbW9TilohDyvS8Y",
  authDomain: "aaronsichone-36d8b.firebaseapp.com",
  projectId: "aaronsichone-36d8b",
  storageBucket: "aaronsichone-36d8b.firebasestorage.app",
  messagingSenderId: "732745703350",
  appId: "1:732745703350:web:5ade4c69fddd139a026b17",
  measurementId: "G-9NYWHBTHGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);