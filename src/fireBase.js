// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig={
    apiKey: "AIzaSyDmAauc2vits1seurvxtpsZ52nGTiNv5jc",
    authDomain: "triluxoblog.firebaseapp.com",
    projectId: "triluxoblog",
    storageBucket: "triluxoblog.appspot.com",
    messagingSenderId: "671498309891",
    appId: "1:671498309891:web:8720dd9411f4210f1b1936"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
// export const provider=new GoogleAuthProvider()