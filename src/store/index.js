import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import regReducer from "./Slices/userRegistrationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer
  },
});

export default store;
