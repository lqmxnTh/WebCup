import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shop.css";
import Product from "../component/Product";
import { Link } from "react-router-dom";
function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const baseURL = import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/product/?search=${searchQuery}`
        );
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
console.log(products)
  return (
    <div className="shop-container">
      <div className="top-shop">
        <input
        placeholder="search..."
          className="search-bar"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />

      </div>
      <div className="bottom-shop">
        <div className="right-shop">
          {!loading &&
            !error &&
            products?.map((menuItem, key) => (
              <Link  className="prodLink" to={`/product/${menuItem.id}`}>
                <Product
                  key={key}
                  id={menuItem.id}
                  img={`${baseURL}${menuItem.image}`}
                  name={menuItem.name}
                  price={menuItem.price}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
