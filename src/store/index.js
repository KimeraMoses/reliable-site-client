import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import regReducer from "./Slices/userRegistrationSlice";
import settingReducer from "./Slices/settingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer,
    settings: settingReducer
  },
});

export default store;
