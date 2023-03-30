import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Headers = () => {
  const location = useLocation();
  return (
    <>
      <div class="p-3 mb-2 bg-black text-white">
        <center>
          <img
            width={100}
            src="https://seeklogo.com/images/K/kiko-milano-logo-420B68E682-seeklogo.com.png"
            alt=""
          />
        </center>
        <Navbar>
          <Container>
            <Link to="/">
              <Navbar.Brand
                className={
                  location.pathname === "/" ? "btn btn-light" : "btn btn-dark"
                }
              >
                Home
              </Navbar.Brand>
            </Link>

            <Link to="/about-us">
              <Navbar.Brand
                className={
                  location.pathname === "/about-us"
                    ? "btn btn-dark"
                    : "btn btn-light"
                }
              >
                About Us
              </Navbar.Brand>
            </Link>
            <Link to="/contacts">
              <Navbar.Brand
                className={
                  location.pathname === "/contacts"
                    ? "btn btn-dark"
                    : "btn btn-light"
                }
              >
                Contacts
              </Navbar.Brand>
            </Link>

            <Link to="/add-block">
              <Navbar.Brand
                className={
                  location.pathname === "/add-block"
                    ? "btn btn-dark"
                    : "btn btn-light"
                }
              >
                Add
              </Navbar.Brand>
            </Link>

            <Link to="/elected">
              <Navbar.Brand
                className={
                  location.pathname === "/elected"
                    ? "btn btn-dark"
                    : "btn btn-light"
                }
              >
                Elected
              </Navbar.Brand>
            </Link>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Headers;
