import { Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfile } from "store/Actions/AuthActions";
import Data from "../../db.json";
import "./SignIn.css";
import { messageNotifications } from "store";
import {
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
} from "store/Slices/authSlice";
import { accountSuspended } from "store/Slices/settingSlice";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setError("");
  };
  let has2faEnabled = false;
  const login = (email, userName, password) => {
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
        if(error.exception ==="User Not Found."){
          setError("User Not found, Please check your credentials")
        }
        // console.log("Login error", error);
        if (error.exception.includes("User Not Active")) {
          has2faEnabled = true;
          localStorage.setItem("Account-Suspended", true);
          dispatch(accountSuspended());
          navigate("/client/account-suspended");

          toast.error(
            "Account has been suspended, Please contact administration",
            {
              ...messageNotifications,
            }
          );
        }
        dispatch(initAuthenticationFail(error));
      }
      const res = await response.json();
      // console.log("login data", res);
      if (res.messages[0]) {
        has2faEnabled = true;
        navigate("/client/one-time-password");
        localStorage.setItem("userId", res.messages[1]);
        localStorage.setItem("userEmail", res.messages[2]);
        toast.success("Please verify otp to login", {
          ...messageNotifications,
        });
      }
      localStorage.removeItem("Account-Suspended");
      dispatch(initAuthenticationSuccess(res.data));
      dispatch(getUserProfile(res.data.token));
      localStorage.setItem("AuthToken", JSON.stringify(res.data));
    };
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (values.password.length < 6) {
      return setError("Password must be atleast 6 characters");
    }

    try {
      setError("");
      await dispatch(login(values.email, values.email, values.password));
      setValues({ password: "", username: "" });
      toast.success("You have logged in successfuly", {
        ...messageNotifications,
      });
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      if (!has2faEnabled) {
        toast.error("Failed to Login", {
          ...messageNotifications,
        });
      }
    }
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="h-screen flex items-center ">
        <div className="w-screen flex items-center justify-center">
          <div className="col" style={{ maxWidth: "536px" }}>
            <div className="flex items-center justify-center mb-5">
              <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
            </div>
            <div
              className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-4 md:p-5"
              style={{ maxWidth: "536px" }}
            >
              <div className="text-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="text-md text-2xl text-white font-normal mb-2">
                  {Data.pages.login.title}
                </h2>
                <p className="custom-text-light">
                  New here?{" "}
                  <span className="text-blue-400">
                    <Link to="/client/sign-up?brandId=2341">Click Here</Link>{" "}
                  </span>
                  to create an account.
                </p>
              </div>
              <form onSubmit={LoginHandler}>
                <div className="mt-4 mb-3">
                  <label
                    htmlFor="emailAddress"
                    className="form-label text-white font-light text-sm"
                  >
                    {Data.pages.login.username}
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full h-12 bg-custom-main rounded-md text-gray-300 placeholder:text-gray-400 placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
                    id="emailAddress"
                    placeholder={Data.pages.login.placeholder}
                  />
                </div>
                <div className="md:mb-8">
                  <div className="flex justify-between">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label text-white font-light text-sm"
                    >
                      {Data.pages.login.password}
                    </label>
                    <Link
                      to="/client/forgot-password"
                      className="text-blue-400 font-light text-sm cursor-pointer"
                    >
                      {Data.pages.login.forgotPassword}
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full h-14 bg-custom-main rounded-md text-gray-300 placeholder:text-gray-300 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                    id="exampleInputPassword1"
                    placeholder="**********"
                  />
                </div>
                <div className="mt-4 md:mt-5 ">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 ease-in duration-200 text-white w-full mb-2 rounded-md h-14"
                  >
                    {isLoading ? "Logging in..." : Data.pages.login.loginButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
