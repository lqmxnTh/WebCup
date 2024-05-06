import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer">
      <div className="indent">
        <div className="details-container">
          <div className="detail-1">
            <span className="footer-title">Spooky Store</span>
            <div>
              <p>Desire Spook</p>
              <p>Deadly Town</p>
              <p>Zombie Continent</p>
            </div>
          </div>
          <div className="detail-2">
            <span className="footer-title">Contact Us</span>
            <div>
              <p>Tel:</p>
              <p>Mob:</p>
              <p>Email:</p>
            </div>
          </div>
          <div className="detail-3">
            <span className="footer-title">Delivery Points</span>
            <div>
              <p>  Hogwarts</p>
              <p>Elden Ring</p>
              <p>LOL</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="details-container">
          <div>
            <p>&copy; {new Date().getFullYear()} Tri  Wizards</p>
            <p>Powered By TML</p>
          </div>
          <div className="socials">
            <Link to="/">
              <FaFacebook className="social" />
            </Link>
            <Link to="/">
              <FaInstagram className="social" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
