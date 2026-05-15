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
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5003/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
        const userResponse = await axios.get("http://localhost:5001/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
      }
    } catch (err) {
      setError("Failed to fetch cart items");
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`http://localhost:5003/api/cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.postMessage({ type: "CART_UPDATED" }, "*");
      } catch (err) {
        setError("Failed to delete product from cart");
        console.error(err);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.postMessage({ type: "CART_UPDATED" }, "*");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`http://localhost:5003/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.postMessage({ type: "CART_UPDATED" }, "*");
      } catch (err) {
        setError("Failed to clear cart");
        console.error(err);
      }
    } else {
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
