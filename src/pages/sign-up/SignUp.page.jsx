/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Data from '../../db.json';
// import {Link} from 'react-router-dom'

function SignUp() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailaddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateProv, setStateProv] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const registerErrorsOb = {
    username: '',
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    address1: '',
    address2: '',
    city: '',
    stateProv: '',
    country: '',
    zipCode: '',
    ipAddress: '',
  };
  const [errors, setErrors] = useState(registerErrorsOb);

  const registerForm = (e) => {
    e.preventDefault();
    let error = false;
    const registerErrorsObject = { ...registerErrorsOb };
    if (username === '') {
      registerErrorsObject.username = 'Please Enter Username';
      error = true;
    }
    if (fullName === '') {
      registerErrorsObject.fullName = 'Please Enter Full Name';
      error = true;
    }
    if (emailAddress === '') {
      registerErrorsObject.emailAddress = 'Enter Email';
      error = true;
    }
    if (password === '') {
      registerErrorsObject.password = 'Please Enter Password';
      error = true;
    }
    if (confirmPassword !== password) {
      registerErrorsObject.confirmPassword = 'Password Should Match';
      error = true;
    }
    if (address1 === '') {
      registerErrorsObject.address1 = 'Please Enter Address 1 ';
      error = true;
    }
    if (address2 === '') {
      registerErrorsObject.address2 = 'Please Enter Address 2';
      error = true;
    }
    if (city === '') {
      registerErrorsObject.city = 'Please Enter City ';
      error = true;
    }
    if (stateProv === '') {
      registerErrorsObject.stateProv = 'Please Enter State ';
      error = true;
    }
    if (country === '') {
      registerErrorsObject.country = 'Please Enter Country ';
      error = true;
    }
    if (stateProv === '') {
      registerErrorsObject.stateProv = 'Please Enter State ';
      error = true;
    }
    if (zipCode === '') {
      registerErrorsObject.zipCode = 'Please Enter Zip Code ';
      error = true;
    }
    if (ipAddress === '') {
      registerErrorsObject.ipAddress = 'Please Enter Status ';
      error = true;
    }

    setErrors(registerErrorsObject);
    if (!error) {
      console.log('form submitted');
    }
  };

  return (
    <div className="w-screen mx-auto my-5 " style={{ maxWidth: '536px' }}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              value={emailAddress}
              onChange={(e) => setEmailaddress(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
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
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                value={stateProv}
                onChange={(e) => setStateProv(e.target.value)}
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
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
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
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            {errors.ipAddress && (
              <span className="text-red-600 mt-2 flex">{errors.ipAddress}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
          >
            {Data.pages.register.createAccountBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
