import React, { createContext, useContext, useEffect, useState } from 'react';
import { request } from '../studio/api.mjs';
export const authContext=createContext();
export const useAuth=()=>useContext(authContext);
export default function AuthContextProvider({children}) {
 const [user,setUser]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState('');
 const [errorEmail,setErrorEmail]=useState(''),[errorPassword,setErrorPassword]=useState(''),[hasAccount,setHasAccount]=useState(false);
 useEffect(()=>{request('/auth/me').then(data=>setUser(data.user||'')).catch(()=>{});},[]);
 const authenticate=async action=>{setErrorEmail('');setErrorPassword('');try{const data=await request('/auth/'+action,{method:'POST',body:{email,password}});setUser(data.user);setPassword('');return true;}catch(error){setErrorPassword(error.message);return false;}};
 const handleLogIn=()=>authenticate('login');
 const handleSignUp=()=>authenticate('register');
 const handleLogOut=async()=>{try{await request('/auth/logout',{method:'POST'});setUser('');}catch(error){setErrorEmail(error.message);}};
 return <authContext.Provider value={{user,email,password,errorEmail,errorPassword,hasAccount,setEmail,setPassword,setHasAccount,handleLogIn,handleSignUp,handleLogOut}}>{children}</authContext.Provider>;
}
