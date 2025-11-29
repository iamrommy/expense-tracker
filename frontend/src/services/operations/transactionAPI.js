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
