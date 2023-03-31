import { Box, display } from "@mui/system";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Button } from "react-bootstrap";
import "./contact.css";
import Map from "../Map/Map";

const ContactUs = () => {
  return (
    <Box className="wrapper">
      <Box className="left-side">
        <Map />
      </Box>
      <Box className="wrapper-right-side">
        <Box className="right-side">
          <h2>Kiko Milano - PARMA - Via Cavour 6</h2>
          <span>Via Cavour 6</span>
          <span>43100, PARMA, it</span>
          <div className="icons-with-parg">
            <LocalPhoneIcon />
            <p>+39 0521 285315</p>
          </div>

          <div className="">
            <WatchLaterIcon />
            <p>
              <strong>FRI:</strong>09:30-19:30
            </p>
            <div className="btn-div">
              <button className="black-btn">Info and promotions</button>
              <button className="pink-btn">Take me here</button>
            </div>

            <div>
              <img
                width={450}
                height={350}
                src="https://kiko-stores.kikocosmetics.com/upload/store/big/add/kiko882/0.jpg"
                alt=""
              />
            </div>
          </div>
        </Box>

        <Box className="right-side">
          <h2>Kiko Milano - PARMA - Via S. Leonardo 69/A</h2>
          <span>Via S. Leonardo 69/A</span>
          <span>43122, PARMA, it</span>
          <div className="icons-with-parg">
            <LocalPhoneIcon />
            <p>+39 0521 285315</p>
          </div>

          <div className="icons-with-parg">
            <WatchLaterIcon />
            <p>
              <strong>FRI:</strong>09:30-19:30
            </p>
          </div>
          <div className="btn-div">
            <button className="black-btn">Info and promotions</button>
            <button className="pink-btn">Take me here</button>
          </div>

          <div>
            <img
              width={450}
              height={350}
              src="https://kiko-stores.kikocosmetics.com/upload/store/big/add/kiko732/0.jpg"
              alt=""
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
