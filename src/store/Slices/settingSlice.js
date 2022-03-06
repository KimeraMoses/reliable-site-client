import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  maintenance: false,
  is2faEnabled: false,
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
      state.maintenance = payload.isMaintenanceOn;
    },
    checkMaintenanceFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    check2FAuthPending: (state)=>{
        state.isLoading = true;
    },
    check2FAuthSuccess: (state, {payload})=>{
        state.isLoading = false;
        state.is2faEnabled = payload.is2faEnabled
    },
    check2FAuthFail: (state, {payload})=>{
        state.isLoading= false;
        state.message = payload
    }

  },
});

const { reducer, actions } = settingSlice;

export const {
  checkMaintenancePending,
  checkMaintenanceSuccess,
  checkMaintenanceFail,
  check2FAuthPending,
  check2FAuthSuccess,
  check2FAuthFail
} = actions;
export default reducer;
