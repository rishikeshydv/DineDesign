// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_GCA__2h-1NSvESKz2AryBk34BcE4eNM",
  authDomain: "dinedesign-393ff.firebaseapp.com",
  projectId: "dinedesign-393ff",
  storageBucket: "dinedesign-393ff.appspot.com",
  messagingSenderId: "611270713020",
  appId: "1:611270713020:web:6acdd8a79ce3d04d7d7ab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
