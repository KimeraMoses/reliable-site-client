import React from 'react';
// import {Link} from 'react-router-dom'
import Data from '../../db.json';

function OneTimePassword() {
  const loginHandler = () => {
    console.log('form submitted ');
  };

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.otp.header}
            </h2>
            <p className="custom-text-light">{Data.pages.otp.subTitle}</p>
          </div>
          <form onSubmit={loginHandler}>
            <div className="mt-4 md:mb-8">
              <label
                htmlFor="otp"
                className="form-label text-white font-light text-sm"
              >
                {Data.pages.otp.header}
              </label>
              <input
                type="text"
                className="w-full h-12 bg-custom-main rounded-md h-14 placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3  placeholder:font-light focus:outline-none "
                id="otp"
                placeholder={Data.pages.otp.placeholder}
              />
            </div>

            <div className="flex mt-4 md:mt-5 ">
              <button
                type="submit"
                className="bg-blue-900/[.3] w-full mb-2 rounded-md h-14 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
              >
                {Data.pages.otp.cancelButton}
              </button>
              <button
                type="submit"
                className="custom-blue-bg w-full h-12 rounded-md h-14 text-white font-light ml-2 hover:bg-sky-600/[.8] ease-in duration-200"
              >
                {Data.pages.otp.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OneTimePassword;
