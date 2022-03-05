import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  maintenance: false,
  message: null,
};
const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    checkMaintenancePending: (state) => {
      state.isLoading = true;
    },
    checkMaintenanceSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.maintenance = payload;
    },
    checkMaintenanceFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const {
  checkMaintenancePending,
  checkMaintenanceSuccess,
  checkMaintenanceFail,
} = actions;
export default reducer;
