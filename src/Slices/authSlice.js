import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.userData = action.payload;
      localStorage.setItem('authStatus',"true")
      console.log(" Store action.payload.response",action.payload.response);
      console.log(" Store action.payload",action.payload);
      console.log(" Store action.payload?.name",action.payload?.name);
      localStorage.setItem('authName',action.payload?.name)
    },
    logout(state) {
      state.status - false;
      state.userData = null;
      localStorage.removeItem('authStatus')
      localStorage.removeItem('authName')
    },
  },
});

export const {logout,login}=authSlice.actions
export default authSlice.reducer