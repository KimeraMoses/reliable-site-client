import {
  authenticationFail,
  authenticationPending,
  authenticationSuccess,
  autoAuthenticationSuccess,
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
  logout,
} from "store/Slices/authSlice";
import {
  UserRegistrationFail,
  UserRegistrationPending,
  UserRegistrationSuccess,
} from "store/Slices/userRegistrationSlice";

// const AuthHeaders=(props)=>{

//   return {
//     "Content-type": "application/json",
//      Authorization: "Bearer " + token,
//     `${token? 'gen':'admin'}-api-key`: token? process.env.REACT_APP_GEN_APIKEY: process.env.REACT_APP_ADMIN_APIKEY,
//     "tenant": "admin"
//   }
// }

export const login = (userName, password) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens`,
      {
        method: "POST",
        body: JSON.stringify({
          userName,
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
      console.log("Login Error", error);
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    console.log("Login", res);
    dispatch(initAuthenticationSuccess(res.data));
    dispatch(getUserProfile(res.data.token));
    localStorage.setItem("AuthToken", JSON.stringify(res.data));

    // SaveTokenInLocalStorage(dispatch, data);
  };
};

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
          Authorization: "Bearer " + token,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      dispatch(authenticationFail(error));
    }
    const res = await response.json();
    console.log(res);
    dispatch(
      authenticationSuccess({
        user: res.data,
      })
    );

    SaveTokenInLocalStorage(dispatch, res.data);
  };
};

//   export const UpdateRole = (role, user_id, AuthToken) => {
//     return async (dispatch) => {
//       dispatch(updateUserRolePending());
//       const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/users/updateUserRole`, {
//         method: "POST",
//         body: JSON.stringify({
//           role,
//           user_id,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           Authorization: "Bearer " + AuthToken,
//         }),
//       });
//       if (!response.ok) {
//         const error = await response.json();
//         let message = "";
//         if (error.message === "user not found") {
//           message =
//             "User not found, Please double check your credentials and try again";
//         } else if (error.error.statusCode === 500) {
//           message = "Role verification failed";
//         } else {
//           message =
//             "Failed to update user role, Please check your connection and try again";
//         }
//         dispatch(updateUserRoleFail(message));
//       }
//       const data = await response.json();
//       dispatch(updateUserRoleSuccess(data));
//     };
//   };

export const signup = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  // companyName,
  address1,
  address2,
  city,
  state_Region,
  zipCode,
  country
  // phoneNumber,
) => {
  return async (dispatch) => {
    dispatch(UserRegistrationPending());
    console.log("Working...");
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/register-user`,
      {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          // companyName,
          address1,
          address2,
          city,
          state_Region,
          zipCode,
          country,
          // phoneNumber,
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

// export const updateProfile = (
//   first_name,
//   last_name,
//   phone_number,
//   AuthToken
// ) => {
//   return async (dispatch) => {
//     dispatch(updateProfilePending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/users/updateMe`,
//       {
//         method: "PATCH",
//         body: JSON.stringify({
//           first_name,
//           last_name,
//           phone_number,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           Authorization: "Bearer " + AuthToken,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(updateProfileFail(error));
//     }
//     const UserData = await response.json();
//     dispatch(updateProfileSuccess(UserData));
//     localStorage.setItem("CurrentUser", JSON.stringify(UserData.data.user));
//   };
// };

// export const forgotPassword = (email) => {
//   return async (dispatch) => {
//     dispatch(forgotPasswordPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/users/forgotPassword`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//         }),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(forgotPasswordFail(error));
//     }
//     const data = await response.json();
//     dispatch(forgotPasswordSuccess(data));
//   };
// };
// export const RequestAccountVerification = (email) => {
//   return async (dispatch) => {
//     dispatch(requestVerificationPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/users/requestAccountVerification`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//         }),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(requestVerificationFail(error));
//     }
//     const data = await response.json();
//     dispatch(requestVerificationSuccess(data));
//   };
// };
// export const VerifyAccount = (verificationToken) => {
//   return async (dispatch) => {
//     dispatch(verificationPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/users/verifyAccount/${verificationToken}`,
//       {
//         method: "PATCH",
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(verificationFail(error));
//     }
//     const data = await response.json();
//     dispatch(
//       verificationSuccess({
//         data,
//         user: data.user,
//         token: data.token,
//       })
//     );
//     SaveTokenInLocalStorage(dispatch, data);
//   };
// };
// export const passwordReset = (password, pwdResetToken) => {
//   return async (dispatch) => {
//     dispatch(UpdatePasswordPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/users/resetPassword/${pwdResetToken}`,
//       {
//         method: "PATCH",
//         body: JSON.stringify({
//           password,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(UpdatePasswordFail(error));
//     }
//     const data = await response.json();
//     dispatch(UpdatePasswordSuccess(data));
//   };
// };

// export const validateToken = (Token) => {
//   return async (dispatch) => {
//     // dispatch(validateTokenPending())
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/users/validate`,
//       {
//         method: "GET",
//         headers: new Headers({
//           Authorization: "Bearer " + Token,
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       // dispatch(logout());
//       console.log("auto auth", error);
//     }
//     const data = await response.json();
//     console.log("auto auth", data);
//     // dispatch(autoAuthenticationSuccess(CurrentUser));
//   };
// };

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  // logOutTimer(dispatch, userDetails.expiresIn);
  // let AuthTokenDetails = {
  //   token: userDetails.token,
  //   expiresIn: userDetails.expiresIn,
  //   expirationtime: userDetails.expirationtime,
  // };
  // localStorage.setItem("AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails));
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const CurrentUser = localStorage.getItem("CurrentUser");
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  let expireDate = new Date(UserToken.refreshTokenExpiryTime);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  let data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  // validateToken(UserToken)
  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};
