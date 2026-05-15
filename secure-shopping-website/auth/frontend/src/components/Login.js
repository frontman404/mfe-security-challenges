import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import styles from "./login.module.scss";

const Login = () => {
  const { handleLogin, handleSwitchToRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <p className={styles.registerLink}>
        Don't have an account?{" "}
        <a href="#" onClick={handleSwitchToRegister}>
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
