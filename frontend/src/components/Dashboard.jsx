import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ()=> {
  const [income] = useState(50000); // later from backend
  const [expense] = useState(20000); // later from backend
  const balance = income - expense;

  return (
    <motion.div
      className="dash-wrapper"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="dash-title"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Dashboard 📊
      </motion.h2>

      <div className="dash-cards">
        <motion.div
          className="dash-card income"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Income</h3>
          <p>₹{income}</p>
        </motion.div>

        <motion.div
          className="dash-card expense"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Expense</h3>
          <p>₹{expense}</p>
        </motion.div>

        <motion.div
          className="dash-card balance"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </motion.div>
      </div>

      <motion.div
        className="dash-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <Link to="/add-transaction" className="dash-btn add-btn">
          Add Transaction ➕
        </Link>
        <Link to="/reports" className="dash-btn report-btn">
          View Reports 📈
        </Link>
        <Link to="/transactions" className="dash-btn history-btn">
            View Transaction History 📄
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
