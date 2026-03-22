import React, { useState } from "react";
import UploadButton from "../components/UploadButton";
import Controls from "../components/Controls";
import SketchCanvas from "../components/SketchCanvas";

const ImgSketchConverter = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBitmap, setImageBitmap] = useState(null);

  const [grayscale, setGrayscale] = useState(1);
  const [blurAmount, setBlurAmount] = useState(7);
  const [contrast, setContrast] = useState(1.5);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      setImageSrc(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = async () => setImageBitmap(await createImageBitmap(img));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <UploadButton onUpload={handleImageUpload} />
      {imageSrc && (
        <>
          <Controls
            grayscale={grayscale}
            setGrayscale={setGrayscale}
            blurAmount={blurAmount}
            setBlurAmount={setBlurAmount}
            contrast={contrast}
            setContrast={setContrast}
          />
          <SketchCanvas
            imageSrc={imageSrc}
            imageBitmap={imageBitmap}
            grayscale={grayscale}
            blurAmount={blurAmount}
            contrast={contrast}
          />
        </>
      )}
    </div>
  );
};

export default ImgSketchConverter;
