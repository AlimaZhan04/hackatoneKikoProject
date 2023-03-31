import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import CardBlock from "../../components/Product/ProductCard";
import ProductList from "../../components/Product/ProductList/ProductList";

let cosmetics = [];
const HomePage = () => {
  return (
    <div className="">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.kikocosmetics.com/mediaObject/2023/launches/greenme-2023/Launch_GreenMe_HPslider-Desktop/webp-resolutions/res-1920x600/Launch_GreenMe_HPslider-Desktop.webp"
          />
          <Carousel.Caption>
            <h3>NEW GREEN ME</h3>
            <p>REDUCED PLASTIC PACKAGING</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="https://images.kikocosmetics.com/mediaObject/2023/launches/welcome-flawless/Launch_WelcomeFlawless_Landing_Header-Desktop/webp-resolutions/res-1920x600/Launch_WelcomeFlawless_Landing_Header-Desktop.webp"
          />

          <Carousel.Caption>
            <h3>NEW BEAUTY ESSENTIALS COLLECTION</h3>
            <p>YOUR DAILY ROUTINE TO RECHARGE YOURSELF</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.kikocosmetics.com/mediaObject/2023/launches/reshape-your-lips/Launch_ReshapeYourLips_HP-Desktop/webp-resolutions/res-1920x600/Launch_ReshapeYourLips_HP-Desktop.webp"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <center>
        <h1>KIKO COSMETICS</h1>
        <div className="d-flex justify-content-between container mt-5 flex-wrap">
          {cosmetics.map((item) => (
            <CardBlock key={item.id} item={item} />
          ))}
          <div>
            <ProductList />
          </div>
        </div>
        <div>
          <ProductList />
        </div>
      </center>
      <div>
        <center>
          <h2>NEWS</h2>

          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-between my-1">
                <img
                  className="d-flex w-10"
                  src="https://images.kikocosmetics.com/mediaObject/2023/collections/powerful-love/HP_App/Collection_PowerfulLove_CarouselBox/webp-resolutions/res-600x600/Collection_PowerfulLove_CarouselBox.webp"
                  alt="First slide"
                />
                <img
                  className="d-flex  w-10"
                  src="https://images.kikocosmetics.com/mediaObject/2023/collections/beauty-essentials/Landing/04_ModelsLook/webp-resolutions/res-720x600/04_ModelsLook.webp"
                  alt="First slide"
                />
              </div>
              <Carousel.Caption>
                <h3>POWERFUL LOVE COLLECTION</h3>
                <p>MAKE YOUR BEAUTY SPECIAL WITH A TOUCH</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Second slide"
              />
              <img
                className="d-flex  w-10 rounded"
                src="https://images.kikocosmetics.com/mediaObject/2023/collections/beauty-essentials/Landing/04_ModelsLook/webp-resolutions/res-720x600/04_ModelsLook.webp"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
              />
              <img
                className="d-flex  w-10"
                src="https://images.kikocosmetics.com/mediaObject/2023/collections/beauty-essentials/Landing/04_ModelsLook/webp-resolutions/res-720x600/04_ModelsLook.webp"
                alt="First slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </center>
      </div>
    </div>
  );
};

export default HomePage;
