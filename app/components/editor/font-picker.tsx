"use client";

import React, { useState, useRef, useEffect } from "react";
import { fonts } from "@/app/constants/fonts";

interface FontFamilyPickerProps {
  attribute: string;
  currentFont: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const FontFamilyPicker: React.FC<FontFamilyPickerProps> = ({
  attribute,
  currentFont,
  handleAttributeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredFonts = fonts.filter((font) =>
    font.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

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
    <div className="flex flex-col items-start justify-start my-8">
      <label className="text-sm font-medium text-gray-300" htmlFor={attribute}>
        Font Family
      </label>

      <div className="relative mt-3" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[200px] px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-left ${
            !currentFont ? "text-gray-400" : "text-gray-200"
          } flex justify-between items-center`}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {currentFont ? currentFont : "Select font family"}
          <svg
            className="ml-2 h-4 w-4 opacity-50"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 w-full max-h-60 overflow-auto bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10">
            <input
              ref={searchInputRef}
              type="text"
              className="w-full p-2 bg-gray-700 text-gray-200 border-b border-gray-600 rounded-t-md focus:outline-none"
              placeholder="Search font family..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="p-2">
              {filteredFonts.length === 0 ? (
                <div className="p-2 text-sm text-gray-400">
                  No font family found.
                </div>
              ) : (
                filteredFonts.map((font) => (
                  <div
                    key={font}
                    onClick={() => {
                      handleAttributeChange(attribute, font);
                      setIsOpen(false);
                    }}
                    className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded-md hover:bg-gray-700 ${
                      font === currentFont ? "bg-gray-600" : ""
                    }`}
                    style={{ fontFamily: font }}
                  >
                    <span className="text-gray-200">{font}</span>
                    {font === currentFont && (
                      <svg
                        className="h-4 w-4 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FontFamilyPicker;
