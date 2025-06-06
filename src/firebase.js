// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyCdLQh_OtkY0u5WdJi2oNM38DxMc46HOjY",
  authDomain: "qiwo-farms.firebaseapp.com",
  projectId: "qiwo-farms",
  storageBucket: "qiwo-farms.firebasestorage.app",
  messagingSenderId: "767602204010",
  appId: "1:767602204010:web:b97a061a9e28f14a269913"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export everything you need
export { auth, db, sendEmailVerification };
