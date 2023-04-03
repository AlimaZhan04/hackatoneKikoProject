import axios from "axios";
import { async } from "q";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../helpers/consts";

export const productContext = createContext();
export const useProducts = () => {
  return useContext(productContext);
};

const INIT_STATE = {
  cosmetics: [],
  cosmeticsDetails: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COSMETICS":
      return { ...state, cosmetics: action.payload };

    case "GET_PRODUCT_DETAILS":
      return { ...state, cosmeticsDetails: action.payload };

    default:
      return state;
  }
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const navigate = useNavigate();
  //! read (get request)

  const getCosmetics = async () => {
    const { data } = await axios.get(`${API}/${window.location.search}`);
    dispatch({ type: "GET_COSMETICS", payload: data });
  };

  const getRandomProducts = async () => {
    const { data } = await axios.get(API + "?_limit=3");
  };

  // ! create (post request)
  const addCosmetics = async (newCosmetics) => {
    await axios.post(API, newCosmetics);
    getCosmetics();
  };

  // !delete

  const deleteCosmetics = async (id) => {
    await axios.delete(`${API}/${id}`);
    getCosmetics();
  };

  //! get product details

  const getCosmeticsDetails = async (id) => {
    const { data } = await axios.get(`${API}/${id}`);
    dispatch({ type: "GET_PRODUCT_DETAILS", payload: data });
  };

  const saveEditedCosmetics = async (editedCosmetics) => {
    await axios.patch(`${API}/${editedCosmetics.id}`, editedCosmetics);
  };

  const fetchByParams = async (query, value) => {
    const search = new URLSearchParams(window.location.search);

    if (value == "all") {
      search.delete(query);
    } else {
      search.set(query, value);
    }

    const url = `${window.location.pathname}?${search.toString()}`;

    navigate(url);
  };
  const values = {
    getCosmetics,
    addCosmetics,
    deleteCosmetics,
    cosmetics: state.cosmetics,
    getCosmeticsDetails,
    cosmeticsDetails: state.cosmeticsDetails,
    saveEditedCosmetics,
    fetchByParams,
    getRandomProducts,
    search,
    setSearch,
    searchParams,
    setSearchParams,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
