import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/consts";

export const productContext = createContext();
export const useProducts = () => {
  return useContext(productContext);
};

const INIT_STATE = {
  cosmetics: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COSMETICS":
      return { ...state, cosmetics: action.payload };

    default:
      break;
  }
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //! read (get request)

  const getCosmetics = async () => {
    const { data } = await axios.get(`${API}`);
    dispatch({ type: "GET_COSMETICS", payload: data });
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

  const values = { getCosmetics, addCosmetics, deleteCosmetics };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
