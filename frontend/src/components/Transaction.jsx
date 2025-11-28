import { useState } from "react";
import { motion } from "framer-motion";
import "./Transaction.css";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  // Dummy Data (replace with backend data later)
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Expense", category: "Food", amount: 250, date: "2025-03-01" },
    { id: 2, type: "Income", category: "Salary", amount: 50000, date: "2025-03-05" },
    { id: 3, type: "Expense", category: "Transport", amount: 120, date: "2025-03-06" },
  ]);
  const navigate=useNavigate();
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <motion.div
      className="history-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="history-title">Transaction History 📄</h2>

      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount (₹)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.date}</td>
                <td className={txn.type.toLowerCase()}>{txn.type}</td>
                <td>{txn.category}</td>
                <td>₹{txn.amount}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/edit-transaction/${txn.id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(txn.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </motion.div>
  );
};

export default Transaction;
