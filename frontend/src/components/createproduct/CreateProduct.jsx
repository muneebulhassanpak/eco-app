import React from "react";
import { useState } from "react";

import InputField from "../shared/inputfield/InputField";
import Button from "../shared/button/Button";
import { ImCross } from "react-icons/im";

import { createOneProduct, headers } from "../../../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";

import { ToastContainer } from "react-toastify";

const privacy = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
];

const CreateProduct = ({ onClick, sendBackNewProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedOption, setSelectedOption] = useState("Public");

  const productCreationFormHandler = async (e) => {
    e.preventDefault();
    const newProductData = {
      name,
      description,
      image,
      price,
      quantity,
      privacy: selectedOption.toLowerCase(),
    };
    console.log(newProductData);
    //Product creation logic
    try {
      let response = await fetch(createOneProduct, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(newProductData),
      });
      response = await response.json();
      console.log(response);

      if (response.success) {
        successNotification("Product added successfully") &&
          sendBackNewProduct(response.product);
      } else {
        errorNotification(
          response.message || "Something went wrong in creating product"
        );
      }
    } catch (error) {
      errorNotification("Failed to fetch products");
    } finally {
    }
  };

  return (
    <>
      <div className="relative p-3">
        <h2 className="text-center font-play text-3xl font-semibold my-3 ">
          Create Product Form
        </h2>
        <ImCross
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            onClick();
          }}
        />
        <form action="" onSubmit={productCreationFormHandler}>
          <InputField
            type="text"
            text="Product Name"
            name="Product Name"
            placeholder="Enter appropriate product title"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputField
            type="text"
            text="Product Description"
            name="Product Description"
            placeholder="Describe your product"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <InputField
            type="text"
            name="Product Image"
            text="Product Image"
            placeholder="Enter your product Image URL"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <InputField
            type="number"
            text="Product Price"
            name="Product Price"
            placeholder="Enter your product price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <InputField
            type="number"
            text="Product Quantity"
            placeholder="Quantity of stock"
            name="Product Quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <InputField
            type="dropdown"
            text="Make product"
            data={privacy}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            value={selectedOption}
          />
          <div className="text-center mt-2">
            <Button text="Create Product" use="submit" style="brownFilled" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateProduct;
