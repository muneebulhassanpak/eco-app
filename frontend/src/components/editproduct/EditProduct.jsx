import React, { useState, useEffect } from "react";

import InputField from "../shared/inputfield/InputField";
import Button from "../shared/button/Button";
import DOMPurify from "dompurify";

import { ImCross } from "react-icons/im";

import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";
import { headers, editOneProduct } from "../../../utils/Urls";
import { ToastContainer } from "react-toastify";

const privacyValues = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const EditProduct = ({
  onClick,
  id,
  name: initialName,
  description: initialDescription,
  image: initialImage,
  price: initialPrice,
  quantity: initialQuantity,
  privacy: initialPrivacy,
  updatedProduct,
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState(initialImage);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [privacy, setPrivacy] = useState(initialPrivacy);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      name.trim().length > 4 &&
        description.trim().length > 10 &&
        image.trim().length > 0
    );
  }, [name, description, image]);

  const productEditHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      errorNotification("Incomplete or incorrect data!");
      return;
    }

    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedDescription = DOMPurify.sanitize(description);
    const sanitizedPrice = DOMPurify.sanitize(price);
    const sanitizedQuantity = DOMPurify.sanitize(quantity);

    const dataObject = {
      id,
      name: sanitizedName,
      description: sanitizedDescription,
      image,
      price: sanitizedPrice,
      quantity: sanitizedQuantity,
      privacy,
    };

    let response = await fetch(editOneProduct(id), {
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify(dataObject),
    });

    response = await response.json();
    if (response.success === true) {
      successNotification("Successfully edited");
      updatedProduct(response.updatedProduct);
    } else {
      errorNotification(response.message || "Something went wrong in editing");
    }

    setName("");
    setDescription("");
    setImage("");
    setPrice("");
    setQuantity("");
    setPrivacy("Public");
    setFormIsValid(false);

    onClick();
  };

  return (
    <>
      <div className="relative p-3">
        <h2 className="text-center font-play text-3xl font-semibold my-3 ">
          Edit Product
        </h2>
        <ImCross
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            onClick();
          }}
        />
        <form action="" onSubmit={productEditHandler}>
          <InputField
            type="text"
            text="Product Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputField
            type="textarea"
            text="Product Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <InputField
            type="text"
            text="Product Image"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <InputField
            type="number"
            text="Product Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <InputField
            type="number"
            text="Product Quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <InputField
            type="dropdown"
            text="Privacy"
            data={privacyValues}
            value={privacy}
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
          />
          <div className="text-center">
            <Button style="brownFilled" use="submit" text="Save Changes" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProduct;
