import React from "react";

const UploadButton = ({ onUpload }) => {
  return (
    <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 font-bold rounded-lg shadow hover:bg-blue-600 transition">
      Upload Image
      <input type="file" className="hidden" onChange={onUpload} />
    </label>
  );
};

export default UploadButton;
