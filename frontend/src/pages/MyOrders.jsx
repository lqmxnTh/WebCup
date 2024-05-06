import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { parseISO, format } from 'date-fns';
import "../styles/MyOrders.css";

function MyOrders() {
  const baseURL = import.meta.env.VITE_API_URL
  const [cookies] = useCookies(["user"]);
  const user = cookies.user.id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${baseURL}/order`, {"user_id":user});
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]); // Added user as a dependency for useEffect

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
console.log(orders)
  return (
    <div className="my-orders">
      <h2 className="my-orders-title">My Orders</h2>
      <div className="orders-container">
        {orders.length === 0 ? (
          <p className="no-orders-message">You have no orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3 className="order-id">Order ID: #{order.id}</h3>
                <p className="order-date">Date: {format(parseISO(order.checkout_datetime), 'dd/MM/yyyy')}</p>
              </div>
              <div className="order-details">
                <p className="order-total">Total: Rs {order.total_price}</p>
                <p className="order-status">Status: {order.status}</p>
              </div>
              <div className="order-items">
                <h4 className="order-items-title">Items:</h4>
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items?.map((item) => (
                      <tr key={item.variant_id}>
                        <td><img src={`${baseURL}${item?.product.image}`} alt={item.product.name} className="product-image" /></td>
                        <td>{item.product.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
