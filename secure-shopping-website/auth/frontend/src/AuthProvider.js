import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await axios.post(
        "http://localhost:5001/api/login",
        { email, password },
        { withCredentials: true }
      );
      const response = await axios.get("http://localhost:5001/api/user", {
        withCredentials: true,
      });
      setUser(response.data);
      window.postMessage({ type: "LOGGED_IN" }, "*");
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      await axios.post(
        "http://localhost:5001/api/register",
        { name, email, password },
        { withCredentials: true }
      );
      handleSwitchToLogin();
    } catch (err) {
      throw new Error("Registration failed");
    }
  };

  const handleLogout = async () => {
    setUser(null);
    await axios.post(
      "http://localhost:5001/api/logout",
      {},
      { withCredentials: true }
    );
    handleSwitchToLogin();
    window.postMessage({ type: "LOGGED_OUT" }, "*");
  };

  const handleSwitchToRegister = () => {
    setView("register");
  };

  const handleSwitchToLogin = () => {
    setView("login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        view,
        handleLogin,
        handleRegister,
        handleLogout,
        handleSwitchToRegister,
        handleSwitchToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
