"use client";

import React from "react";

interface InputFieldProps {
  attribute: string;
  label: string;
  currentValue: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  attribute,
  label,
  currentValue,
  handleAttributeChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleAttributeChange(attribute, value);
  };

  return (
    <div className="flex flex-col items-start">
      {/* Optional label */}
      <label
        htmlFor={attribute}
        className="text-sm font-semibold text-gray-300 mb-1"
      >
        {label}
      </label>

      <input
        type="text"
        id={attribute}
        placeholder="Enter text"
        value={currentValue}
        onChange={handleInputChange}
        className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
      />
    </div>
  );
};

export default InputField;
