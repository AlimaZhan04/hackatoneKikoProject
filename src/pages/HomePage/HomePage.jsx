import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import CardBlock from "../../components/Product/ProductCard";
import HMcard from "../../components/Product/ProductList/HMcard";
import "./HomePage.css";
import ProductList from "../../components/Product/ProductList/ProductList";
import { useNavigate } from "react-router";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import { Button } from "@mui/material";

let cosmetics = [];
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Carousel className="home-carousel" pause="hover" interval={6000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/hero-lips.webp"
            alt="KIKO Milano 3D Hydra lip gloss collection"
          />
          <Carousel.Caption>
            <span className="hero-brand">KIKO MILANO</span>
            <h3 className="carousel_text1">SHINE IN EVERY SHADE</h3>
            <p className="carousel_text2">Discover your everyday beauty essentials</p>
            <button className="promo_btn" onClick={()=>navigate('/best?type=decorative')}>SHOP MAKEUP</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="/images/hero-gifts.webp"
            alt="KIKO Milano makeup and beauty gift sets"
          />

          <Carousel.Caption>
            <span className="hero-brand">KIKO MILANO</span>
            <h3 className="carousel_text1">THE BEAUTY OF GIVING</h3>
            <p className="carousel_text2">
              A little colour. A beautiful surprise.
            </p>
            <button className="promo_btn" onClick={()=>navigate('/offers')}>DISCOVER MORE</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/hero-beauty.jpg"
            alt="KIKO Milano foundation in a range of shades"
          />

          <Carousel.Caption>
            <span className="hero-brand">KIKO MILANO</span>
            <h3 className="carousel_text1">YOUR EVERYDAY ESSENTIALS</h3>
            <p className="carousel_text2">
              Find the perfect finish for your beauty routine
            </p>
            <button className="promo_btn" onClick={()=>navigate('/best?type=care')}>EXPLORE SKINCARE</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <center>
        <h1 style={{ marginTop: "2%" }}>PROMO</h1>
        <div
          className="promo"
          style={{ display: "flex", margin: "20px 10px", paddingLeft: "5%" }}
        >
          <div className="promo1">
            <img
              className="promo_img"
              style={{ borderRadius: "10px" }}
              width={600}
              height={400}
              src="/images/beauty-lips.jpg"
              alt="KIKO Milano Unlimited Double Touch lip colour"
            />
          </div>
          <div className="promo_left">
            <h3 className="promo_h3">
              GET UP TO 2 FREE PRODUCTS
              <br />
              WITH YOUR ONLINE ORDER
            </h3>
            <p>The more you buy, the more you save</p>
            <button className="promo_btn" onClick={() => navigate("/best")}>
              SHOP NOW
            </button>
          </div>
          <div className="promo2">
            <img
              className="promo_img"
              style={{ borderRadius: "10px" }}
              width={600}
              height={400}
              src="/images/beauty-care.jpg"
              alt="KIKO Milano Skin Trainer collection"
            />
          </div>
          <div className="promo_right">
            <h4 className="promo_h3">1 PRODUCT FOR FREE</h4>
            <button className="promo_btn" onClick={() => navigate("/best")}>
              SHOP NOW
            </button>
          </div>
        </div>
        <h1 className="must_have">THE MUST-HAVES OF THE MOMENT</h1>
        <div className="d-flex justify-content-between container  flex-wrap">
          {cosmetics.map((item) => (
            <CardBlock key={item.id} item={item} />
          ))}
        </div>

        <div>
          <ProductList />
          <h2>NEWS</h2>
          <HMcard />
        </div>
      </center>
      <center>
        <h2 className="kikoName">KIKO is...</h2>
      </center>

      <div
        style={{ display: "flex", marginTop: "1rem", marginLeft: "1rem" }}
        className="kiko_is"
      >
        <div>
          <h3 className="kikoIs">COLOUR</h3>
          <img
            className="kikoIsImg"
            style={{ marginLeft: "25px", borderRadius: "10px" }}
            width={350}
            src={img1}
            alt="a"
          />
        </div>
        <div>
          <h3 className="kikoIs">INNOVATION</h3>
          <img
            className="kikoIsImg"
            style={{ marginLeft: "25px", borderRadius: "10px" }}
            width={350}
            src={img2}
            alt="a"
          />
        </div>
        <div>
          <h3 className="kikoIs">SAFETY</h3>
          <img
            className="kikoIsImg"
            style={{ marginLeft: "25px", borderRadius: "10px" }}
            width={350}
            src={img3}
            alt="a"
          />
        </div>
        <div>
          <h3 className="kikoIs">OUR MISSION</h3>
          <img
            className="kikoIsImg"
            style={{ marginLeft: "25px", borderRadius: "10px" }}
            width={350}
            src={img4}
            alt="a"
          />
        </div>
      </div>
      <center>
        <Button
          className="our_brand"
          onClick={() => navigate("/aboutus")}
          style={{
            border: "2px solid black",
            borderRadius: "100rem",
            width: "250px",
            marginTop: "2rem",
            color: "black",
            fontSize: "10px",
          }}
        >
          Our Brand
        </Button>
      </center>
      <div className="ourBrand">
        <img
          className="ourBrandImg"
          src={img5}
          width={1500}
          style={{ marginTop: "2rem" }}
        />
      </div>
    </div>
  );
};

export default HomePage;
