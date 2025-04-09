// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGyif1jHPzoWyVs2fagwxOobvjiz0-uTU",
  authDomain: "baha-proj.firebaseapp.com",
  projectId: "baha-proj",
  storageBucket: "baha-proj.firebasestorage.app",
  messagingSenderId: "510366867069",
  appId: "1:510366867069:web:cf3767e9e537a42290db14",
  measurementId: "G-MS4M9Q2S4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;