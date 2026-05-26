import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCf1sHJZj7yD7nrVEi-uoRlhkD9B62XPS0",
  authDomain: "graduation-invitation-761ee.firebaseapp.com",
  projectId: "graduation-invitation-761ee",
  storageBucket: "graduation-invitation-761ee.firebasestorage.app",
  messagingSenderId: "292489835772",
  appId: "1:292489835772:web:151c5b400dee334716d379",
  measurementId: "G-49XY2TCZHN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);