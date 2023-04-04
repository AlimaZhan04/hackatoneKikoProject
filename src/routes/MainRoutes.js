import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "../components/AboutUs/AboutUs";
import ContactUs from "../components/ContactUs/ContactUs";
import Offers from "../pages/Offers/Offers";
import AdminPage from "../pages/AdminPage/AdminPage";
import EditProductPage from "../pages/EditProductPage/EditProductPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductPage from "../pages/ProductsPage/ProductPage";
import Accessories from "../pages/Accessories/Accessories";
import AuthPage from "../pages/AuthPage/AuthPage";
import { ADMIN } from "../helpers/consts";
import { useAuth } from "../contexts/AuthContextProvider";

import Footer from "../components/Footer/Footer";
import BestSellers from "../components/BestSellers/BestSellers";
import Cart from "../components/Cart/Cart";

const MainRoutes = () => {
  const { user } = useAuth();
  const PUBLIC_ROUTES = [
    { link: "/", element: <HomePage />, id: 1 },
    { link: "/products", element: <ProductPage />, id: 2 },
    { link: "/*", element: <NotFoundPage />, id: 3 },
    { link: "/contacts", element: <ContactUs />, id: 4 },
    { link: "/aboutus", element: <AboutUs />, id: 7 },
    { link: "/offers", element: <Offers />, id: 8 },
    { link: "/accessories", element: <Accessories />, id: 9 },
    { link: "/auth", element: <AuthPage />, id: 10 },
    { link: "/footer", element: <Footer />, id: 11 },
    { link: "/best", element: <BestSellers />, id: 12 },
    { link: "/cart", element: <Cart />, id: 13 },
  ];
  const PRIVATE_ROUTES = [
    { link: "/edit/:id", element: <EditProductPage />, id: 6 },
    { link: "/admin", element: <AdminPage />, id: 5 },
  ];
  return (
    <>
      <Routes>
        {PUBLIC_ROUTES.map((item) => (
          <Route path={item.link} element={item.element} key={item.id} />
        ))}

        {user
          ? PRIVATE_ROUTES.map((item) => (
              <Route
                path={item.link}
                element={
                  user.email === ADMIN ? (
                    item.element
                  ) : (
                    <Navigate replace to="*" />
                  )
                }
                key={item.id}
              />
            ))
          : null}
      </Routes>
    </>
  );
};

export default MainRoutes;
