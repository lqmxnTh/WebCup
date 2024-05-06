import React, { useState } from "react";
import "../styles/Price.css";
import ScienceIcon from "@mui/icons-material/Science";

function Product(props) {
  const price = props.Price;

  return (
    <div className="prodPriceAndIcon">
      <p className="prodPrice">{price}</p>
      <ScienceIcon />
    </div>
  );
}

export default Product;