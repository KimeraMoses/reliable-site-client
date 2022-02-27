import React from 'react';
import Data from '../../db.json';

function UnderMaintenance() {
  return (
    <div className="d-flex h-screen">
      <div className="col-md-6 my-auto p-10 md:p-20">
        <img
          src="/icon/logo.svg"
          alt={Data.pages.accountSuspended.title}
          className="w-20 h-20"
        />
        <h3 className="text-4xl text-white mt-5">
          {Data.pages.underMaintenance.title}
        </h3>
        <p className="custom-text-light text-base mb-5 pb-5 border-dashed-bottom">
          {Data.pages.underMaintenance.description}
        </p>
        <div className="countdown text-4xl text-white">
          <span>00</span> : <span>06</span> : <span>30</span> : <span>30</span>
        </div>
      </div>
      <div className="col bg-custom-secondary flex align-items-center justify-content">
        <img src="/icon/under-maintenance.svg" alt="" className="mx-auto" />
      </div>
    </div>
  );
}

export default UnderMaintenance;
