import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
// import { handleLogout } from "../../Redux Toolkit/slices/auth";
import { handleLogout } from "../Redux Toolkit/slices/auth";
import { useDispatch } from "react-redux";

export default function DropdowenMenu({ setShowModel }) {
  const dispatch = useDispatch();
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowModel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="bg-white flex flex-col overflow-hidden  rounded-xl rounded-tr-none space-y-2 shadow-xl pt-4 absolute z-[999]  top-[20px] max-[635px]:right-0 right-4 min-w-[150px] "
      ref={dropdownRef}
   >
      <div className="">
        {user ? <h2 className="font-semibold p-2">{user.name}</h2> : <p>No user found</p>}

        <Link
          to="/profile"
          onClick={() => {
            setTimeout(() => setShowModel(null), 100); 
          }}
          className="block  hover:bg-gray-100 transition-all duration-300 p-2"
        >
          Profile
        </Link>

        <button
          className="cursor-pointer text-start hover:bg-gray-100 transition-all duration-300 p-2 w-full "
          onClick={() => {
            dispatch(handleLogout());
            setShowModel(null);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
