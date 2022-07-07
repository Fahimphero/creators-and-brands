// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9ECWIemTLAixrGVWLDaDC12r70iUIgg0",
    authDomain: "creator-and-brand.firebaseapp.com",
    projectId: "creator-and-brand",
    storageBucket: "creator-and-brand.appspot.com",
    messagingSenderId: "651078735739",
    appId: "1:651078735739:web:45f1b1bd152c1698b60fde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;