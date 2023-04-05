import React from "react";
import done from "./images/done.png";

const Thanks = () => {
  return (
    <center style={{ margin: "180px" }}>
      <img src={done} alt="" width={700} />
      <h2>Thank you for your purchase!</h2>
      <h4>We are waiting for you again in our store!</h4>
    </center>
  );
};

export default Thanks;
