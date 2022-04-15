import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCjRzrZ3klLEhpFcjDqveeLB8_Md1O2TP8",
    authDomain: "emessage-5616e.firebaseapp.com",
    databaseURL: "https://emessage-5616e-default-rtdb.firebaseio.com",
    projectId: "emessage-5616e",
    storageBucket: "emessage-5616e.appspot.com",
    messagingSenderId: "1094240238242",
    appId: "1:1094240238242:web:10394539e6c472637975fb",
    measurementId: "G-HHHNP78DGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// auth
const auth = getAuth()
window.auth = auth;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.updateProfile = updateProfile;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.db = db;
window.ref = ref;
window.set = set;

