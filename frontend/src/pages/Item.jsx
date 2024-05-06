import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from "../component/Product";
import { Link } from "react-router-dom";
function Item() {
  const baseURL = import.meta.env.VITE_API_URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <h2>Variants:</h2>
      <div className="variants">
        {product.variants.map((variant, key) => (
          <Link to={`/variant/${variant.id}`}>
            <Product
              key={key}
              id={variant.id}
              img={`${baseURL}${variant.img}`}
              name={product.name + " - "+ variant.ref}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Item;
