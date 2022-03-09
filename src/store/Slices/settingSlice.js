import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  maintenance: false,
  suspended: false,
  message: null,
};
const settingSlice = createSlice({
  name: 'settings',
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
    accountSuspended: (state) => {
      state.suspended = true;
    },
  },
});

const { reducer, actions } = settingSlice;

export const {
  checkMaintenancePending,
  checkMaintenanceSuccess,
  checkMaintenanceFail,
  accountSuspended,
} = actions;
export default reducer;
