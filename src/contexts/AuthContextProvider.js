import React, { createContext, useContext, useEffect, useState } from "react";
import fire from "../fire.js";
export const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [hasAccount, setHasAccount] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setErrorEmail("");
    setErrorPassword("");
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setErrorEmail(err.message);
            break;

          case "auth/weak-password":
            setErrorPassword(err.message);
            break;
        }
      });
  };

  const handleLogIn = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/user-disabled":
          case "auth/invalid-email":
          case "auth/user-not-found":
            setErrorEmail(err.message);
            break;

          case "auth/wrong-password":
            setErrorPassword(err.message);
            break;
        }
      });
  };
  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const values = {
    email,
    password,
    errorEmail,
    errorPassword,
    hasAccount,
    user,

    setEmail,
    setPassword,
    setHasAccount,

    handleLogIn,
    handleLogOut,
    handleSignUp,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
