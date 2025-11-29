import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
  },
});
