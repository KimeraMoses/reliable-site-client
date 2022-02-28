/* eslint-disable no-unused-vars */
import React from 'react';
import Data from '../../db.json';

function SignIn() {
  return (
    <div>
      <div className="h-screen flex items-center ">
        <div className="w-screen flex items-center justify-center">
          <div className="col" style={{ maxWidth: '536px' }}>
            <div className="flex items-center justify-center mb-5">
              <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
            </div>
            <div
              className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-4 md:p-5"
              style={{ maxWidth: '536px' }}
            >
              <div className="text-center">
                <h2 className="text-md text-2xl text-white font-normal mb-2">
                  {Data.pages.login.title}
                </h2>
                <p className="custom-text-light">
                  New here?
                  <span className="text-blue-400 cursor-pointer">
                    &nbsp;Click Here&nbsp;
                  </span>
                  to create an account.
                </p>
              </div>
              <form>
                <div className="mt-4 mb-3">
                  <label
                    htmlFor="emailAddress"
                    className="form-label text-white font-light text-sm"
                  >
                    {Data.pages.login.username}
                  </label>
                  <input
                    type="email"
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
                    <span className="text-blue-400 font-light text-sm cursor-pointer">
                      {Data.pages.login.forgotPassword}
                    </span>
                  </div>
                  <input
                    type="password"
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
                    {Data.pages.login.loginButton}
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
