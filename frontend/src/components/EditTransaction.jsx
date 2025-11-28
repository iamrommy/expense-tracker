import { useState } from "react";
import { motion } from "framer-motion";
import { 
  // useParams,
   useNavigate } from "react-router-dom";
import "./EditTransaction.css";

const EditTransaction = () => {
  const navigate = useNavigate();
  // const { id } = useParams();

  // Dummy initial data (later from DB)
  const existingData = {
    type: "expense",
    amount: 2000,
    category: "Food",
    date: "2025-01-10",
    description: "Lunch with friends",
  };

  const [transaction, setTransaction] = useState(existingData);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Transaction:", transaction);

    // 🔗 Later: Update backend data via API
    navigate("/transactions");
  };

  return (
    <motion.div
      className="edit-wrapper"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="edit-title">Edit Transaction ✏️</h2>

      <form className="edit-form" onSubmit={handleUpdate}>
        <select
          name="type"
          className="edit-input"
          value={transaction.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          name="amount"
          className="edit-input"
          value={transaction.amount}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="edit-input"
          value={transaction.category}
          onChange={handleChange}
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
          name="date"
          className="edit-input"
          value={transaction.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="edit-input"
          rows="3"
          value={transaction.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="save-btn">
          Save Changes ✔
        </button>
      </form>
    </motion.div>
  );
};

export default EditTransaction;
