import { motion } from "framer-motion";
import "./Transaction.css";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { LoadTransactions } from "../services/operations/transactionAPI";
import { setEditTransaction } from "../redux/slices/transactionsSlice";

const Transaction = () => {
  const {transactions}  = useSelector((state)=>state.transactions)
  const {token}  = useSelector((state)=>state.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  useEffect(()=>{
    if(transactions.length === 0){
      dispatch(
        LoadTransactions({ token }
      ))
    }
  },[])

  const handleEditOnClick = (txn)=>{

    dispatch(setEditTransaction(txn));

    navigate(`/edit-transaction/${txn?.transactionId}`);
  }

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
              <th>Amount</th>
              <th>Action</th>
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
                  <button className="edit-btn" onClick={()=>handleEditOnClick(txn)}>Edit</button>
                  <button className="delete-btn">
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
