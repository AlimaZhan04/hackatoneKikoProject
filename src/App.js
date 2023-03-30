import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs";
import AddBlog from "./components/AddBlog/AddBlog";
import Contacts from "./components/Contacts/Contacts";
import Elected from "./components/Elected/Elected";
import Headers from "./components/Headers/Headers";
import "./App.css";
import Home from "./components/Home/Home";

const App = () => {
  const API = " http://localhost:8001/cosmetics";
  const [cosmetics, setCosmetics] = useState([]);
  // ! create
  function addCosmetics(newCosmetics) {
    axios.post(API, newCosmetics);
  }

  //! read(get request)

  async function getCosmetics() {
    const result = await axios.get(API);
    console.log(result);
    setCosmetics(result.data);
  }

  return (
    <div>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route
            path="/"
            element={<Home cosmetics={cosmetics} getCosmetics={getCosmetics} />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/elected" element={<Elected />} />
          <Route
            path="/add-block"
            element={<AddBlog addCosmetics={addCosmetics} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
