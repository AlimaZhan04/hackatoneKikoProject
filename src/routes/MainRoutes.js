import React from "react";
import { Route, Routes } from "react-router-dom";
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

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { link: "/", element: <HomePage />, id: 1 },
    { link: "/products", element: <ProductPage />, id: 2 },
    { link: "/*", element: <NotFoundPage />, id: 3 },
    { link: "/contacts", element: <ContactUs />, id: 4 },
    { link: "/admin", element: <AdminPage />, id: 5 },
    { link: "/edit/:id", element: <EditProductPage />, id: 6 },
    { link: "/aboutus", element: <AboutUs />, id: 7 },
    { link: "/offers", element: <Offers />, id: 8 },
    { link: "/accessories", element: <Accessories />, id: 8 },
    { link: "/auth", element: <AuthPage />, id: 8 },
  ];
  // const PRIVATE_ROUTES = [];
  return (
    <>
      <Routes>
        {PUBLIC_ROUTES.map((item) => (
          <Route path={item.link} element={item.element} key={item.id} />
        ))}
      </Routes>
    </>
  );
};

export default MainRoutes;
