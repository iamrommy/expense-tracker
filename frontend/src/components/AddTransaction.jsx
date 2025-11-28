import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";

export const AddTransaction = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      type,
      amount,
      category,
      date,
      description,
    };
    console.log("Transaction saved:", transactionData);

    // 🔗 Later → send to backend API
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="add-wrapper"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="add-title">Add Transaction</h2>

      <form className="add-form" onSubmit={handleSubmit}>
        <select
          className="add-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          className="add-input"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="add-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Salary</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          className="add-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <textarea
          className="add-input"
          placeholder="Description (Optional)"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="add-btn">
          Save Transaction ➕
        </button>
      </form>
    </motion.div>
  );
}

