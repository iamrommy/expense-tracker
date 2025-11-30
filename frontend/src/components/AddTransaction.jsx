import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddTransactions } from "../services/operations/transactionAPI";

const getTodayDate = () => new Date().toISOString().split("T")[0];

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

    if (!amount || Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const transactionData = {
      type,
      amount: Number(amount),
      category,
      date,
      description: description.trim(),
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

  const expenseCategories = ["Food", "Transport", "Shopping", "Entertainment", "Other"];
  const incomeCategories = ["Salary", "Bonus", "Investment", "Other"];

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
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "14px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
          height : "min-content"
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

        <form
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          onSubmit={handleSubmit}
        >
          {/* TYPE */}
          <select
            style={selectStyle}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income" style={{ color: "black" }}>Income</option>
            <option value="expense" style={{ color: "black" }}>Expense</option>
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
            <option value="INR" style={{ color: "black" }}>INR</option>
            <option value="USD" style={{ color: "black" }}>USD</option>
            <option value="EUR" style={{ color: "black" }}>EUR</option>
            <option value="GBP" style={{ color: "black" }}>GBP</option>
          </select>

          {/* CATEGORY */}
          <select
            style={selectStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {(type === "expense" ? expenseCategories : incomeCategories).map((c) => (
              <option key={c} value={c} style={{ color: "black" }}>
                {c}
              </option>
            ))}
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
            <option value="cash" style={{ color: "black" }}>Cash</option>
            <option value="upi" style={{ color: "black" }}>UPI</option>
            <option value="card" style={{ color: "black" }}>Card</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            style={{ ...inputStyle, height: "90px", resize: "none" }}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* SUBMIT */}
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
  background: "rgba(255,255,255,0.1)",
  color: "white",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};
