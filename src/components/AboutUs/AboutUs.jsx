import React from "react";

const AboutUs = () => {
  return (
    <div className="d-flex ">
      <div>
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
      <div>
        <img
          width={700}
          src="https://images.kikocosmetics.com/mediaObject/2022/info/US-about-us/02_Info_AboutUs_Box/webp-resolutions/res-1200x1200/02_Info_AboutUs_Box.webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default AboutUs;
