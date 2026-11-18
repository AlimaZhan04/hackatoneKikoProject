import axios from 'axios';
import React,{createContext,useContext,useState,useCallback,useEffect,useRef} from 'react';
import { useLocation,useNavigate,useSearchParams } from 'react-router-dom';
import { API } from '../helpers/consts';
import { recordAction } from '../project-work/trace.mjs';
axios.interceptors.request.use(config=>{if(config.url?.startsWith(API))recordAction(`${(config.method||'GET').toUpperCase()} ${config.url}${config.params?'?'+config.params.toString():''}`,config.data);return config;});
export const productContext=createContext();
export const useProducts=()=>useContext(productContext);
export default function ProductContextProvider({children}) {
 const [cosmetics,setCosmetics]=useState([]),[cosmeticsDetails,setDetails]=useState({}),[loading,setLoading]=useState(false),[error,setError]=useState('');
 const [searchParams,setSearchParams]=useSearchParams();const location=useLocation(),navigate=useNavigate(),sequence=useRef(0);
 const getCosmetics=useCallback(async({throwOnError=false}={})=>{
  const current=++sequence.current;setLoading(true);setError('');
  const params=new URLSearchParams(location.search);
  if(location.pathname==='/accessories')params.set('type','accessories');
  try{const {data}=await axios.get(API,{params});if(current===sequence.current)setCosmetics(data);return data;}
  catch(error){if(current===sequence.current)setError(error.response?.data?.message||'Unable to load products. Please try again.');if(throwOnError)throw error;}
  finally{if(current===sequence.current)setLoading(false);}
 },[location.search,location.pathname]);
 useEffect(()=>{if(['/','/best','/accessories','/products','/favorites'].includes(location.pathname))getCosmetics();return()=>{sequence.current++;};},[getCosmetics,location.pathname]);
 const fetchByParams=(query,value)=>{const params=new URLSearchParams(location.search);if(!value||value==='all')params.delete(query);else params.set(query,value);navigate({pathname:location.pathname,search:params.toString()},{replace:query==='q'});};
 const addCosmetics=async product=>(await axios.post(API,product)).data;
 const saveEditedCosmetics=async product=>(await axios.put(`${API}/${product.id}`,product)).data;
 const getCosmeticsDetails=async id=>{const {data}=await axios.get(`${API}/${id}`);setDetails(data);return data;};
 const deleteCosmetics=async id=>{try{await axios.delete(`${API}/${id}`);await getCosmetics({throwOnError:true});}catch(error){alert(error.response?.data?.message||'Unable to delete product.');}};
 return <productContext.Provider value={{cosmetics,cosmeticsDetails,loading,error,getCosmetics,addCosmetics,saveEditedCosmetics,getCosmeticsDetails,deleteCosmetics,fetchByParams,search:searchParams.get('q')||'',setSearch:value=>fetchByParams('q',value),searchParams,setSearchParams,getRandomProducts:async()=>{return(await axios.get(API,{params:{_limit:3}})).data;}}}>{children}</productContext.Provider>;
}
