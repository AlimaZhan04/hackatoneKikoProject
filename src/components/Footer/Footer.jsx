import { Box, TextField } from "@mui/material";
import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import kiko from "../../helpers/kiko_first.png";
import kiko2 from "../../helpers/Новая папка/Снимок экрана 2023-04-03 135256.png";
import kiko3 from "../../helpers/Новая папка/Снимок экрана 2023-04-03 162801.png";
import kiko4 from "../../helpers/Новая папка/Снимок экрана 2023-04-03 163124.png";
import FooterEnd from "../FooterEnd/FooterEnd";
import Button from "@mui/material/Button";
const Footer = () => {
  return (
    <Box className="footer_wrapper">
      <Box className="main_footer_box">
        <Box className="main_footer_icons">
          <img width={50} height={40} src={kiko} alt="" />

          <p>Sign up now</p>
          <span>
            <strong>REGISTER FOR EXCLUSIVE ADVANTAGES</strong>
          </span>
        </Box>

        <Box className="main_footer_icons">
          <img width={50} height={40} src={kiko2} alt="" />
          <p>FREE shipping</p>
          <span>
            <strong>FOR ORDERS OVER $29</strong>
          </span>
        </Box>

        <Box className="main_footer_icons">
          <img width={50} height={40} src={kiko3} alt="" />
          <p>SECURE PAYMENTS</p>
          <span>
            <strong>PURCHASES ARE SECURE AND GUARANTEED</strong>
          </span>
        </Box>

        <Box className="main_footer_icons">
          <img width={50} height={40} src={kiko4} alt="" />
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
                label="Email*"
                variant="standard"
              />
              <Box>
                <Button
                  className="send_btn"
                  sx={{
                    width: "200px",
                    border: "solid 2px black",
                    height: "30px",
                    borderRadius: "2rem",
                    marginTop: "22%",
                    color: "white",
                    backgroundColor: "black",
                    fontSize: "10px",
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="mui_tiny_icons">
          <Box className="footer_icon_box">
            <a href="https://www.facebook.com/KikoMilanoIT">
              <FacebookIcon
                className="footer_icon"
                sx={{
                  backgroundColor: " #3b5998",
                  color: "white",
                  // width: "150px",
                  // height: "150px",
                }}
              />
            </a>
          </Box>

          <Box className="footer_icon_box">
            <a href="https://www.instagram.com/kikomilano/">
              <InstagramIcon
                className="footer_icon"
                sx={{ backgroundColor: " #c03a68", color: "white" }}
              />
            </a>
          </Box>

          <Box className="footer_icon_box">
            <a href="https://twitter.com/KikoMilanoIT">
              <TwitterIcon
                className="footer_icon"
                sx={{ backgroundColor: " #55acee", color: "white" }}
              />
            </a>
          </Box>

          <Box className="footer_icon_box">
            <a href="https://www.youtube.com/user/KIKOCOSMETICS">
              <YouTubeIcon
                className="footer_icon"
                sx={{ backgroundColor: " #ed302f", color: "white" }}
              />
            </a>
          </Box>
        </Box>

        <Box className="footer_container">
          <FooterEnd className="footer_icon" />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
