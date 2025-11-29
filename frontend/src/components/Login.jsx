import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Login Submitted", { email, password });

    dispatch(
      login({
        email: email?.toLowerCase(),
        password,
        navigate
      })
    );

  };

  return (
   
        <motion.div
      className="login-wrapper"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="login-title"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Welcome Back!
      </motion.h2>

    
        <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="login-link">
            Register
          </Link>
        </p>
      </form>
      
    </motion.div>
   
  );
}

export default Login;
