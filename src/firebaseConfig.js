import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_O8q-ShKd-CRcSyDyBP-y_Hvq7tA1uSY",
  authDomain: "food-app-b7562.firebaseapp.com",
  projectId: "food-app-b7562",
  storageBucket: "food-app-b7562.appspot.com",
  messagingSenderId: "147901081315",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db,storage };
