import React from 'react';

function UserTop() {
  return (
    <div className="flex items-center cursor-pointer">
      <div className="h-12 w-12 border-yellow-500 ">
        <img src="/icon/user.svg" alt="" className="h-full w-full" />
      </div>
      <div className="text-base mx-3">
        <h3 className="text-white text-base mb-0">Paul Elliot</h3>
        <p className="text-gray-400 mb-0">Paul.dsada@fdf.com</p>
      </div>
      <div className="h-12 w-12 bg-gray-700 flex items-center justify-center rounded-lg">
        <img src="/icon/arrow-down.svg" alt="" />
      </div>
    </div>
  );
}

export default UserTop;
