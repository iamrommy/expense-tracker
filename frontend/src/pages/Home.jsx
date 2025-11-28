import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  return (
    <motion.div
      className="home-wrapper"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="home-title"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        💰 Personal Expense Tracker
      </motion.h1>

      <motion.p
        className="home-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Track your income & expenses smartly. Stay financially aware!
      </motion.p>

      <motion.div
        className="home-btn-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/login" className="home-btn login-btn">
          Login
        </Link>
        <Link to="/register" className="home-btn register-btn">
          Register
        </Link>
      </motion.div>

      <motion.div
        className="home-img-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/8676/8676890.png"
          alt="Expense Tracker"
          className="home-img"
        />
      </motion.div>
    </motion.div>
  );
}

export default Home;
