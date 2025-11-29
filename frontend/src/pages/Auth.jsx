import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.css";

function Auth() {
  return (
    <motion.div
      className="auth-wrapper"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="auth-title"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        💰 Personal Expense Tracker
      </motion.h1>

      <motion.p
        className="auth-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Track your income & expenses smartly. Stay financially aware!
      </motion.p>

      <motion.div
        className="auth-btn-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/login" className="auth-btn login-btn">
          Login
        </Link>
        <Link to="/register" className="auth-btn register-btn">
          Register
        </Link>
      </motion.div>

      <motion.div
        className="auth-img-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/8676/8676890.png"
          alt="Expense Tracker"
          className="auth-img"
        />
      </motion.div>
    </motion.div>
  );
}

export default Auth;
