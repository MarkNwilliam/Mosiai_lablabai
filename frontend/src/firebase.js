// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxIgtBaSPNcSTBor6oSDH-0xem-zPr9zE",
  authDomain: "business-with-ai.firebaseapp.com",
  projectId: "business-with-ai",
  storageBucket: "business-with-ai.appspot.com",
  messagingSenderId: "744505754756",
  appId: "1:744505754756:web:48f257de9045263dccaed1",
  measurementId: "G-6D0C8GGG26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

