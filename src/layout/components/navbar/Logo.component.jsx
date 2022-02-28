import React from 'react';

function Logo({ hide }) {
  return (
    <div
      className="flex items-center justify-between  cursor-pointer bg-custom-main  h-24 pl-5"
      style={
        hide
          ? { width: '300px', background: '#1e1e2d' }
          : { width: '300px', background: '#151521' }
      }
    >
      <div className="flex items-center ">
        <img src="/icon/logo.svg" alt="" className="w-12 height-12 mr-2" />
        <div className="text-white">
          <span className="text-yellow-500">reliable</span>site
        </div>
      </div>

      {!hide && (
        <div className="hamburger mr-5">
          <img src="/icon/dashboard-hamburger.svg" alt="" />
        </div>
      )}
    </div>
  );
}

export default Logo;
