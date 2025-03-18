import React from "react";
import Cookies from "js-cookie";

export default function Profile() {
  
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  console.log(user);

  return (
    <div className="flex flex-col items-center p-4 my-2">
        <img src="/user.png" alt="User" className="w-28 h-28 rounded-full mb-4" />
      <p className="text-2xl font-bold">My Profile</p>
      {user ? <h2>Welcome {user.name}</h2> : <p>No user found</p>}
      <p><span className="font-semibold">your email:</span> {user?.email}</p>
    </div>
  );
}


