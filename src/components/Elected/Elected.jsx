import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Elected() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://i.pinimg.com/564x/9c/a0/a0/9ca0a0fe56b2621651a425f702348013.jpg"
      />
      <Card.Body>
        <Card.Title>Lipstick</Card.Title>
        <Card.Text>
          {" "}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
            quis?
          </p>{" "}
        </Card.Text>
        <Card.Text>567$</Card.Text>
        <Button variant="primary">buy</Button>
      </Card.Body>
    </Card>
  );
}

export default Elected;
