import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../Slices/authSlice";
import transactionReducers from "../Slices/transactionSlice";

const store = configureStore({
  reducer:{
    auth: authReducers,
    transaction: transactionReducers,
  }
});

export default store;
