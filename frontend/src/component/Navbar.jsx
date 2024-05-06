import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import getCartById from "../hooks/GetCartById";
import PumpkinCartIcon from "./PumpkinCartIcon";


function Navbar() {
  const baseURL = import.meta.env.VITE_API_URL
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [cart, setCart] = useState(null);
  const [itemInCart, setItemInCart] = useState(null);
  const user = cookies.user;

  const handleLogout = async () => {
    removeCookie("user");
    removeCookie("token");
    setCart(null);
    setItemInCart(null);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const cartData = await getCartById(user.id);
          setCart(cartData);
          setItemInCart(cartData.items.length);
        } else {
          setItemInCart(null); // Reset itemInCart if user is not present
        }
      } catch (error) {}
    };
  
    fetchCart();
  }, [user, cart]);
  

  return (
    <header>
      <div className="navbar-container">
        <div className="container-left">
          <div className="container-logo">
            Spooky Store
          </div>
        </div>
        <div className="container-middle">
          <nav className="list">
            <ul>
              <li className="nav-options">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-options">
                <Link to="/shop">Shop</Link>
              </li>
              <li className="nav-options">
                <Link to="/sell">Sell Here</Link>
              </li>
              {user && (
                <li className="nav-options">
                  <Link to="/orders">MyOrders</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="container-right">
        <Link to="/cart">
            <div className="navbar-cart-container">
              <div>
                {itemInCart && <p className="item-in-cart">{itemInCart}</p>}
                <PumpkinCartIcon className="cart-logo" />
              </div>
            </div>
          </Link>


          {user ? (
            <>
              <span className="wlcm-txt">Welcome, {user.first_name}</span>
              <button className="sign-in-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="sign-in-btn">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
