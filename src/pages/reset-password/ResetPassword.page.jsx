import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { passwordReset } from "store/Actions/AuthActions";
import Data from "../../db.json";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const token = query.get("resetToken");

  const [error, setError] = useState("");
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => {
    setError("");
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const passwordResetSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let userEmail = localStorage.getItem("userEmail");
    if (values.password.length < 6) {
      return setError("Password must be atleast 6 characters");
    }
    if (values.confirmPassword.length < 1) {
      return setError("Please confirm new password");
    }
    if (values.password !== values.confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      await dispatch(
        passwordReset(userEmail, values.password, values.confirmPassword, token)
      );
      setIsLoading(false);
      setValues({ values: "" });
      navigate("/client/sign-in");
      toast.success("Password changed successfully", {
        ...messageNotifications,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to reset Password", { ...messageNotifications });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: "536px" }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
          <div className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.resetPassword.title}
            </h2>
            <p className="custom-text-light">
              {Data.pages.resetPassword.subTitle}
            </p>
          </div>
          <form onSubmit={passwordResetSubmitHandler}>
            <div className="mt-4 md:mb-8">
              <label
                htmlFor="password"
                className="form-label text-white font-light text-sm"
              >
                {Data.pages.resetPassword.password}
              </label>
              <input
                type="password"
                className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                id="exampleInputPassword1"
                placeholder="**********"
                name="password"
                value={values.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4 md:mb-8">
              <label
                htmlFor="confirmPassword"
                className="form-label text-white font-light text-sm"
              >
                {Data.pages.resetPassword.confirmPassword}
              </label>
              <input
                type="password"
                className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                id="exampleInputPassword1"
                placeholder="**********"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex mt-4 md:mt-5">
              <button
                type="button"
                onClick={() => navigate("/client/sign-in")}
                className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
              >
                {Data.pages.resetPassword.cancelBtn}
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
              >
                {isLoading
                  ? "Resetting..."
                  : Data.pages.resetPassword.submitBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
