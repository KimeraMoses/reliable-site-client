import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import UserName from "./UserProfileCard/UserName";
import "./UserTop.css";

function UserTop() {
  const {user, isLoggedIn} = useSelector((state) => state.auth);
  const lessThanDesktop = useMediaQuery({
    query: "(max-width: 900px)",
  });
  let userName = "";
  if (isLoggedIn) {
    userName = user.firstName + " " + user.lastName;
  }
  return (
    <div className="flex items-center cursor-pointer mr-4">
      <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName">
        {user && user.imageUrl && user.imageUrl.length > 0 ? (
          <img src={user && user.imageUrl} alt={user && user.userName} className="h-full w-full" />
        ) : (
          <UserName />
        )}
      </div>
      {!lessThanDesktop && (
        <>
          <div className="text-base mx-3">
            <h3 className="text-white text-base mb-0">{userName}</h3>
            <p className="text-gray-400 mb-0">{user && user.email}</p>
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
