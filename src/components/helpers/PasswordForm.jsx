import { useState } from "react";
import { LuEyeOff, LuEye } from "react-icons/lu";
const PasswordForm = ({
  labelName,
  name,
  value,
  onChange,
  onBlur,
  condition,
  errorMessage,
  PasswordLight,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between gap-1 text-sm font-medium">
        <label htmlFor={name} className="block font-semibold mb-2">
          {labelName}
        </label>
        {condition && (
          <p className="text-red-500 bg-red-200 px-2 rounded text-sm">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="• • • • • • • • •"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full border border-gray-300 trans p-2 rounded ${
            condition
              ? "border-red-600 focus:border-red-600"
              : "focus:border-gray-600"
          }`}
        />
        {PasswordLight > 0 && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className=" absolute top-1/2 -translate-y-1/2 right-2 bg-white p-2"
          >
            {showPassword && <LuEyeOff />}
            {!showPassword && <LuEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
