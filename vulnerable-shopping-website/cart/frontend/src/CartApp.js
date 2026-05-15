import React from "react";
import CartProvider, { useCart } from "./CartProvider";
import Cart from "./components/Cart";
import FinalizeOrder from "./components/FinalizeOrder";

const CartApp = () => {
  const {
    cartItems,
    error,
    user,
    view,
    removeFromCart,
    clearCart,
    switchToFinalizeOrder,
    switchToCart,
  } = useCart();

  return (
    <div className="cart-app-container">
      {view === "cart" && <Cart />}
      {view === "finalizeOrder" && <FinalizeOrder />}
    </div>
  );
};

const CartAppWrapper = () => (
  <CartProvider>
    <CartApp />
  </CartProvider>
);

export default CartAppWrapper;
