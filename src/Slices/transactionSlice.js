import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: null,
  transactionDataType: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction(state, action) {
      state.transactions = action.payload.transactionData;
      state.transactionDataType = action.payload.transactionDataType;
    },
    clearTransaction(state) {
      state.transactions = null;
      state.transactionDataType = null;
    },
  },
});

export const { setTransaction, clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
