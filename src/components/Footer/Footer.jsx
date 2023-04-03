import { Box, TextField } from "@mui/material";
import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box className="footer_wrapper">
      <Box className="main_footer_box">
        <Box className="main_footer_icons">
          <img width={60} height={50} src="" alt="" />
          <p>Sign up now</p>
          <span>
            <strong>REGISTER FOR EXCLUSIVE ADVANTAGES</strong>
          </span>
        </Box>

        <Box className="main_footer_icons">
          <img src="" alt="" />
          <p>FREE shipping</p>
          <span>
            <strong>FOR ORDERS OVER $29</strong>
          </span>
        </Box>

        <Box className="main_footer_icons">
          <img src="" alt="" />
          <p>SECURE PAYMENTS</p>
          <span>
            <strong>PURCHASES ARE SECURE AND GUARANTEED</strong>
          </span>
        </Box>

        <Box className="main_footer_icons">
          <img src="" alt="" />
          <p> Easy returns</p>
          <span>
            <strong> UP TO 30 DAYS AFTER ORDER DELIVERY</strong>
          </span>
        </Box>
      </Box>

      <Box className="middle_box">
        <Box className="help_box">
          <Box className="string_box">
            <span>
              <strong>Help </strong>
            </span>
            <p>FAQs</p>
            <p>Track your order</p>
            <p>Terms & Conditions of sale</p>
            <p>Delivery:information and costs</p>
            <p>Payment terms</p>
            <p>Secure payments</p>
            <p>Privacy policy</p>
            <p>Accessibility Statement</p>

            <Box className="three_parg">
              <span>
                <strong>ABOUT US</strong>
              </span>
            </Box>

            <Box className="three_parg">
              <span>
                <strong>SITEMAP</strong>
              </span>
            </Box>

            <Box className="three_parg">
              <span>
                <strong>CHOOSE YOUR COUNTRY</strong>
              </span>
            </Box>
          </Box>

          <Box className="img_box">
            <img
              src="https://images.kikocosmetics.com/mediaObject/2020/info/Modifiche-img-sito/Modifiche-img-sito/HpFooterEdm/webp-resolutions/res-720x480/HpFooterEdm.webp"
              alt=""
            />

            <Box className="white_paper">
              <p>
                <strong>NEWSLETTER SIGN UP</strong>
              </p>
              <p>
                Register now with KIKO MILANO to receive all the news about the
                latest products and exclusive promotions! Enjoy $5 off on your
                first online order when you spend at least $20!
              </p>

              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
              />

              <button>Send</button>
            </Box>
          </Box>
        </Box>

        <Box className="mui_tiny_icons">
          <a href="https://www.facebook.com/KikoMilanoIT">
            <FacebookIcon
              sx={{ backgroundColor: " #3b5998", color: "white" }}
            />
          </a>
          <a href="https://www.instagram.com/kikomilano/">
            <InstagramIcon
              sx={{ backgroundColor: " #c03a68", color: "white" }}
            />
          </a>

          <a href="https://twitter.com/KikoMilanoIT">
            <TwitterIcon sx={{ backgroundColor: " #55acee", color: "white" }} />
          </a>

          <a href="https://www.youtube.com/user/KIKOCOSMETICS">
            <YouTubeIcon sx={{ backgroundColor: " #ed302f", color: "white" }} />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
