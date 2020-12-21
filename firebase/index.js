import * as firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAAJcxKjP0D3v7cOwTKhZr_o9fl1PIotJk",
  authDomain: "zihatim.firebaseapp.com",
  databaseURL: "https://zihatim-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zihatim",
  storageBucket: "zihatim.appspot.com",
  messagingSenderId: "302815205710",
  appId: "1:302815205710:web:ee4b946cb97cdef721a61f",
  measurementId: "G-M8B1QJ9DN6",
};
firebase.initializeApp(firebaseConfig);

db = firebase.firestore();

export default {
  firebase,
  db,
};
