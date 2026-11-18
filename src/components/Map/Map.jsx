import React from "react";
import "./Map.css";

const Map = () => {
  return (
    <div>
      <div className="map-container">
        <h6 className="h6">Where you can buy our products?</h6>
        <iframe
          className="map"
          title="KIKO Milano stores in Parma"
          src="https://maps.google.com/maps?q=KIKO%20Milano%20Via%20Cavour%206%20Parma%20Italy&output=embed"
          // width={500}
          // height={1000}
          style={{ border: 0 }}
          // allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
