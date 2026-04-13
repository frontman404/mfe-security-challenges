import React, { useState } from "react";
import { useCart } from "../CartProvider";
import "./FinalizeOrder.scss";

const FinalizeOrder = () => {
  const { cartItems, user, switchToCart, clearCart } = useCart();
  const [name, setName] = useState(user ? user.name : "");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [email, setEmail] = useState(user ? user.email : "");

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = () => {
    const token = localStorage.getItem("token");
    const order = {
      name,
      address,
      town,
      email,
      items: cartItems,
      totalAmount,
    };

    fetch("http://localhost:5004/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Order placed successfully!");
        window.postMessage({ type: "ORDER_PLACED" }, "*");
        switchToCart();
        clearCart();
      });
  };

  return (
    <div className="finalize-order-container">
      <div className="button-container">
        <button className="back-button" onClick={switchToCart}>
          Back to Cart
        </button>
      </div>
      <h2>Finalize Order</h2>
      <div className="order-summary">
        <ul>
          <li key="Total">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
      <div className="order-details">
        <h3>Enter Your Details</h3>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Town:
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!!user}
          />
        </label>
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default FinalizeOrder;
