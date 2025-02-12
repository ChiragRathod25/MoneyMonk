import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../Slices/authSlice";

const store = configureStore({
  reducer:{
    auth: authReducers,
  }
});

export default store;
