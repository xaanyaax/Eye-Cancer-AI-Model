import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        processFiles(files);
    };

    const processFiles = (files) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = {
                    id: Date.now() + Math.random(),
                    file: file,
                    preview: e.target.result,
                    name: file.name,
                    size: file.size
                };
                setSelectedImages(prev => [...prev, newImage]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = Array.from(event.dataTransfer.files);
        processFiles(files);
    };

    const removeImage = (id) => {
        setSelectedImages(prev => prev.filter(img => img.id !== id));
    };

    const uploadImages = async () => {
        if (selectedImages.length === 0) return;

        setIsUploading(true);

        try {

            const formData = new FormData();
            formData.append('file', selectedImages[0].file); // send only 1 file

            const response = await axios.post('http://localhost:3001/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            console.log('Response from backend:', response.data);

            // You can update UI with result later (e.g., show prediction)
            setUploadedImages((prev) => [...prev, ...selectedImages]);
            setSelectedImages([]);


            navigate("/result", {
                state: {
                  cancerDetected: response.data.result.classification_prediction === 1,
                  cancerProbability: response.data.result.classification_probabilities[1],
                  message: response.data.result.message,
                  success: true,
                  processedImage: {
                    base64: response.data.result.segmentation_mask_base64,
                  },
                  maskedImage: {
                    base64: response.data.result.overlay_image_base64, // ✅ overlay = masked
                  },
                  originalImage: {
                    base64: selectedImages[0].preview.split(',')[1],
                  }
                }
              });
              
            

        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Upload failed. Please check the console for details.');
        } finally {
            setIsUploading(false);
        }
    };




    const clearAll = () => {
        setSelectedImages([]);
        setUploadedImages([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Image Upload Center</h1>
                    <p className="text-gray-600">Upload and manage your images with ease</p>
                </div>

                {/* Upload Area */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${isDragging
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="mb-4">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div className="mb-4">
                            <p className="text-xl font-medium text-gray-700 mb-2">
                                {isDragging ? 'Drop your images here!' : 'Drag & drop images here'}
                            </p>
                            <p className="text-gray-500">or</p>
                        </div>

                        <label className="cursor-pointer">
                            <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                                Choose Files
                            </span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </label>

                        <p className="mt-2 text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB each
                        </p>
                    </div>
                </div>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Selected Images ({selectedImages.length})
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={clearAll}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={uploadImages}
                                    disabled={isUploading}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload Images'
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedImages.map((image) => (
                                <div key={image.id} className="relative group bg-gray-50 rounded-lg p-3">
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2">
                                        <img
                                            src={image.preview}
                                            alt={image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <p className="font-medium text-gray-700 truncate" title={image.name}>
                                            {image.name}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeImage(image.id)}
                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Uploaded Images Gallery */}
                {uploadedImages.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Uploaded Images ({uploadedImages.length})
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {uploadedImages.map((image) => (
                                <div key={image.id} className="group">
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2 transform transition-transform duration-200 group-hover:scale-105">
                                        <img
                                            src={image.preview}
                                            alt={image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="text-sm">
                                        <p className="font-medium text-gray-700 truncate" title={image.name}>
                                            {image.name}
                                        </p>
                                        <p className="text-green-600 text-xs">✓ Uploaded</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {selectedImages.length === 0 && uploadedImages.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No images uploaded yet</p>
                        <p className="text-gray-400">Start by selecting some images to upload</p>
                    </div>
                )}
            </div>
        </div>
    );
}