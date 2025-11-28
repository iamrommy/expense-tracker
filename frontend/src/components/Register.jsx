import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../services/operations/authAPI";
import './Register.css';
import { useDispatch } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("Register Data:", { username, email, password });

    dispatch(
      Signup({
        username,
        email,
        password,
        navigate
      })
    );
      
  };

  return (
    <motion.div
      className="register-wrapper"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="register-title"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Create Account ✨
      </motion.h2>

      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className="register-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-btn">
          Register
        </button>

        <p className="register-footer">
          Already have an account?
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
export default Register