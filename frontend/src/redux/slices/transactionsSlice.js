import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: localStorage.getItem("transactions")
    ? JSON.parse(localStorage.getItem("transactions"))
    : [],
  editTransaction: {},
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    setEditTransaction(state, action) {
      state.editTransaction = action.payload;
    },
  },
});

export const { setTransactions, setEditTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
