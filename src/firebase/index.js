// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQ7OWzGfc1n2XZ-T_5F4Gp5W6Ryw5Qq1Q",
  authDomain: "kurakani-4aae0.firebaseapp.com",
  projectId: "kurakani-4aae0",
  storageBucket: "kurakani-4aae0.appspot.com",
  messagingSenderId: "410661618677",
  appId: "1:410661618677:web:7d53dc03b44595067196bc",
  measurementId: "G-KDS489FWNH"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://kurakani-4aae0.appspot.com");
const analytics = getAnalytics(app);