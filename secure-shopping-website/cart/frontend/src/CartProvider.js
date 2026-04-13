import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("cart");

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/cart", {
        withCredentials: true,
      });
      setCartItems(response.data);
      const userResponse = await axios.get("http://localhost:5001/api/user", {
        withCredentials: true,
      });
      setUser(userResponse.data);
    } catch (err) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5003/api/cart/${productId}`, {
        withCredentials: true,
      });
      window.postMessage({ type: "CART_UPDATED" }, "*");
    } catch (err) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.postMessage({ type: "CART_UPDATED" }, "*");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:5003/api/cart`, {
        withCredentials: true,
      });
      window.postMessage({ type: "CART_UPDATED" }, "*");
    } catch (err) {
      localStorage.removeItem("cart");
      window.postMessage({ type: "CART_UPDATED" }, "*");
    }
  };

  const handleUpdateCart = () => {
    fetchCartItems();
  };

  const handleClearCartOnLogout = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    window.postMessage({ type: "CART_UPDATED" }, "*");
  };

  const switchToFinalizeOrder = () => {
    setView("finalizeOrder");
  };

  const switchToCart = () => {
    setView("cart");
  };

  const handleMessage = (event) => {
    if (event.data.type === "CART_UPDATED" || event.data.type === "LOGGED_IN") {
      handleUpdateCart();
    } else if (event.data.type === "LOGGED_OUT") {
      handleClearCartOnLogout();
    }
  };

  useEffect(() => {
    fetchCartItems();
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        error,
        user,
        view,
        removeFromCart,
        clearCart,
        switchToFinalizeOrder,
        switchToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
