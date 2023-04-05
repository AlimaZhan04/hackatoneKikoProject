import React from "react";
import React, { createContext, useContext, useReducer } from "react";
import { CART } from "../helpers/consts";
import {
  calcSubPrice,
  calcTotalPrice,
  getCountProductsInCart,
} from "../helpers/functions";

const favorites = () => {
  return <div>favorites</div>;
};

export default favorites;
