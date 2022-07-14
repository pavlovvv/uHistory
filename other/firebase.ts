import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_CAT_TALK_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_CAT_TALK_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_CAT_TALK_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_CAT_TALK_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_CAT_TALK_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_CAT_TALK_FIREBASE_CONFIG_APP_ID
};

initializeApp(firebaseConfig)