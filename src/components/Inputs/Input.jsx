import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, placeholder, type = "text", value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm text-gray-700 mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition pr-10"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition"
          >
            {showPassword ? (
              <FaRegEyeSlash size={18} />
            ) : (
              <FaRegEye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;