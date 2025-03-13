import { useState } from 'react';

export default function useVisible() {
  const [showModel, setShowModel] = useState(null);

 
  const updateModel = (value) => {
    if (value === "login" || value === "signup" ||value === "resetcode" || value === "forgetPass"|| value === null) {
      setShowModel(value);
    } 
  };

  return [showModel, updateModel];
}
