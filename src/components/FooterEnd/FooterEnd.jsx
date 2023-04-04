import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

export default function FooterEnd() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#21081a" }}
    >
      <MDBContainer className="p-4"></MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © KIKO USA, Inc. All rights reserved
        <a className="text-white" href="https://mdbootstrap.com/"></a>
      </div>
    </MDBFooter>
  );
}
