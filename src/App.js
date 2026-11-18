import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/Product/ProductList/ProductList";
import AuthContextProvider from "./contexts/AuthContextProvider";
import CartContextProvider from "./contexts/CartContextProvider";
import ProductContextProvider from "./contexts/ProductContextProvider";
import MainRoutes from "./routes/MainRoutes";

import Footer from "./components/Footer/Footer";
import FavoritesContextProvider from './contexts/FavoritesContextProvider';

import "react-credit-cards/dist/es/styles-compiled.css";

const App = () => {
  return (
    <CartContextProvider>
      <FavoritesContextProvider>
      <AuthContextProvider>
        <ProductContextProvider>
          <Navbar />
          <MainRoutes />
          <Footer />
        </ProductContextProvider>
      </AuthContextProvider>
      </FavoritesContextProvider>
    </CartContextProvider>
  );
};

export default App;
