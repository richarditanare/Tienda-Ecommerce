import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBSnKpqMbHpT4FpsaeuyFravNodiMUZDY4",
  authDomain: "prueba-auth-786a3.firebaseapp.com",
  projectId: "prueba-auth-786a3",
  storageBucket: "prueba-auth-786a3.appspot.com", 
  messagingSenderId: "773194914435",
  appId: "1:773194914435:web:0fa56e0c66155c8d3b99b6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

auth.useDeviceLanguage();

// Funciones auxiliares con Firebase Auth
export function crearUsuario(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginEmailPass(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logearG() {
  return signInWithPopup(auth, provider);
}

export { auth };
