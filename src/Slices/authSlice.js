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
      state.userData = action.payload.response;
      localStorage.setItem('authStatus',"true")
      console.log(action.payload.response.name);
      localStorage.setItem('authName',action.payload.response.name)
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