import {
  authenticationFail,
  authenticationPending,
  authenticationSuccess,
  autoAuthenticationSuccess,
  confirmOtpFail,
  confirmOtpPending,
  confirmOtpSuccess,
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
  logout,
  resetPasswordFail,
  resetPasswordPending,
  resetPasswordSuccess,
  verificationFail,
  verificationPending,
  verificationSuccess,
} from "store/Slices/authSlice";
import {
  accountSuspended,
  checkMaintenanceFail,
  checkMaintenancePending,
  checkMaintenanceSuccess,
} from "store/Slices/settingSlice";
import {
  UserRegistrationFail,
  UserRegistrationPending,
  UserRegistrationSuccess,
} from "store/Slices/userRegistrationSlice";

export const getUserProfile = (token) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/profile`,
      {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: "admin",
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(authenticationFail(error));
    }
    const res = await response.json();
    dispatch(
      authenticationSuccess({
        user: res.data,
      })
    );

    SaveTokenInLocalStorage(dispatch, res.data);
  };
};

export const login = (email, userName, password) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens`,
      {
        method: "POST",
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "admin-api-key": process.env.REACT_APP_ADMIN_APIKEY,
          tenant: "admin",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    dispatch(initAuthenticationSuccess(res.data));
    dispatch(getUserProfile(res.data.token));
    localStorage.setItem("AuthToken", JSON.stringify(res.data));
  };
};

export const loginbyOtp = (email, userName, otpCode) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens/gettokenbyotp`,
      {
        method: "POST",
        body: JSON.stringify({
          userName,
          email,
          otpCode,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: "admin",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    dispatch(initAuthenticationSuccess(res.data));
    dispatch(getUserProfile(res.data.token));
    localStorage.setItem("AuthToken", JSON.stringify(res.data));
  };
};

export const signup = (
  FullName,
  userName,
  email,
  password,
  confirmPassword,
  companyName,
  address1,
  address2,
  city,
  state_Region,
  zipCode,
  country,
  brandId,
  IpAddress,
  parentID
) => {
  return async (dispatch) => {
    dispatch(UserRegistrationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/register-client-user`,
      {
        method: "POST",
        body: JSON.stringify({
          FullName,
          userName,
          email,
          password,
          confirmPassword,
          companyName,
          address1,
          address2,
          city,
          state_Region,
          zipCode,
          country,
          brandId,
          IpAddress,
          parentID,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "admin-api-key": process.env.REACT_APP_ADMIN_APIKEY,
          tenant: "admin",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      let message = "";
      if (error.message === "Email already in use") {
        message = "Account with the same email already exits";
      } else {
        message =
          "Failed to create account, Please check your connection and try again";
      }
      dispatch(UserRegistrationFail(message));
      console.log(error);
    }
    const data = await response.json();
    dispatch(UserRegistrationSuccess(data));
    console.log(data);
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(forgotPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/forgot-password`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: "admin",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(forgotPasswordFail(error));
    }
    const data = await response.json();
    dispatch(forgotPasswordSuccess(data));
  };
};

export const passwordReset = (email, password, confirmPassword, token) => {
  return async (dispatch) => {
    dispatch(resetPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/reset-password`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          token,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          tenant: "admin",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(resetPasswordFail(error));
    }
    const data = await response.json();
    dispatch(resetPasswordSuccess(data));
  };
};

export const validateEmailToken = (userId, code) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(
      `${
        process.env.REACT_APP_BASEURL
      }/api/identity/confirm-email?userId=${userId}&code=${code.trim()}&tenant=admin`,
      {
        method: "GET",
        headers: new Headers({
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(verificationFail(error));
    }
    const data = await response.json();
    dispatch(verificationSuccess(data));
  };
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const CurrentUser = localStorage.getItem("CurrentUser");
  const suspended = localStorage.getItem("Account-Suspended");

  if (!!suspended) {
    dispatch(accountSuspended());
  }
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  const expireDate = new Date(UserToken.refreshTokenExpiryTime);
  const todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  const data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  dispatch(autoAuthenticationSuccess(data));
};

export const maintenanceStatus = (token) => {
  return async (dispatch) => {
    dispatch(checkMaintenancePending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/v1/admin/admin/maintenancemode`,
      {
        method: "GET",
        headers: new Headers({
          "admin-api-key": process.env.REACT_APP_ADMIN_APIKEY,
          tenant: "admin",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(checkMaintenanceFail(error));
    }

    const res = await response.json();
    dispatch(checkMaintenanceSuccess(res));
  };
};

export const confirmOtp = (userId, otp) => {
  return async (dispatch) => {
    dispatch(confirmOtpPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          otp,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "admin-api-key": process.env.REACT_APP_ADMIN_APIKEY,
          tenant: "admin",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(confirmOtpFail(error));
    }

    const res = await response.json();
    dispatch(confirmOtpSuccess(res));
  };
};

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails));
};
