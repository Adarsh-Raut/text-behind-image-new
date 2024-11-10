"use client";

import React from "react";

interface SliderFieldProps {
  attribute: string;
  label: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  handleAttributeChange: (attribute: string, value: number) => void;
}

const SliderField: React.FC<SliderFieldProps> = ({
  attribute,
  label,
  min,
  max,
  step,
  currentValue,
  handleAttributeChange,
}) => {
  const handleSliderInputFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    handleAttributeChange(attribute, value);
  };

  return (
    <div className="flex flex-col items-start justify-between mt-8">
      {/* Label and Input Field */}
      <div className="flex items-center justify-between w-full">
        <label
          htmlFor={attribute}
          className="text-sm font-semibold text-gray-300"
        >
          {label}
        </label>
        <input
          type="number"
          value={currentValue}
          onChange={handleSliderInputFieldChange}
          className="w-16 rounded-md bg-gray-700 border border-gray-600 px-2 py-1 text-center text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={min}
          max={max}
          step={step}
        />
      </div>

      {/* Slider */}
      <input
        type="range"
        id={attribute}
        min={min}
        max={max}
        value={currentValue}
        step={step}
        onChange={(e) =>
          handleAttributeChange(attribute, parseFloat(e.target.value))
        }
        className="w-full h-2 mt-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
        }}
        aria-label={label}
      />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        input[type="range"]:focus {
          outline: none;
        }

        input[type="range"]:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }

        input[type="range"]:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default SliderField;
