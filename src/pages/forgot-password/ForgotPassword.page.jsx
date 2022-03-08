import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { forgotPassword } from "store/Actions/AuthActions";
import Data from "../../db.json";

function ForgotPassword() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading]=useState(false)
  const [values, setValues] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    if (name === "email") {
      setError("");
    }
    setError("");
  };

  const passwordResetHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    if (values.email.length < 1) {
      return setError("A valid email is required to reset password");
    }
    if (values.email !== "undefined") {
      setError("");
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(values.email)) {
        return setError("Please enter valid email address.");
      }
    }
    try {
      setError("");
      await dispatch(forgotPassword(values.email));
      localStorage.setItem("userEmail", values.email)
      setValues({ email: "" });
      toast.success("A Link has been sent to your email to reset password", {
        ...messageNotifications,
      });
      navigate('/reset-password')
      setIsLoading(false)
    } catch (err) {
      toast.error("Failed to reset Password", { ...messageNotifications });
      setIsLoading(false)
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: "536px" }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8 ">
          <div className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.forgotPassword.title}
            </h2>
            <p className="custom-text-light">
              {Data.pages.forgotPassword.subTitle}
            </p>
          </div>
          <form onSubmit={passwordResetHandler}>
            <div className="mt-4 md:mb-8">
              <label
                htmlFor="forgotPassword"
                className="form-label text-white font-light text-sm"
              >
                {Data.pages.forgotPassword.emailAddress}
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full h-12 bg-custom-main rounded-md h-14 placeholder:text-gray-400 text-gray-400 focus:outline-none placeholder:text-sm px-3  placeholder:font-light"
                id="forgotPassword"
                placeholder={Data.pages.forgotPassword.placeholder}
              />
            </div>
            <div className="flex mt-4 md:mt-5">
              <button
                type="button"
                className="bg-blue-900/[.3] w-full mb-2 rounded-md h-14 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
                onClick={() => navigate("/client/sign-in")}
              >
                {Data.pages.forgotPassword.cancelBtn}
              </button>
              <button
                type="submit"
                className="custom-blue-bg w-full h-12 rounded-md h-14 text-white font-light ml-2 hover:bg-sky-600/[.8] ease-in duration-200"
              >
                {isLoading? "Sending...": Data.pages.forgotPassword.submitBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
