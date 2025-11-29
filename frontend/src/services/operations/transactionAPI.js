import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setTransactions } from "../../redux/slices/transactionsSlice";

const { TRANSACTIONS_API } = endpoints;

export function AddTransactions({
  type,
  amount,
  category,
  date,
  description,
  paymentMethod,
  currency,
  navigate,
  transactions,
  token,
}) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "POST",
        TRANSACTIONS_API,
        {
          type,
          amount,
          category,
          date,
          description,
          paymentMethod,
          currency
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

    //   console.log("TRANSACTION API RESPONSE:", response);

      if (response.status !== 200) {
        throw new Error("Transaction Failed")
      }

      toast.success("Transaction Added Successfully");

      
      if(transactions?.length > 0){
          dispatch(setTransactions([response.data, ...transactions]));
          localStorage.setItem("transactions", JSON.stringify([response.data, ...transactions]));
      }
      else{
          dispatch(setTransactions([response.data]));
          localStorage.setItem("transactions", JSON.stringify([response.data]));
      }

      navigate("/transactions");
    } catch (error) {
    //   console.log("TRANSACTION API ERROR:", error);
      toast.error("Transaction Failed");
    }

    toast.dismiss(toastId);
  };
}

export function LoadTransactions({token}) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading Transactions...");

    try {
      const response = await apiConnector(
        "GET",
        TRANSACTIONS_API, {},
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("Load Transanctions API RESPONSE:", response);

      if (response.status !== 200) {
        throw new Error("Loading Transactions Failed")
      }

      // toast.success("Transactions Loaded");

      dispatch(setTransactions(response?.data));
      localStorage.setItem("transactions", JSON.stringify(response?.data));

    } catch (error) {
    //   console.log("TRANSACTION API ERROR:", error);
      toast.error("Error Loading Transactions");
    }

    toast.dismiss(toastId);
  };
}

export function EditTransactions(id, token, transaction, transactions, navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Saving Changes...");

    try {
      const response = await apiConnector(
        "PUT",
        `${TRANSACTIONS_API}/${id}`, transaction,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("Edit Transanctions API RESPONSE:", response);

      if (response.status !== 200) {
        throw new Error("Editing Transaction Failed")
      }

      toast.success("Transaction Saved Succesfully");

      const updatedTransaction = response?.data;
      const updatedTransactions = transactions.map((t) =>
        t.transactionId === updatedTransaction.transactionId
          ? updatedTransaction
          : t
      );

      dispatch(setTransactions(updatedTransactions));
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

      navigate("/transactions")

    } catch (error) {
      console.log("EDIT TRANSACTION API ERROR:", error);
      toast.error("Error Editing Transactions");
    }

    toast.dismiss(toastId);
  };
}
