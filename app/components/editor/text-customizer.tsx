import React, { useState } from "react";
import InputField from "./input-field";
import SliderField from "./slider-field";
import ColorPicker from "./color-picker";
import FontFamilyPicker from "./font-picker";

interface TextCustomizerProps {
  textSet: {
    id: number;
    text: string;
    fontFamily: string;
    top: number;
    left: number;
    color: string;
    fontSize: number;
    fontWeight: number;
    opacity: number;
    rotation: number;
    shadowColor: string;
    shadowSize: number;
  };
  handleAttributeChange: (id: number, attribute: string, value: any) => void;
  removeTextSet: (id: number) => void;
  duplicateTextSet: (textSet: any) => void;
}

const TextCustomizer: React.FC<TextCustomizerProps> = ({
  textSet,
  handleAttributeChange,
  removeTextSet,
  duplicateTextSet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-md p-4 mb-4 bg-gray-800">
      {/* Accordion Trigger */}
      <button
        className="w-full text-left font-semibold p-2 text-gray-200 hover:text-gray-100 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {textSet.text}
        <span className="float-right">{isOpen ? "▼" : "▶"}</span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-2 mt-2 border-t border-gray-700">
          <InputField
            attribute="text"
            label="Text"
            currentValue={textSet.text}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <FontFamilyPicker
            attribute="fontFamily"
            currentFont={textSet.fontFamily}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <div className="flex flex-row items-start gap-4">
            <ColorPicker
              attribute="color"
              label="Text Color"
              currentColor={textSet.color}
              handleAttributeChange={(attribute, value) =>
                handleAttributeChange(textSet.id, attribute, value)
              }
            />
          </div>
          <SliderField
            attribute="left"
            label="X Position"
            min={-200}
            max={200}
            step={1}
            currentValue={textSet.left}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="top"
            label="Y Position"
            min={-100}
            max={100}
            step={1}
            currentValue={textSet.top}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="fontSize"
            label="Text Size"
            min={10}
            max={800}
            step={1}
            currentValue={textSet.fontSize}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="fontWeight"
            label="Font Weight"
            min={100}
            max={900}
            step={100}
            currentValue={textSet.fontWeight}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="opacity"
            label="Text Opacity"
            min={0}
            max={1}
            step={0.01}
            currentValue={textSet.opacity}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="rotation"
            label="Rotation"
            min={-360}
            max={360}
            step={1}
            currentValue={textSet.rotation}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <div className="flex flex-row gap-2 mt-4">
            <button
              onClick={() => duplicateTextSet(textSet)}
              className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Duplicate Text Set
            </button>
            <button
              onClick={() => removeTextSet(textSet.id)}
              className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Remove Text Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextCustomizer;
