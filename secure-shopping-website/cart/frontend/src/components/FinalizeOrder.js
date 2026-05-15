import React, { useState } from "react";
import { useCart } from "../CartProvider";
import styles from "./finalizeOrder.module.scss";

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
      },
      credentials: "include",
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
    <div className={styles.finalizeOrderContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.backButton} onClick={switchToCart}>
          Back to Cart
        </button>
      </div>
      <h2>Finalize Order</h2>
      <div className={styles.orderSummary}>
        <ul>
          <li key="Total">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
      <div className={styles.orderDetails}>
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
        <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default FinalizeOrder;
