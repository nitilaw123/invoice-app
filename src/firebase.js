
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage} from 'firebase/storage'
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCpcPL71Q2T7HXXedDEoKgVEkl0mBOINjo",
  authDomain: "invoice-app-8ff25.firebaseapp.com",
  projectId: "invoice-app-8ff25",
  storageBucket: "invoice-app-8ff25.firebasestorage.app",
  messagingSenderId: "598094156096",
  appId: "1:598094156096:web:eceac8dca2b50912836aa5",
  measurementId: "G-LK899XW9GM"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
