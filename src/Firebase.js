// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ75jhS6-1ahryIq29LgcEEZiS43_yVac",
  authDomain: "rakhisender-9c6eb.firebaseapp.com",
  projectId: "rakhisender-9c6eb",
  storageBucket: "rakhisender-9c6eb.appspot.com",
  messagingSenderId: "137740511880",
  appId: "1:137740511880:web:a4cf6cc0e431cc7ed04d3d",
  measurementId: "G-Y9NQ0L8RN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };
