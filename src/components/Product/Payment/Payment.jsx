import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "./Payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const navigate = useNavigate();

  function Clear() {
    if (!number || !name || !expiry || !cvc || !focus) {
      alert("some inputs are empty");
      return;
    }

    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    setFocus("");
  }

  return (
    <div className="payment_card">
      <Cards
        sx={{ marginBottom: "5rem" }}
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form className="payment">
        <input
          className="payment_inp"
          type="tel"
          name="number"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.value)}
        />
        <input
          className="payment_inp"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          className="payment_inp"
          type="text"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          className="payment_inp"
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <Button
          className="pay_btn"
          style={{
            border: "2px solid black",
            borderRadius: "100rem",
            color: "white",
            marginTop: "5px ",
            background: "black",
            height: "30px",
          }}
          onClick={() => {
            // Clear;
            navigate("/thanks");
          }}
        >
          Pay with Card
        </Button>
      </form>
    </div>
  );
};

export default Payment;
