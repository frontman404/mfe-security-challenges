import React from "react";
import { useCart } from "../CartProvider";
import CartItem from "./CartItem";
import styles from "./cart.module.scss";

const Cart = () => {
  const { cartItems, error, switchToFinalizeOrder } = useCart();

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cart}>
        <h2>Cart</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {cartItems.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
          <li key="Total">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </li>
        </ul>
        {cartItems.length > 0 && (
          <button className={styles.cartButton} onClick={switchToFinalizeOrder}>
            Finalize Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
