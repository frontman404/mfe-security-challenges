import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [adminMode, setAdminMode] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const fetchOrders = useCallback(async (admin, userId) => {
    try {
      let url = "http://localhost:5004/api/orders";
      if (!admin && userId) {
        url = `http://localhost:5004/api/orders/user/${encodeURIComponent(
          userId
        )}`;
      }
      const response = await fetch(url, {
        credentials: "include",
      });
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (adminMode) {
      fetchOrders(true);
    } else if (user && user.id) {
      fetchOrders(false, user.id);
    } else {
      setOrders([]);
    }
  }, [adminMode, user, fetchOrders]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data.type === "LOGGED_IN" ||
        event.data.type === "LOGGED_OUT" ||
        event.data.type === "ORDER_PLACED"
      ) {
        fetchUser();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [fetchUser]);

  const toggleAdminMode = () => setAdminMode((prev) => !prev);

  return (
    <OrderContext.Provider
      value={{
        orders,
        error,
        user,
        adminMode,
        toggleAdminMode,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
