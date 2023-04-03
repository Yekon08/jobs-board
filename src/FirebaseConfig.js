import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8K6LvpdC_sE-eaFCCSVt17pDk0GF3MYI",
  authDomain: "jobs-board-82640.firebaseapp.com",
  projectId: "jobs-board-82640",
  storageBucket: "jobs-board-82640.appspot.com",
  messagingSenderId: "335022438741",
  appId: "1:335022438741:web:da414875a8fc55bab557dc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
