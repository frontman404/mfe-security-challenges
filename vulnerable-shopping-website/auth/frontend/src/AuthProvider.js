import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      window.postMessage({ type: "LOGGED_IN" }, "*");
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5001/api/register", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      handleSwitchToLogin();
    } catch (err) {
      throw new Error("Registration failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
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
