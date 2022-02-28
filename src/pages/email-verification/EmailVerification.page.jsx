import React from 'react';
// import {Link} from 'react-router-dom'
import Data from '../../db.json';

function EmailVerification() {
  return (
    <div className="h-screen w-full flex  items-center justify-content-center">
      <div className="col " style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="bg-custom-secondary  col mx-4 md:mx-auto  rounded-lg p-4 md:p-5">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.emailVerification.title}
            </h2>
            <p className="custom-text-light">
              {Data.pages.emailVerification.subTitle}
            </p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 ease-in duration-200 mt-4 w-full h-12 rounded-md text-white font-light"
            >
              {Data.pages.emailVerification.verifyBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
