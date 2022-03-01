import React from 'react';
import { useMediaQuery } from 'react-responsive';

function UserTop() {
  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  return (
    <div className="flex items-center cursor-pointer mr-4">
      <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1">
        <img src="/icon/user.svg" alt="" className="h-full w-full" />
      </div>
      {!lessThanDesktop && (
        <>
          <div className="text-base mx-3">
            <h3 className="text-white text-base mb-0">Paul Elliot</h3>
            <p className="text-gray-400 mb-0">Paul.dsada@fdf.com</p>
          </div>
          <div className="h-12 w-12 bg-gray-700 flex items-center justify-center rounded-lg">
            <img src="/icon/arrow-down.svg" alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default UserTop;
