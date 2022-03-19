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
  fetchSettingsFail,
  fetchSettingsPending,
  fetchSettingsSuccess,
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
    localStorage.setItem("CurrentUser__client", JSON.stringify(res.data));
  };
};

export const SaveTokenInLocalStorage = (TokenDetails) => {
  // logOutTimer(dispatch, TokenDetails.refreshTokenExpiryTime);
  localStorage.setItem("AuthToken__client", JSON.stringify(TokenDetails));
};

export const loginbyOtp = (email, otpCode) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens/gettokenbyotp`,
      {
        method: "POST",
        body: JSON.stringify({
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
    SaveTokenInLocalStorage(res.data);
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
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
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
    }
    const data = await response.json();
    dispatch(UserRegistrationSuccess(data));
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
          tenant: "admin",
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

export const maintenanceStatus = () => {
  return async (dispatch) => {
    dispatch(checkMaintenancePending());
    const response = await fetch(
      `https://myreliablesite.m2mbeta.com/admin/api/maintenance/maintenancemode`,
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

export const trustedDays = () => {
  return async (dispatch) => {
    dispatch(fetchSettingsPending());
    const response = await fetch(
      `https://myreliablesite.m2mbeta.com/admin/api/v1/admin/settings/getsettingswithtenant/admin`,
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
      dispatch(fetchSettingsFail(error));
    }

    const res = await response.json();
    dispatch(fetchSettingsSuccess(res.data));
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
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
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
    const userEmail = localStorage.getItem("userEmail__client");
    dispatch(loginbyOtp(userEmail, otp));
  };
};

export const disableConfirmOtp = (userId, otp, isRemember) => {
  return async (dispatch) => {
    dispatch(confirmOtpPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/removetwofactorauthentication`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          otp,
          isRemember,
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
      dispatch(confirmOtpFail(error));
    }

    const res = await response.json();
    dispatch(confirmOtpSuccess(res));
    const userEmail = localStorage.getItem("userEmail__client");
    dispatch(loginbyOtp(userEmail, otp));
  };
};

// export const VerifyRecaptha = (reCaptchaToken) => {
//   return async (dispatch) => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BASEURL}/api/identity/verifyrecaptcha`,
//         {
//           method: "POST",
//           body: JSON.stringify({
//             reCaptchaToken,
//           }),
//           headers: new Headers({
//             "Content-type": "application/json",
//           }),
//         }
//       );
//       // const data = await res.json();
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//     }
//   };
// };

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken__client");
  const CurrentUser = localStorage.getItem("CurrentUser__client");
  const suspended = localStorage.getItem("Client__Account-Suspended");

  if (suspended) {
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

  // const timer = expireDate.getTime() - todaysDate.getTime();
  // logOutTimer(dispatch, timer);
};
