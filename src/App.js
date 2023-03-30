import React from "react";
import ProductContextProvider from "./contexts/ProductContextProvider";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <div>
      <ProductContextProvider>
        <MainRoutes />
      </ProductContextProvider>
    </div>
  );
};

export default App;
