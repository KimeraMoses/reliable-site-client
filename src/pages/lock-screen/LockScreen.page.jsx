import UserName from "layout/components/navbar/UserProfileCard/UserName";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserProfile,
  SaveTokenInLocalStorage,
} from "store/Actions/AuthActions";
import { useCookies } from "react-cookie";
import { messageNotifications } from "store";
import {
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
} from "store/Slices/authSlice";
import { accountSuspended, closeLockScreen } from "store/Slices/settingSlice";
import "../../layout/components/navbar/UserTop.css";

function LockScreen() {
  const user = useSelector((state) => state.auth.user);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies();
  const isTrustDevice = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  let has2faEnabled = false;
  const login = (email, password, TrustDevice) => {
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
        dispatch(initAuthenticationFail(error));
        if (error.exception.includes("User Not Active")) {
          has2faEnabled = true;
          localStorage.setItem("Client__Account-Suspended", true);
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
          toast.error("Invalid Credentials, Please enter correct password", {
            ...messageNotifications,
          });
        }
      }
      const res = await response.json();
      if (res.messages[0]) {
        has2faEnabled = true;
        dispatch(closeLockScreen());
        navigate("/client/one-time-password");
        localStorage.setItem("userId__client", res.messages[1]);
        localStorage.setItem("userEmail__client", res.messages[2]);
        return toast.success("Please verify otp to login", {
          ...messageNotifications,
        });
      }
      localStorage.removeItem("Client__Account-Suspended");
      dispatch(initAuthenticationSuccess(res.data));
      dispatch(closeLockScreen());
      dispatch(getUserProfile(res.data.token));
      SaveTokenInLocalStorage(res.data);
    };
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userEmail = user && user.email;
    try {
      await dispatch(login(userEmail, password, isTrustDevice));
      toast.success("You have logged in successfuly", {
        ...messageNotifications,
      });
      setIsLoading(false);
      setPassword("");
    } catch (err) {
      setIsLoading(false);
      if (!has2faEnabled) {
        toast.error("Failed to Login", {
          ...messageNotifications,
        });
      }
    }
  };

  return (
    <div className="d-flex w-screen py-20 md:py-2 md:h-screen">
      <div className="col-md-6 my-auto px-5  md:p-20">
        <div style={{ maxWidth: "668px" }} className="mx-auto">
          <div className="">
            <img src="/icon/logo.svg" alt="" className="w-20 h-20" />
            <h3 className="text-4xl text-white font-normal mt-5">
              Lock Screen
            </h3>
            <p className=" mb-5 custom-text-light text-base border-dashed-bottom pb-5">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat.
            </p>
          </div>
          <div className="flex mb-5">
            <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-2 userName mr-4">
              {user && user.imageUrl && user.imageUrl.length > 0 ? (
                <img
                  src={user && user.imageUrl}
                  alt={user && user.userName}
                  className="h-full w-full"
                />
              ) : (
                <UserName />
              )}
            </div>
            <div>
              <h3 className="text-sm text-white">
                Welcome back, {user && user.fullName}
              </h3>
              <p className=" text-base custom-text-light">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt.
              </p>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={LoginHandler}>
              <input
                type="password"
                name="password"
                onChange={onChangeHandler}
                className="w-full h-12 mb-3  bg-custom-secondary rounded-md text-gray-300 placeholder:text-gray-400 placeholder:text-sm px-3  placeholder:font-light"
                id="enterPassword"
                placeholder="Enter Password"
              />
              <button
                type="submit"
                disabled={password.length < 6}
                className="w-full h-12 custom-blue-bg ease-in duration-200 rounded-lg text-white bg-blue-500 hover:bg-blue-700"
              >
                {isLoading ? "Logging In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col d-none bg-custom-secondary d-md-flex items-center justify-center">
        <img src="/icon/lock-screen.svg" alt="" />
      </div>
    </div>
  );
}

export default LockScreen;
