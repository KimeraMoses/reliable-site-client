import { Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserProfile,
  SaveTokenInLocalStorage,
} from "store/Actions/AuthActions";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import "./SignIn.css";
import { messageNotifications } from "store";
import {
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
} from "store/Slices/authSlice";
import { accountSuspended } from "store/Slices/settingSlice";
import Data from "../../db.json";
import Recaptcha from "pages/Google-Recaptcha/Recaptcha";
import { useCookies } from "react-cookie";

const initialValues = {
  email: "",
  password: "",
};

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email!"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
});

const fields = [
  { name: "email", label: "Email Address", placeholder: "paul@fakemail.com" },
  { name: "password", label: "Password", placeholder: "******" },
];

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cookies] = useCookies();
  const isTrustDevice = cookies.client_days? true: false
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecaptcha = useRef(null);
  let has2faEnabled = false;
  const login = (email, password,TrustDevice) => {
    return async (dispatch) => {
      dispatch(initAuthenticationPending());
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/tokens`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            TrustDevice,
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
        console.log(error)
        dispatch(initAuthenticationFail(error));
        if (error.exception === "User Not Found.") {
          setError("User Not found, Please check your credentials");
        }
        if (error.exception.includes("User Not Active")) {
          has2faEnabled = true;
          // localStorage.setItem("Client__Account-Suspended", true);
          dispatch(accountSuspended());
          navigate("/client/account-suspended");

          toast.error(
            "Account has been suspended, Please contact administration",
            {
              ...messageNotifications,
            }
          );
        }
        if (error.exception.includes("Provided Credentials are invalid.")) {
          has2faEnabled = true;
          toast.error(
            "Invalid Credentials, Please check your email or password",
            {
              ...messageNotifications,
            }
          );
        }
      }
      const res = await response.json();
      console.log(res)
      // localStorage.removeItem('Client__Account-Suspended');
      if (res.messages[0]) {
        has2faEnabled = true;
        navigate("/client/one-time-password");
        localStorage.setItem("userId__client", res.messages[1]);
        localStorage.setItem("userEmail__client", res.messages[2]);
        toast.success("Please verify otp to login", {
          ...messageNotifications,
        });
      }
      localStorage.removeItem("Client__Account-Suspended");
      dispatch(initAuthenticationSuccess(res.data));
      dispatch(getUserProfile(res.data.token));
      SaveTokenInLocalStorage(res.data);
    };
  };


  return (
    <div className="sign-in-page-wrapper">
      <div className="h-screen flex">
        <div className="w-screen flex justify-center pt-5">
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
                    <Link to="/client/sign-up">Click Here</Link>{" "}
                  </span>
                  to create an account.
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={SignInSchema}
                onSubmit={async (values, { resetForm }) => {
                  setIsLoading(true);      
                  try {
                    setError("");
                    await dispatch(
                      login(values.email, values.password, isTrustDevice)
                    );
                    resetForm();
                    toast.success("You have logged in successfuly", {
                      ...messageNotifications,
                    });
                    setIsLoading(false);
                  } catch (err) {
                    setIsLoading(false);
                    if (!has2faEnabled) {
                      toast.error("Failed to Login", {
                        ...messageNotifications,
                      });
                    }
                  }
                }}
              >
                {({ touched, errors }) => {
                  return (
                    <Form>
                      {fields?.map((field) => {
                        return (
                          <div className="mt-4 mb-3" key={field.name}>
                            <div className="flex justify-between">
                              <label
                                htmlFor={field?.name}
                                className="form-label text-white font-light text-sm"
                              >
                                {field?.label}
                              </label>
                              {field.name === "password" && (
                                <Link
                                  to="/client/forgot-password"
                                  className="text-blue-400 font-light text-sm cursor-pointer"
                                >
                                  {Data.pages.login.forgotPassword}
                                </Link>
                              )}
                            </div>
                            <Field
                              type={
                                field?.name === "password" ? "password" : "text"
                              }
                              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
                              id={field?.name}
                              placeholder={field?.placeholder}
                              name={field?.name}
                            />
                            {errors[field?.name] && touched[field?.name] && (
                              <span className="text-red-600 text-sm">
                                {errors[field?.name]}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      <div className="mt-4 md:mt-5 ">
                        <Recaptcha refRecaptcha={refRecaptcha} />
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 ease-in duration-200 text-white w-full mb-2 rounded-md h-14"
                        >
                          {isLoading
                            ? "Logging in..."
                            : Data.pages.login.loginButton}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
