import { Box } from "@mui/system";
import React from "react";
import "./Offers.css";

const Offers = () => {
  return (
    <Box>
      <Box className="offers_first_photo">
        <img
          src="https://images.kikocosmetics.com/mediaObject/2021/promo/outlet/Promo_Outlet_LandingCategory/webp-resolutions/res-1920x360/Promo_Outlet_LandingCategory.webp"
          alt=""
        />
      </Box>

      <Box>
        <p>DISCOVER ALL OFFERS</p>
      </Box>
      {/* <Box className="  ">
        <img
          src="https://images.kikocosmetics.com/mediaObject/2023/promo/promo2-1ES/Promo_2-1ES_HPDesktop/webp-resolutions/res-1920x600/Promo_2-1ES_HPDesktop.webp"
          alt=""
        />
      </Box> */}
    </Box>
  );
};

export default Offers;
