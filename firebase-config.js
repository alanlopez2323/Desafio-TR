import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkGahrBRQsTGhvLb9dWSCD_-w0NXxcOf0",
  authDomain: "desafio-tr.firebaseapp.com",
  projectId: "desafio-tr",
  storageBucket: "desafio-tr.appspot.com",
  messagingSenderId: "1098871435392",
  appId: "1:1098871435392:web:d6dc854b0a15e4c43fb665",
  measurementId: "G-03T0WSG546"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
