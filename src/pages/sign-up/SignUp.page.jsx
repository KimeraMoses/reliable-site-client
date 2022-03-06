import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "store/Actions/AuthActions";
import Data from "../../db.json";
// import {Link} from 'react-router-dom'

function SignUp() {
  const isLoading = useSelector((state) => state.reg.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    stateProv: "",
    zipCode: "",
    ipAddress: "",
  });

  const registerErrorsOb = {
    username: "",
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    stateProv: "",
    country: "",
    zipCode: "",
    ipAddress: "",
  };
  const [errors, setErrors] = useState(registerErrorsOb);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const registerForm = async (e) => {
    e.preventDefault();
    let error = false;
    const registerErrorsObject = { ...registerErrorsOb };
    if (values.username === "") {
      registerErrorsObject.username = "Please Enter Username";
      error = true;
    }
    if (values.fullName === "") {
      registerErrorsObject.fullName = "Please Enter Full Name";
      error = true;
    }
    if (values.emailAddress === "") {
      registerErrorsObject.emailAddress = "Enter Email";
      error = true;
    }
    if (values.password === "") {
      registerErrorsObject.password = "Please Enter Password";
      error = true;
    }
    if (values.confirmPassword !== values.password) {
      registerErrorsObject.confirmPassword = "Password Should Match";
      error = true;
    }
    if (values.address1 === "") {
      registerErrorsObject.address1 = "Please Enter Address 1 ";
      error = true;
    }
    if (values.address2 === "") {
      registerErrorsObject.address2 = "Please Enter Address 2";
      error = true;
    }
    if (values.city === "") {
      registerErrorsObject.city = "Please Enter City ";
      error = true;
    }
    if (values.stateProv === "") {
      registerErrorsObject.stateProv = "Please Enter State ";
      error = true;
    }
    if (values.country === "") {
      registerErrorsObject.country = "Please Enter Country ";
      error = true;
    }
    if (values.stateProv === "") {
      registerErrorsObject.stateProv = "Please Enter State ";
      error = true;
    }
    if (values.zipCode === "") {
      registerErrorsObject.zipCode = "Please Enter Zip Code ";
      error = true;
    }
    if (values.ipAddress === "") {
      registerErrorsObject.ipAddress = "Please Enter Status ";
      error = true;
    }
    setErrors(registerErrorsObject);
    try {
      setErrors("");
      console.log("reached!!");
      await dispatch(
        signup(
          values.username,
          values.fullName,
          values.emailAddress,
          values.password,
          values.confirmPassword,
          "comapnyname",
          values.address1,
          values.address2,
          values.city,
          values.stateProv,
          values.zipCode,
          values.country,
          "1234",
          "0759130054",
          "73749201",
          "available"
        )
      );
      setValues({
        username: "",
        fullName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        address1: "",
        address2: "",
        city: "",
        stateProv: "",
        zipCode: "",
        ipAddress: "",
      });
      navigate("/client/sign-in");
      toast.success("Account Created Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Failed to create account", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-screen mx-auto my-5 " style={{ maxWidth: "536px" }}>
      <div className="col mx-4 md:mx-auto mb-5">
        <img src="/icon/logo.svg" className="h-20 w-20 mx-auto" alt="" />
      </div>
      <div className=" bg-custom-secondary rounded-lg p-4 md:p-5 ">
        <div className="text-center">
          <h2 className="text-md text-2xl text-white font-normal">
            Create An Account
          </h2>
          <p className="custom-text-light mb-4">
            Fill The Form Below In Order To Create Your Account
          </p>
        </div>
        <form onSubmit={registerForm}>
          <div className="mt-4 mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white font-light text-sm"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400   placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
              id="exampleInputEmail1"
              placeholder="Paul Elliott"
              value={values.username}
              name="username"
              onChange={handleChange}
            />
            {errors.username && (
              <span className="text-red-600 mt-2 flex">{errors.username}</span>
            )}
          </div>
          <div className="mt-4 mb-3">
            <label
              htmlFor="fullName"
              className="form-label text-white font-light text-sm"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
              id="fullName"
              placeholder="Paul Elliott"
              value={values.fullName}
              name="fullName"
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="text-red-600 mt-2 flex">{errors.fullName}</span>
            )}
          </div>
          <div className="mt-4 mb-3">
            <label
              htmlFor="fullName"
              className="form-label text-white font-light text-sm"
            >
              Email address
            </label>
            <input
              type="email"
              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
              id="fullName"
              placeholder="Paul.Elliott@fakemail.com"
              value={values.emailAddress}
              name="emailAddress"
              onChange={handleChange}
            />
            {errors.emailAddress && (
              <span className="text-red-600 mt-2 flex">
                {errors.emailAddress}
              </span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-white font-light text-sm"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="exampleInputPassword1"
              placeholder="**********"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-600 mt-2 flex">{errors.password}</span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="confirmPassword"
                className="form-label text-white font-light text-sm"
              >
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="confirmPassword"
              placeholder="**********"
              value={values.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 mt-2 flex">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="address1"
                className="form-label text-white font-light text-sm"
              >
                Address 1
              </label>
            </div>
            <input
              type="text"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="address1"
              placeholder="8546 West Philmont Rd"
              value={values.address1}
              name="address1"
              onChange={handleChange}
            />
            {errors.address1 && (
              <span className="text-red-600 mt-2 flex">{errors.address1}</span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="address2"
                className="form-label text-white font-light text-sm"
              >
                Address 2
              </label>
            </div>
            <input
              type="text"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="address2"
              placeholder="Brooklyn"
              value={values.address2}
              name="address2"
              onChange={handleChange}
            />
            {errors.address2 && (
              <span className="text-red-600 mt-2 flex">{errors.address2}</span>
            )}
          </div>
          <div className="flex justify-between mb-8">
            <div className="mr-2">
              <label
                htmlFor="city"
                className="form-label text-white font-light text-sm"
              >
                City
              </label>
              <input
                type="text"
                className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                id="city"
                placeholder="New York"
                value={values.city}
                name="city"
                onChange={handleChange}
              />
              {errors.city && (
                <span className="text-red-600 mt-2 flex">{errors.city}</span>
              )}
            </div>
            <div className="ml-2">
              <label
                htmlFor="city"
                className="form-label text-white font-light text-sm"
              >
                State
              </label>
              <input
                type="text"
                className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                id="state"
                placeholder="NY"
                value={values.stateProv}
                name="stateProv"
                onChange={handleChange}
              />
              {errors.stateProv && (
                <span className="text-red-600 mt-2 flex">
                  {errors.stateProv}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="mr-2">
              <label
                htmlFor="country"
                className="form-label text-white font-light text-sm"
              >
                Country
              </label>
              <input
                type="text"
                className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                id="country"
                placeholder="United States of America"
                value={values.country}
                name="country"
                onChange={handleChange}
              />
              {errors.country && (
                <span className="text-red-600 mt-2 flex">{errors.country}</span>
              )}
            </div>
            <div className="ml-2">
              <label
                htmlFor="city"
                className="form-label text-white font-light text-sm"
              >
                ZIP Code
              </label>
              <input
                type="number"
                className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
                id="zipCode"
                placeholder="11216"
                value={values.zipCode}
                name="zipCode"
                onChange={handleChange}
              />
              {errors.zipCode && (
                <span className="text-red-600 mt-2 flex">{errors.zipCode}</span>
              )}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="ipAddress"
                className="form-label text-white font-light text-sm"
              >
                IP Address
              </label>
            </div>
            <input
              type="text"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="ipAddress"
              placeholder="253.205.121.39"
              value={values.ipAddress}
              name="ipAddress"
              onChange={handleChange}
            />
            {errors.ipAddress && (
              <span className="text-red-600 mt-2 flex">{errors.ipAddress}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
          >
            {isLoading
              ? "Creating account..."
              : Data.pages.register.createAccountBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
