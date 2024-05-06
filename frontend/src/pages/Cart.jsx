import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../component/CartItem";
import { useCookies } from "react-cookie";
import "../styles/Cart.css";
import getCartById from "../hooks/GetCartById";

function Cart() {
  const baseURL = import.meta.env.VITE_API_URL
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["user"]);
  const user_id = cookies.user?.id;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartById(user_id);
        setCart(cartData);
        console.log(cartData)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);
  
  const updateCart = async () => {
    try {
      const response = await axios.get(`${baseURL}/cart/${user_id}`);
      setCart(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Cart not found for this user.");
        setCart(null);
      } else {
        console.error("Error during checkout:", error);
      }
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`${baseURL}/checkout`, {
        cart_id: cart.id,
        user_id: user_id,
        
      });
      console.log("Checkout successful!");
      updateCart();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }
  
  if (!user_id) {
    return <p>Log in to see cart</p>;
  }
  if (!cart) {
    return <p>No items in cart</p>;
  }

  return (
    <div className="cart-container">
      <div className="left-cart-container">
        {cart?.items?.map((item) => (
          <CartItem
            key={item.id}
            cartItemId={item.id}
            variantId={item.product.id}
            variantName={item.product.name}
            variantPrice={item.product.price}
            variantStock={item.product.stock}
            quantity={item.quantity}
            productImage={`${baseURL}${item.product.image}`}
            updateCart={updateCart}
          />
        ))}
      </div>
      <div className="right-cart-container">
        <table className="price-details">
          <tbody>
            <tr>
              <th className="align-left">Subtotal (Rs)</th>
              <td className="align-left">
                {(cart.total_price * (100 / 115)).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th className="align-left">VAT [15%] (Rs)</th>
              <td className="align-left">
                {(cart.total_price * (15 / 115)).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th className="align-left">Total (Rs)</th>
              <td className="align-left">{cart.total_price}</td>
            </tr>
          </tbody>
        </table>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
