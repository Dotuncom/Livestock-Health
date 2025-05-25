//src/modals/InputField.jsx
// components/InputField.js
import React from "react";

const InputField = ({ icon: Icon, placeholder, type = "text", name }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
      {Icon && <Icon className="w-5 h-5 text-gray-400 mr-2" />}
      <input
        className="w-full outline-none bg-transparent text-sm"
        type={type}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
