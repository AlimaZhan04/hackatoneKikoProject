import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";

const AddBlog = ({ addCosmetics }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  function handleValues() {
    let newCosmetics = {
      title,
      price,
      description,
      image,
    };
    addCosmetics(newCosmetics);

    console.log(newCosmetics);
  }
  return (
    <center>
      <div className="">
        <h2 className="my-5">ADD YOUR PRODUCT</h2>
        <FormControl
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-50 my-2 mt-5 "
          type="text"
          placeholder="title"
        />
        <br />
        <FormControl
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-50 my-2 "
          type="text"
          placeholder="description"
        />
        <br />
        <FormControl
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-50 my-2 "
          type="text"
          placeholder="image"
        />
        <br />
        <FormControl
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-50 my-2 "
          type="text"
          placeholder="price"
        />

        <Button onClick={handleValues} className="px-5 btn btn-dark fs-4">
          Add
        </Button>
      </div>
    </center>
  );
};

export default AddBlog;
