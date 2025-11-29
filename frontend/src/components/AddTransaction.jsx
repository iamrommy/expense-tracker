import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./AddTransaction.css";
import { AddTransactions } from "../services/operations/transactionAPI";

export const AddTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);
  const { transactions } = useSelector((state) => state.transactions);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [currency, setCurrency] = useState("INR");

  // const getTodayDate = () => {
  //   const today = new Date();
  //   return today.toISOString().split("T")[0];
  // };

  // const [date, setDate] = useState(getTodayDate());

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      type,
      amount: Number(amount),
      category,
      // date,
      description,
      paymentMethod,
      currency
    };

    dispatch(
      AddTransactions({
        ...transactionData,
        navigate,
        transactions,
        token,
      })
    );
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
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="add-input"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>

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
{/* 
        <input
          type="date"
          className="add-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        /> */}

        <select
          className="add-input"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
        </select>

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
};
