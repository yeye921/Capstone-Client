import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu--kL_G_SZOCYEfHy6RRfwGXB1myiwt0",
  authDomain: "capstone-2de06.firebaseapp.com",
  projectId: "capstone-2de06",
  storageBucket: "capstone-2de06.appspot.com",
  messagingSenderId: "594026069250",
  appId: "1:594026069250:web:c06d3484b524593ba6d61b",
  measurementId: "G-M9BX4T8CTZ",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
