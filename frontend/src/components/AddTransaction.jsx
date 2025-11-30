import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddTransactions } from "../services/operations/transactionAPI";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const formatDate = (isoDate) => {
  const [yyyy, mm, dd] = isoDate.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

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
  const [date, setDate] = useState(getTodayDate());

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      type,
      amount: Number(amount),
      category,
      date: formatDate(date),
      description,
      paymentMethod,
      currency,
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
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          width: "450px",
          padding: "25px",
          height : "fit-content",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          backdropFilter: "blur(6px)",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "cadetblue",
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          Add Transaction
        </h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "12px" }} onSubmit={handleSubmit}>
          
          {/* TYPE */}
          <select
            style={selectStyle}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* AMOUNT */}
          <input
            style={inputStyle}
            type="number"
            placeholder="Amount"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* CURRENCY */}
          <select
            style={selectStyle}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          {/* CATEGORY */}
          <select
            style={selectStyle}
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

          {/* DATE */}
          <input
            style={inputStyle}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* PAYMENT METHOD */}
          <select
            style={selectStyle}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            style={{ ...inputStyle, height: "80px", resize: "none" }}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            style={{
              padding: "12px",
              background: "cadetblue",
              color: "white",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            Save Transaction ➕
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(255,255,255,0.09)",
  color: "white",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};
