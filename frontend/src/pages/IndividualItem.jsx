import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/IndividualItem.css";
function IndividualItem() {
  const baseURL = import.meta.env.VITE_API_URL
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [cookies] = useCookies(["user"]);
  console.log(id);
  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const response = await axios.get(`${baseURL}/product/${id}`);
        setVariant(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVariant();
  }, [id]);
  if (!cookies.user) {
  }
  const handleAddToCart = async () => {
    if (cookies.user) {
      try {
        await axios.post(`${baseURL}/cart/add`, {
          user_id: cookies.user.id,
          product_id: id,
          quantity: quantity,
        });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.log("Log in to add to cart");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!variant) {
    return <p>No product found</p>;
  }

  function handleMinusCount() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handlePlusCount() {
    if (quantity < variant.stock) {
      setQuantity(quantity + 1);
    }
  }

  return (
    <div>
      <div className="individual-prod">
        <div className="individual-prod-left">
          <img
            className="variant-img"
            src={`${baseURL}${variant.image}`}
            alt=""
          />
        </div>
        <div className="individual-prod-right">
          <div>
            {variant.stock === 0 ? (
              <h1 className="sold-out">Sold out</h1>
            ) : null}
            <h1 className="display-variant-name">{variant.name}</h1>
            <p className="display-variant-desc">{variant.description}</p>
            <div className="price-stock-det">
              <h2 className="display-variant-price">Rs {variant.price}</h2>
              <p className="display-variant-stock">Stock: {variant.stock}</p>
            </div>
          </div>
          <div className="btn-extra">
            <div className="qty-btn-display">
              <button className="plus-minus-btn" onClick={handleMinusCount}>
                -
              </button>
              <input
                className="qty-txt"
                name="qty"
                type="text"
                value={quantity}
                readOnly
              />
              <button className="plus-minus-btn" onClick={handlePlusCount}>
                +
              </button>
            </div>
            <button
              className="add-to-cart-btn"
              disabled={variant.stock === 0}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualItem;