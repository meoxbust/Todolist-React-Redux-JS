import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoLaEimo-p0tJ9LUsHVgNd-u4MYzPghxg",
    authDomain: "todolist-react-redux-33bb4.firebaseapp.com",
    projectId: "todolist-react-redux-33bb4",
    storageBucket: "todolist-react-redux-33bb4.appspot.com",
    messagingSenderId: "1091686763887",
    appId: "1:1091686763887:web:eb312a29a6f4206f0a2c9a",
    measurementId: "G-64K888YFJM",
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
