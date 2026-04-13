import React from "react";
import { useCart } from "../CartProvider";
import "./CartItem.scss";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <li className="cart-item">
      <span>{item.name}</span>
      <span>
        ${item.price} x {item.quantity} = ${item.price * item.quantity}
      </span>
      <button onClick={() => removeFromCart(item.productId)}>Remove</button>
    </li>
  );
};

export default CartItem;
