import React, { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import { colors } from "@/app/constants/colors";

interface ColorPickerProps {
  attribute: string;
  label: string;
  currentColor: string;
  handleAttributeChange: (attribute: string, value: any) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  attribute,
  label,
  currentColor,
  handleAttributeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={attribute}
        className="text-sm font-semibold text-gray-300"
      >
        {label}
      </label>

      <div className="flex flex-wrap gap-1 p-1">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              style={{ background: currentColor }}
              className="w-6 h-6 rounded-md cursor-pointer"
            />
            <span className="text-gray-300">{currentColor}</span>
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-[240px] rounded-lg bg-gray-800 border border-gray-600 shadow-lg">
              <div className="flex flex-col">
                <div className="flex justify-between items-center p-2 border-b border-gray-700">
                  <button className="text-xs font-medium text-gray-300">
                    🎨
                  </button>
                  <button className="text-xs font-medium text-gray-300">
                    ⚡️
                  </button>
                </div>
                <div className="p-4">
                  <ChromePicker
                    color={currentColor}
                    onChange={(color) =>
                      handleAttributeChange(attribute, color.hex)
                    }
                    styles={{
                      default: {
                        picker: { background: "#2D3748", color: "#E2E8F0" },
                      },
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-1 p-2 border-t border-gray-700">
                  {colors.map((color) => (
                    <div
                      key={color}
                      style={{ background: color }}
                      className="w-6 h-6 rounded-md cursor-pointer hover:scale-105 active:scale-95"
                      onClick={() => {
                        handleAttributeChange(attribute, color);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
