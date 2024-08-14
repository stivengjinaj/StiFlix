import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDtq9Kv93Ke7WDnMPTRArMbhXWUG7ZPd0",
    authDomain: "sti-flix.firebaseapp.com",
    projectId: "sti-flix",
    storageBucket: "sti-flix.appspot.com",
    messagingSenderId: "877128200016",
    appId: "1:877128200016:web:408b3f15f0ddeeb9738655",
    measurementId: "G-SS9W4J2Q0S",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
