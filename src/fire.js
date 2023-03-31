import firebase from "firebase/compat/app";

import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG-ctin8cM2qYhEG7KoI5G0X6iR8mJtyE",
  authDomain: "kiko-project-a62eb.firebaseapp.com",
  projectId: "kiko-project-a62eb",
  storageBucket: "kiko-project-a62eb.appspot.com",
  messagingSenderId: "214141227844",
  appId: "1:214141227844:web:82ba659081d1f1d24ffd11",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
