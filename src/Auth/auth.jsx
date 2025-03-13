import React, { useState } from "react";

const auth = () => {
  const [state, setstate] = useState("login");
  return state === "login" ? (
    <Login setstate={setstate} />
  ) ? state === "signup" : (
    <Signin setstate={setstate} />
  )? state === "forgetpass" : (
    <ForgetPass setstate={setstate} />
  ): null;
};

export default auth;
