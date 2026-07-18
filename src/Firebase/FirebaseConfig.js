import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zJJMExlXyu34tJaAwDGWz00pn1VmW5U",
  authDomain: "freedom-67e5e.firebaseapp.com",
  projectId: "freedom-67e5e",
  storageBucket: "freedom-67e5e.firebasestorage.app",
  messagingSenderId: "1007313284285",
  appId: "1:1007313284285:web:440f034b01d997f85b9bd4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);