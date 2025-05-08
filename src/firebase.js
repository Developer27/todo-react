import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtenYlyqTlOcmbR8_LWUCuIT2Brm62P-U",

  authDomain: "todo-e86c8.firebaseapp.com",

  projectId: "todo-e86c8",

  storageBucket: "todo-e86c8.appspot.com",

  messagingSenderId: "976940516166",

  appId: "1:976940516166:web:b37ffaea3190555ae01b47",

  measurementId: "G-4FMDHRK60Z",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
