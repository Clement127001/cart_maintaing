import { createReducer, createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isCartVisible: false,
    notification: null,
  },
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    sendNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        titile: action.payload.action,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
