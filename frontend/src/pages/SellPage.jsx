import React, { useState } from "react";
import axios from "axios";
import "../styles/Sell.css";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

function SellPage() {
  const baseURL = import.meta.env.VITE_API_URL
  const [cookies] = useCookies(["user"]);
  const user = cookies.user ? cookies.user.id : null;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null, // Updated to handle file upload
    seller: user
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files && files[0]; // Get the first file if multiple files are selected
    setFormData({ ...formData, [name]: value, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(`${baseURL}/sell/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product listed successfully:", response.data);
      alert("Product Listed Successfully")
      location.reload();
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Error listing product:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div className="selling-page-container">
        <h3 className="sell-here-text">Sell Here</h3>
        <div className="selling-form-container">
          <h4>Lets begin</h4>
          <form className="selling-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="name">Name</label>
            <input
              className="sell-form-input"
              type="text"
              name="name"
              onChange={handleChange}
            />

            <label htmlFor="description">Describe Precisely</label>
            <textarea
              className="sell-form-input"
              type="text"
              name="description"
              onChange={handleChange}
            />

            <label htmlFor="price">Price</label>
            <input
              className="sell-form-input"
              type="text"
              name="price"
              onChange={handleChange}
            />

            <label htmlFor="stock">Stock</label>
            <input
              className="sell-form-input"
              type="text"
              name="stock"
              onChange={handleChange}
            />

            {/* File input for image */}
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            <button className="form-sell-button" type="submit">
              Sell this Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellPage;
