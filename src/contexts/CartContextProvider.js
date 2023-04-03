import React, { createContext, useContext, useReducer } from "react";
import { CART } from "../helpers/consts";
import {
  calcSubPrice,
  calcTotalPrice,
  getCountProductsInCart,
} from "../helpers/functions";

export const cartContext = createContext();
export const useCart = () => useContext(cartContext);

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: getCountProductsInCart(),
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART:
      return { ...state, cart: action.payload };

    case CART.GET_CART_LENGTH:
      return { ...state, cartLength: action.payload };

    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ cosmetics: [], totalPrice: 0 })
      );
      cart = { cosmetics: [], totalPrice: 0 };
    }
    console.log(cart);
    dispatch({ type: CART.GET_CART, payload: cart });
  };

  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = { cosmetics: [], totalPrice: 0 };
    }

    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };

    let productToFind = cart.cosmetics.filter(
      (elem) => elem.item.id === product.id
    );

    if (productToFind.length === 0) {
      cart.cosmetics.push(newProduct);
    } else {
      cart.cosmetics = cart.cosmetics.filter(
        (elem) => elem.item.id !== product.id
      );
    }

    cart.totalPrice = calcTotalPrice(cart.cosmetics);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  function checkProductInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let newCart = cart.cosmetics.filter((elem) => elem.item.id === id);
      return newCart.length > 0 ? true : false;
    }
  }

  const changeProductCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.cosmetics = cart.cosmetics.map((product) => {
      if (product.item.id === id) {
        product.count = count;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });

    cart.totalPrice = calcTotalPrice(cart.cosmetics);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: CART.GET_CART, payload: cart });
  };

  function deleteCartProduct(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.cosmetics = cart.cosmetics.filter((elem) => elem.item.id !== id);
    cart.totalPrice = calcTotalPrice(cart.cosmetics);

    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  const values = {
    getCart,
    cart: state.cart,
    addProductToCart,
    checkProductInCart,
    changeProductCount,
    deleteCartProduct,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
