import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutUs ">
      <div className="aboutUsText">
        <center>
          <h3>KIKO MILANO</h3>
        </center>
        <p>
          This is how KIKO sums up its vision of Beauty. Through its
          extraordinarily wide and diversified range of products, KIKO allows
          everyone to express their own personality. An unparalleled variety of
          colours, effects and sensations that are unique in the market to suit
          your style, skin tone, skin type and specific tastes, at every phase
          of your life. KIKO's identity is rooted in "Made in Italy" values as
          the world capital for fashion, art and design. As craftsmen of
          original textures, colours and the evolution of beauty, we offer
          quality formulas with guaranteed performance, for a perfect fusion of
          quality and creativity. Accessible and Irresistible, from Italy with
          Love.
        </p>
      </div>
      <div className="aboutUsImg">
        <img
          className="aboutImg"
          src="/images/beauty-care.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default AboutUs;
