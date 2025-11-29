import { motion } from "framer-motion";
import "./EditTransaction.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEditTransaction } from "../redux/slices/transactionsSlice";
import { EditTransactions } from "../services/operations/transactionAPI";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { editTransaction, transactions } = useSelector((state) => state.transactions);
  const { token } = useSelector((state) => state.user);

  // ---------------------------------------
  // Convert dd/mm/yyyy → yyyy-mm-dd (for input)
  // ---------------------------------------
  const toInputDate = (d) => {
    if (!d) return "";
    const [dd, mm, yyyy] = d.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };

  // ---------------------------------------
  // Convert yyyy-mm-dd → dd/mm/yyyy (store in redux)
  // ---------------------------------------
  const fromInputDate = (d) => {
    const [yyyy, mm, dd] = d.split("-");
    return `${dd}/${mm}/${yyyy}`;
  };

  // ---------------------------------------
  // Handle input changes
  // ---------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for date input
    if (name === "date") {
      return dispatch(
        setEditTransaction({
          ...editTransaction,
          date: fromInputDate(value), // store as dd/mm/yyyy
        })
      );
    }

    dispatch(
      setEditTransaction({
        ...editTransaction,
        [name]: value,
      })
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log("Updated Transaction:", editTransaction);

    dispatch(
      EditTransactions(id, token, editTransaction, transactions, navigate)
    )

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
        
        {/* Type */}
        <select
          name="type"
          className="edit-input"
          value={editTransaction.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          name="amount"
          className="edit-input"
          value={editTransaction.amount}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <select
          name="category"
          className="edit-input"
          value={editTransaction.category}
          onChange={handleChange}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Salary</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          className="edit-input"
          value={toInputDate(editTransaction.date)}  // convert here
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          className="edit-input"
          rows="3"
          value={editTransaction.description}
          onChange={handleChange}
        ></textarea>

        {/* Save button */}
        <button type="submit" className="save-btn">
          Save Changes ✔
        </button>
      </form>
    </motion.div>
  );
};

export default EditTransaction;
