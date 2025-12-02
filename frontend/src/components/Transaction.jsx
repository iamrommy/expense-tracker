import { motion } from "framer-motion";
import "./Transaction.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteTransactions, LoadTransactions } from "../services/operations/transactionAPI";
import { setEditTransaction } from "../redux/slices/transactionsSlice";

const Transaction = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  // sorted list
  const [sortedTransactions, setSortedTransactions] = useState([]);

  // toggle state
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  useEffect(() => {
    if (transactions.length === 0) {
      dispatch(LoadTransactions({ token }));
    } else {
      setSortedTransactions(transactions);
    }
  }, [transactions]);

  const handleEditOnClick = (txn) => {
    dispatch(setEditTransaction(txn));
    navigate(`/edit-transaction/${txn?.transactionId}`);
  };

  const handleDeleteOnClick = (txn) => {
    setIsDisabled(true);

    dispatch(
      DeleteTransactions(
        txn?.transactionId,
        token,
        txn,
        transactions,
        () => setIsDisabled(false)
      )
    );
  };

  // Toggle sorting both directions
  const handleSortToggle = () => {
    const sorted = [...sortedTransactions].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

    setSortedTransactions(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

        {transactions.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{marginBottom :"20px", }}
          >
            <h3>✨ Begin Your Journey ✨</h3>
            <p>Add your first transaction to get started!</p>
            <div>
               <button
              className="add-first-btn"
              onClick={() => navigate("/add-transaction")}
            >
              ➕ Add Transaction
            </button>

            </div>
           
          </motion.div>
        ) : (
          <>
            {/* UI Better: controls row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                alignItems: "center",

              }}
            >
              <button
                className="add-first-btn"
                style={{marginRight : "30px"}}
                onClick={() => navigate("/add-transaction")}
              >
                ➕ New Transaction
              </button>

              <button
                className="add-first-btn"
                onClick={handleSortToggle}
              >
                {sortOrder === "asc"
                  ? "🔽 Sort by Date (ASC)"
                  : "🔼 Sort by Date (DESC)"}
              </button>
            </div>

            <table className="history-table">
              <thead>
                <tr>
                  <th style={{ color: "white" }}>Date</th>
                  <th style={{ color: "white" }}>Type</th>
                  <th style={{ color: "white" }}>Category</th>
                  <th style={{ color: "white" }}>Amount</th>
                  <th style={{ color: "white" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedTransactions.map((txn) => (
                  <tr key={txn?.id}>
                    <td>{txn?.date}</td>
                    <td className={txn?.type?.toLowerCase()}>{txn?.type}</td>
                    <td>{txn?.category}</td>
                    <td>₹{txn?.amount}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditOnClick(txn)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteOnClick(txn)}
                        disabled={isDisabled}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Transaction;
