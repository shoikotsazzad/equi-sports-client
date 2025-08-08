// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIEJd1izmRraHYPgsACaIp3U4qdtddmTw",
  authDomain: "sports-equipment-store-9bf94.firebaseapp.com",
  projectId: "sports-equipment-store-9bf94",
  storageBucket: "sports-equipment-store-9bf94.firebasestorage.app",
  messagingSenderId: "901861457379",
  appId: "1:901861457379:web:db88d3a58873dd6aa574d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);