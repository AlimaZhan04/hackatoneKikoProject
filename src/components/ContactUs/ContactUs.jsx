import { Box, display } from "@mui/system";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Button } from "react-bootstrap";
import "./contact.css";
import Map from "../Map/Map";
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate=useNavigate();
  const directions=address=>window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address),'_blank','noopener,noreferrer');
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

          <div className="icons-with-parg">
            <WatchLaterIcon />
            <p>
              <strong>FRI:</strong>09:30-19:30
            </p>
          </div>
          <div className="btn-div">
            <button className="black-btn" onClick={()=>navigate('/offers')}>Info and promotions</button>
            <button className="pink-btn" onClick={()=>directions('KIKO Milano Via Cavour 6 Parma Italy')}>Take me here</button>
          </div>

          <div>
            <img
              width="100%"
              height={350}
              src="/images/store.webp"
              alt=""
            />
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
            <button className="black-btn" onClick={()=>navigate('/offers')}>Info and promotions</button>
            <button className="pink-btn" onClick={()=>directions('KIKO Milano Via S. Leonardo 69 Parma Italy')}>Take me here</button>
          </div>
          <div>
            <img
              className="end_pict"
              width={450}
              height={350}
              src="/images/store.webp"
              alt=""
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
