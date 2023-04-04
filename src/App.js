import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/Product/ProductList/ProductList";
import AuthContextProvider from "./contexts/AuthContextProvider";
import CartContextProvider from "./contexts/CartContextProvider";
import ProductContextProvider from "./contexts/ProductContextProvider";
import MainRoutes from "./routes/MainRoutes";
import "react-credit-cards/es/styles-compiled.css";
import Payment from "./components/Product/Payment/Payment";

const App = () => {
  return (
    <CartContextProvider>
      <AuthContextProvider>
        <ProductContextProvider>
          <Navbar />
          <MainRoutes />
        </ProductContextProvider>
      </AuthContextProvider>
    </CartContextProvider>
  );
};

export default App;
