import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../contexts/ProductContextProvider";
import "./accessories.css";
import "./adaptivka-Acc.css";

const Accessories = () => {
  const { getCosmetics, cosmetics } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    getCosmetics();
  }, [searchParams]);
  useEffect(() => {
    getCosmetics();
  }, []);

  //! pagination
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const itemsPerPage = 4;
  const count = Math.ceil(cosmetics.length / itemsPerPage);

  const currentData = () => {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return cosmetics.slice(begin, end);
  };

  //! pagination

  return (
    <div>
      <div className="color">
        <img
          className="Acc_img"
          src="https://www.chinapowdercoating.com/ru/wp-content/gallery/d0bad0bed0b6d0b0d0bdd18bd0b9-d18dd184d184d0b5d0bad182/cache/brown-leather-effect-powder-coating.jpg-nggid03112-ngg0dyn-330x200x100-00f0w010c011r110f110r010t010.jpg"
          alt="picture"
        />
        <h1 className="acc_h">Accessories</h1>
        <p className="acc_text2">
          Make the best use of your cosmetics with KIKO’s face, eye and hand
          accessories. Browse our brush sets, make-up pouches, manicure sets and
          travel must-haves.
        </p>
        <div className="acc_buttons1">
          <button className="acc_button">Face Accessories</button>
          <button className="acc_button">Eye Accessories</button>
          <button className="acc_button">Hand Care Accessories</button>
          <button className="acc_button">Brushes</button>
          <button className="acc_button">Empty Travel Containers</button>
          <button className="acc_button">MakeUp Cases</button>
        </div>
      </div>
      <h2 className="acc_h2">Make up brushes</h2>
      <p className="acc_text">DO YOU DREAM OF A FLAWLESS FINISH?</p>

      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "0px" }}>
        {currentData().map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </Box>
      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={count}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <img
        className="acc_picture3"
        src="https://images.kikocosmetics.com/mediaObject/2021/prod/NewCategoryImages_Dec2021/CategoryAccessories_01_brushes/webp-resolutions/res-600x600/CategoryAccessories_01_brushes.webp"
        alt="photo33"
      />

      <h2 className="acc_h2">Make up bags</h2>

      <p className="acc_text1">
        ARE YOU LOOKING FOR A SOLUTION TO KEEP YOUR COSMETICS?
      </p>

      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "0px" }}>
        {currentData().map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </Box>
      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={count}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <img
        className="acc_picture4"
        src="https://images.kikocosmetics.com/mediaObject/2021/prod/NewCategoryImages_Dec2021/CategoryAccessories_02_pochette/webp-resolutions/res-600x600/CategoryAccessories_02_pochette.webp"
        alt="photo33"
      />
    </div>
  );
};

export default Accessories;
