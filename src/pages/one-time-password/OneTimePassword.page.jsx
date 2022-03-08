import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { confirmOtp, loginbyOtp } from "store/Actions/AuthActions";
import Data from "../../db.json";

function OneTimePassword() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { value } = event.target;
    setOtp(value);
    setError("");
  };

  const OtpHandler = async (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("userId");
    let userEmail = localStorage.getItem("userEmail");
    setIsLoading(true);
    if (otp.length < 1) {
      return setError("Pleasee enter OTP recieved on your email");
    }
    try {
      await dispatch(confirmOtp(userId, otp));
      toast.success("Otp verified Successfully", {...messageNotifications});
      setOtp("");
      setIsLoading(false);
      dispatch(loginbyOtp(userEmail, userEmail, otp));
    } catch (err) {
      toast.error("Failed to Verify OTP", {...messageNotifications});
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: "536px" }}>
        <div className="flex items-center justify-center mb-5">
          <Link to="/">
            <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
          </Link>
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
          <div className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.otp.header}
            </h2>
            <p className="custom-text-light">{Data.pages.otp.subTitle}</p>
          </div>
          <form onSubmit={OtpHandler}>
            <div className="mt-4 md:mb-8">
              <label
                htmlFor="otp"
                className="form-label text-white font-light text-sm"
              >
                {Data.pages.otp.header}
              </label>

              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleChange}
                className="w-full h-12 bg-custom-main rounded-md h-14 placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3  placeholder:font-light focus:outline-none "
                id="otp"
                placeholder={Data.pages.otp.placeholder}
              />
            </div>

            <div className="flex mt-4 md:mt-5">
              <button
                type="button"
                onClick={() => navigate("/client/sign-in")}
                className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
              >
                {Data.pages.otp.cancelButton}
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
              >
                {isLoading ? "Verifying..." : Data.pages.otp.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OneTimePassword;
