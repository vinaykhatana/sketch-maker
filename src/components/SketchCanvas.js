import React, { useRef, useEffect } from "react";

const SketchCanvas = ({
  imageSrc,
  imageBitmap,
  grayscale,
  blurAmount,
  contrast,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageBitmap) {
      processImage();
    }
  }, [imageBitmap, grayscale, blurAmount, contrast]);

  const applyFilter = (bmp, filters = "") => {
    const canvas = document.createElement("canvas");
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = filters;
    ctx.drawImage(bmp, 0, 0);
    return canvas;
  };

  const generateSketch = (bnw, blur) => {
    const canvas = document.createElement("canvas");
    canvas.width = bnw.width;
    canvas.height = bnw.height;
    canvas.__skipFilterPatch = true;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bnw, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "color-dodge";
    ctx.drawImage(blur, 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";
    ctx.filter = `contrast(${contrast})`;
    ctx.drawImage(canvas, 0, 0);

    return canvas;
  };

  const processImage = async () => {
    if (!imageBitmap) return;

    const bnw = applyFilter(imageBitmap, `grayscale(${grayscale})`);
    const blur = applyFilter(
      imageBitmap,
      `grayscale(${grayscale}) invert(1) blur(${blurAmount}px)`
    );

    const sketchCanvas = generateSketch(bnw, blur);
    const mainCanvas = canvasRef.current;
    const ctx = mainCanvas.getContext("2d");

    mainCanvas.width = sketchCanvas.width;
    mainCanvas.height = sketchCanvas.height;
    ctx.drawImage(sketchCanvas, 0, 0);
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "sketch.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Original Image Section */}
        {imageSrc && (
          <div className="bg-white p-2 rounded-xl shadow-md border">
            <h2 className="text-2xl font-semibold text-gray-800">
              Original Image
            </h2>
            <img
              src={imageSrc}
              alt="Original"
              className="w-full h-auto mt-4 border border-gray-300 rounded-lg shadow"
            />
          </div>
        )}
        {/* Sketch Image Section */}
        <div className="bg-white p-2 rounded-xl shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800">Sketch Image</h2>
          <canvas
            ref={canvasRef}
            className="w-full h-auto mt-4 border border-gray-300 rounded-lg shadow"
          ></canvas>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 font-bold bg-green-500 text-white text-lg rounded-xl shadow-md hover:bg-green-600 transition-all"
          onClick={downloadSketch}
        >
          Download Sketch
        </button>
      </div>
    </div>
  );
};

export default SketchCanvas;
