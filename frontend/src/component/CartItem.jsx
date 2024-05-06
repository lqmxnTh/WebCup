import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../styles/CartItem.css";

function CartItem({
  cartItemId,
  variantId,
  productImage,
  variantName,
  quantity,
  variantColor,
  variantPrice,
  variantStock,
  updateCart,
}) {
  const baseURL = import.meta.env.VITE_API_URL
  const [quantityDisplay, setQuantityDisplay] = useState(quantity);
  const [cookies] = useCookies(["user"]);

  const addToCart = async (qty) => {
    try {
      await axios.post(`${baseURL}/cart/add`, {
        user_id: cookies.user.id,
        product_id: variantId,
        quantity: qty,
      });
      setQuantityDisplay(quantityDisplay + qty);
      updateCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const removeItemFromCart = async () => {
    try {
      await axios.post(`${baseURL}/cart/remove/${cartItemId}`);
      updateCart();
    } catch (error) {
      console.error("Error removing item in cart:", error);
    }
  };

  function handleMinusCount() {
    if (quantityDisplay > 1) {
      addToCart(-1);
    }
  }

  function handlePlusCount() {
    if (quantityDisplay < variantStock) {
      addToCart(1);
    }
  }

  return (
    <div id={variantId} className="cart-item-container">
      <div className="cart-item-left-side">
        <img className="cart-item-img" src={productImage} alt="product" />
      </div>
      <div className="cart-item-right-side">
        <h2>{variantName}</h2>
        <p>Color: {variantColor}</p>
        <p>Price: {variantPrice}</p>
        <div className="btn-extra">
          <div className="qty-btn-display">
            <button className="plus-minus-btn" onClick={handleMinusCount}>
              -
            </button>
            <input
              className="qty-txt"
              name="qty"
              type="text"
              value={quantityDisplay}
              readOnly
            />
            <button className="plus-minus-btn" onClick={handlePlusCount}>
              +
            </button>
          </div>
        </div>
        <button className="remove-product-btn" onClick={removeItemFromCart}>
          Remove Product
        </button>
      </div>
    </div>
  );
}

export default CartItem;
