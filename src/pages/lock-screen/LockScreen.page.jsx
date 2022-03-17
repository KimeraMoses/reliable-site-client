import React from 'react';

function LockScreen() {
  return (
    <div className="d-flex w-screen py-20 md:py-2 md:h-screen">
      <div className="col-md-6 my-auto px-5  md:p-20">
        <div style={{ maxWidth: '668px' }} className="mx-auto">
          <div className="">
            <img src="/icon/logo.svg" alt="" className="w-20 h-20" />
            <h3 className="text-4xl text-white font-normal mt-5">
              Lock Screen
            </h3>
            <p className=" mb-5 custom-text-light text-base border-dashed-bottom pb-5">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat.
            </p>
          </div>
          <div className="flex items-center mb-5">
            <div className=" mr-4">
              <img
                src="/icon/user.svg"
                alt="asa"
                className="h-24 w-24 rounded-ful"
              />{' '}
            </div>
            <div>
              <h3 className="text-sm text-white">Welcome back, Paul</h3>
              <p className=" text-base custom-text-light">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt.
              </p>
            </div>
          </div>
          <div className="col-md-8">
            <input
              type="email"
              className="w-full h-12 mb-3  bg-custom-secondary rounded-md text-gray-300 placeholder:text-gray-400 placeholder:text-sm px-3  placeholder:font-light"
              id="enterPassword"
              placeholder="Enter Password"
            />
            <button
              type="button"
              className="w-full h-12 custom-blue-bg ease-in duration-200 rounded-lg text-white bg-blue-500 hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="col d-none bg-custom-secondary d-md-flex items-center justify-center">
        <img src="/icon/lock-screen.svg" alt="" />
      </div>
    </div>
  );
}

export default LockScreen;
