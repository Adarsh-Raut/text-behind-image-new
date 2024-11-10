// app/app/page.tsx
"use client";

import React, { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import TextCustomizer from "@/app/components/editor/text-customizer";
import Image from "next/image";
import "@/app/fonts.css";

const Page = () => {
  //   const { user } = useUser();
  //   const { session } = useSessionContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(
    null
  );
  const [textSets, setTextSets] = useState<Array<any>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      await setupImage(imageUrl);
    }
  };

  const setupImage = async (imageUrl: string) => {
    try {
      const imageBlob = await removeBackground(imageUrl);
      const url = URL.createObjectURL(imageBlob);
      setRemovedBgImageUrl(url);
      setIsImageSetupDone(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewTextSet = () => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [
      ...prev,
      {
        id: newId,
        text: "edit",
        fontFamily: "Inter",
        top: 0,
        left: 0,
        color: "white",
        fontSize: 200,
        fontWeight: 800,
        opacity: 1,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowSize: 4,
        rotation: 0,
      },
    ]);
  };

  const handleAttributeChange = (id: number, attribute: string, value: any) => {
    setTextSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [attribute]: value } : set))
    );
  };

  const duplicateTextSet = (textSet: any) => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
  };

  const removeTextSet = (id: number) => {
    setTextSets((prev) => prev.filter((set) => set.id !== id));
  };

  const saveCompositeImage = () => {
    if (!canvasRef.current || !isImageSetupDone) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new (window as any).Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      textSets.forEach((textSet) => {
        ctx.save(); // Save the current state
        ctx.font = `${textSet.fontWeight} ${textSet.fontSize * 3}px ${
          textSet.fontFamily
        }`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const x = (canvas.width * (textSet.left + 50)) / 100;
        const y = (canvas.height * (50 - textSet.top)) / 100;

        // Move the context to the text position and rotate
        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180); // Convert degrees to radians
        ctx.fillText(textSet.text, 0, 0); // Draw text at the origin (0, 0)
        ctx.restore(); // Restore the original state
      });

      if (removedBgImageUrl) {
        const removedBgImg = new (window as any).Image();
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
          triggerDownload();
        };
        removedBgImg.src = removedBgImageUrl;
      } else {
        triggerDownload();
      }
    };
    bgImg.src = selectedImage || "";

    function triggerDownload() {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "text-behind-image.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <>
      {/* {user && session && session.user ? ( */}
      <div className="flex flex-col h-screen">
        <div className="flex flex-row items-center justify-between p-5 px-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Text behind image editor
          </h2>
          <div className="flex gap-4">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png"
            />
            <button
              onClick={handleUploadImage}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload image
            </button>
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        {selectedImage ? (
          <div className="flex flex-row h-[calc(100vh-80px)]">
            <div className="w-1/2 p-4 border-r border-border relative overflow-hidden">
              {isImageSetupDone ? (
                <Image
                  src={selectedImage}
                  alt="Uploaded"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
              ) : (
                <span className="flex items-center w-full gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading, please wait
                </span>
              )}
              {isImageSetupDone &&
                textSets.map((textSet) => (
                  <div
                    key={textSet.id}
                    style={{
                      position: "absolute",
                      top: `${50 - textSet.top}%`,
                      left: `${textSet.left + 50}%`,
                      transform: `translate(-50%, -50%) rotate(${textSet.rotation}deg)`,
                      color: textSet.color,
                      textAlign: "center",
                      fontSize: `${textSet.fontSize}px`,
                      fontWeight: textSet.fontWeight,
                      fontFamily: textSet.fontFamily,
                      opacity: textSet.opacity,
                    }}
                  >
                    {textSet.text}
                  </div>
                ))}
              {removedBgImageUrl && (
                <Image
                  src={removedBgImageUrl}
                  alt="Removed bg"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className="absolute top-0 left-0 w-full h-full"
                />
              )}
            </div>
            <div className="w-1/2 flex flex-col p-4 overflow-y-auto">
              <button
                onClick={addNewTextSet}
                className="mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  className="inline-block w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Text Set
              </button>
              <div className="w-full">
                {textSets.map((textSet) => (
                  <TextCustomizer
                    key={textSet.id}
                    textSet={textSet}
                    handleAttributeChange={handleAttributeChange}
                    removeTextSet={removeTextSet}
                    duplicateTextSet={duplicateTextSet}
                  />
                ))}
              </div>

              <canvas ref={canvasRef} style={{ display: "none" }} />
              <button
                onClick={saveCompositeImage}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save image
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-grow">
            <h2 className="text-xl font-semibold">
              Welcome, get started by uploading an image!
            </h2>
          </div>
        )}
      </div>
      {/* ) : (
        <Authenticate />
      )} */}
    </>
  );
};

export default Page;
