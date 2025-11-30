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

  useEffect(() => {
    if (transactions.length === 0) {
      dispatch(LoadTransactions({ token }));
    }
  }, []);

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
          >
            <h3>✨ Begin Your Journey ✨</h3>
            <p>Add your first transaction to get started!</p>

            <button
              className="add-first-btn"
              onClick={() => navigate("/add-transaction")}
            >
              ➕ Add Transaction
            </button>
          </motion.div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th style={{color : "white"}}>Date</th>
                <th style={{color : "white"}}>Type</th>
                <th style={{color : "white"}}>Category</th>
                <th style={{color : "white"}}>Amount</th>
                <th style={{color : "white"}}>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
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
        )}
      </div>
    </motion.div>
  );
};

export default Transaction;
