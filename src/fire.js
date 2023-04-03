import firebase from "firebase/compat/app";

import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6zXEZKo1UCY1sESLX7yKh7TYZW4B1CuE",
  authDomain: "saltanats-11c47.firebaseapp.com",
  projectId: "saltanats-11c47",
  storageBucket: "saltanats-11c47.appspot.com",
  messagingSenderId: "698406491798",
  appId: "1:698406491798:web:0efa3541d50de1bf5754b7",
  measurementId: "G-LLWBPF2CHN",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
