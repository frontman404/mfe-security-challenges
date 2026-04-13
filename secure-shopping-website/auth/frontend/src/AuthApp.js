import React from "react";
import AuthProvider, { useAuth } from "./AuthProvider";
import Login from "./components/Login";
import Register from "./components/Register";
import UserInfo from "./components/UserInfo";

const AuthApp = () => {
  const {
    user,
    view,
    handleLogin,
    handleRegister,
    handleLogout,
    handleSwitchToRegister,
    handleSwitchToLogin,
  } = useAuth();

  return (
    <div>
      {user ? (
        <UserInfo />
      ) : (
        <>
          {view === "register" && <Register />}
          {view === "login" && <Login />}
        </>
      )}
    </div>
  );
};

const AuthAppWrapper = () => (
  <AuthProvider>
    <AuthApp />
  </AuthProvider>
);

export default AuthAppWrapper;
