import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  status: "",
  message: null,
  updateStatus: "",
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    autoAuthenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationPending(state) {
      state.isLoading = true;
    },
    authenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    verificationPending(state) {
      state.isLoading = true;
    },
    verificationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    verificationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    updateUserRolePending(state) {
      state.isLoading = true;
    },
    updateUserRoleSuccess(state) {
      state.isLoading = false;
    },
    updateUserRoleFail(state, {payload}) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },

    updateProfilePending(state) {
      state.isLoading = true;
    },
    updateProfileSuccess(state, { payload }) {
      state.user = payload.data.user;
      state.isLoading = false;
    },
    updateProfileFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    UpdateUserCourseUnitsPending(state) {
      state.isLoading = true;
    },
    UpdateUserCourseUnitsSuccess(state, { payload }) {
      state.isLoading = false;
      state.user = payload.user;
    },
    UpdateUserCourseUnitsFail(state, { payload }) {
      state.isLoading = false;
      state.updateStatus = payload.sucess;
    },
    logout(state) {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("CurrentUser");
    },
  },
});
const { reducer, actions } = authSlice;

export const {
  autoAuthenticationSuccess,
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  verificationPending,
  verificationSuccess,
  verificationFail,
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFail,
  UpdateUserCourseUnitsPending,
  UpdateUserCourseUnitsSuccess,
  UpdateUserCourseUnitsFail,
  updateUserRolePending,
  updateUserRoleSuccess,
  updateUserRoleFail,
  logout,
} = actions;

export default reducer;
