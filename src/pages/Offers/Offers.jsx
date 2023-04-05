import { Box } from "@mui/system";
import React from "react";
import "./Offers.css";
import { useNavigate } from "react-router";

const Offers = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box className="offers_first_photo">
        <img
          src="https://images.kikocosmetics.com/mediaObject/2021/promo/outlet/Promo_Outlet_LandingCategory/webp-resolutions/res-1920x360/Promo_Outlet_LandingCategory.webp"
          alt=""
        />
      </Box>

      <Box className="offers_text">
        <p>DISCOVER ALL OFFERS</p>
      </Box>
      <Box className="offers_second_photo ">
        <img
          src="https://images.kikocosmetics.com/mediaObject/2023/promo/promo2-1ES/Promo_2-1ES_HPDesktop/webp-resolutions/res-1920x600/Promo_2-1ES_HPDesktop.webp"
          alt="picture"
        />
      </Box>

      <Box className="offers_text2">
        <h2 className="offers_text_h2">Buy 2 Get 1 for FREE</h2>
        <button onClick={() => navigate("/best")} className="offers_text2_btn">
          SHOP NOW
        </button>
      </Box>

      <Box className="offers_parg_box">
        <p>
          Buy your{" "}
          <strong>makeup and favourite products at special prices*</strong>,
          visit the promo section to find the news and updates you’re looking
          for. Don’t let a single offer pass you by, enhance your beauty with
          KIKO Milano. Find in this page a list of all the promotions that are
          currently active, with an indication of their validity (online and/or
          in stores) and when they expire. *until stock lasts
        </p>
      </Box>
    </Box>
  );
};

export default Offers;
