import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

const UploadFoodRest = () => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="w-full mb-6">
      <label className="text-sm font-semibold text-gray-700 block mb-2">Food Image</label>
      <div 
        className={`relative w-full h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden cursor-pointer ${
          dragActive ? 'border-[#A7D63B] bg-[#C8E66A]/20' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleChange}
        />
        
        {preview ? (
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="p-4 bg-white rounded-full shadow-sm mb-3">
              <UploadCloud className="w-8 h-8 text-[#A7D63B]" />
            </div>
            <p className="font-semibold text-gray-700">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadFoodRest;
