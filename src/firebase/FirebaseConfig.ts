import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: "couple-web-7c451.firebaseapp.com",
    databaseURL: "https://couple-web-7c451-default-rtdb.firebaseio.com",
    projectId: "couple-web-7c451",
    storageBucket: "couple-web-7c451.appspot.com",
    messagingSenderId: "307501321726",
    appId: "1:307501321726:web:9e73030295064e387cc4af",
    measurementId: "G-4NXPE745ZY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(app);
