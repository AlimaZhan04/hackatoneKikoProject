import firebase from "firebase/compat/app";

import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvrtJI27mzfgGPA3OWcRA_WXIdOljtTDs",
  authDomain: "alima-8789c.firebaseapp.com",
  projectId: "alima-8789c",
  storageBucket: "alima-8789c.appspot.com",
  messagingSenderId: "898947369490",
  appId: "1:898947369490:web:1e813fa835e7426444e6cb",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
