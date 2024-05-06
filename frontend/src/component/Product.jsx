import React from "react";
import { Link } from "react-router-dom";
import PumpkinCartIcon from "./PumpkinCartIcon";
// import Rating from "@mui/material/Rating";
import "../styles/Home.css";
import ScienceIcon from "@mui/icons-material/Science";

function Product({ id, img, name, price }) {
  return (
    <div className="prodCard">
      <img className="prodImage" src={img} alt={name} />

      <div className="prodNameAndIcon">
        <h2>{name}</h2>
        <PumpkinCartIcon />
      </div>
      <div className="prodPriceAndIcon">
        <p className=" prodPrice">{price}</p>
        <ScienceIcon />
      </div>
    </div>
  );
}

export default Product;

