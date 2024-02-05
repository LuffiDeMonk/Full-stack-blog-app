// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6XR1_GTT4Ge8uE22_zIgoQBiQlnGw4bQ",
    authDomain: "blog-app-a6529.firebaseapp.com",
    projectId: "blog-app-a6529",
    storageBucket: "blog-app-a6529.appspot.com",
    messagingSenderId: "869341247476",
    appId: "1:869341247476:web:5a1dfb82093c8240c8eba1",
    measurementId: "G-HPP4V1DEPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);