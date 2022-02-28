import React from 'react';
import Data from '../../db.json';

function AccountSuspended() {
  return (
    <div className="d-flex h-screen">
      <div className="col-md-6 my-auto p-10 md:p-20">
        <div>
          <img
            src="/icon/logo.svg"
            alt={Data.pages.accountSuspended.title}
            className="w-20 h-20"
          />
          <h3 className="text-4xl text-white font-normal mt-5">
            {Data.pages.accountSuspended.title}
          </h3>
          <p className=" mb-5 custom-text-light text-base border-dashed-bottom pb-5">
            {Data.pages.accountSuspended.description1}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-white">
            {Data.pages.accountSuspended.subTitle}
          </h3>
          <p className="mb-5 text-base custom-text-light">
            {Data.pages.accountSuspended.description2}
          </p>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 ease-in duration-200 py-3 px-20 rounded-lg text-white"
          >
            {Data.pages.accountSuspended.btnSupport}
          </button>
        </div>
      </div>
      <div className="col d-none bg-custom-secondary d-md-flex items-center justify-center">
        <img
          src="/icon/account-suspended.svg"
          alt={Data.pages.accountSuspended.title}
        />
      </div>
    </div>
  );
}

export default AccountSuspended;
