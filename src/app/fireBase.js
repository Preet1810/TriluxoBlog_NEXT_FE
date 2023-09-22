// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const FIREBASE_apiKey=process.env.NEXT_PUBLIC_API_KEY;
const FIREBASE_authDomain=process.env.NEXT_PUBLIC_DOMAIN;
const FIREBASE_projectId=process.env.NEXT_PUBLIC_PROJECT_ID;
const FIREBASE_storageBucket=process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const FIREBASE_message=process.env.NEXT_PUBLIC_FIREBASE_MESSAGE;
const FIREBASE_appId=process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const firebaseConfig={
    apiKey: FIREBASE_apiKey,
    authDomain: FIREBASE_authDomain,
    projectId: FIREBASE_projectId,
    storageBucket: FIREBASE_storageBucket,
    messagingSenderId: FIREBASE_message,
    appId: FIREBASE_appId
};



// const firebaseConfig={
//     apiKey: "AIzaSyDmAauc2vits1seurvxtpsZ52nGTiNv5jc",
//     authDomain: "triluxoblog.firebaseapp.com",
//     projectId: "triluxoblog",
//     storageBucket: "triluxoblog.appspot.com",
//     messagingSenderId: "671498309891",
//     appId: "1:671498309891:web:8720dd9411f4210f1b1936"
// };
// Initialize Firebase
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
// export const provider=new GoogleAuthProvider()