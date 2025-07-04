import React, { useState } from 'react';
import api from "../api.js";

const UploadImage = ({ onResult, darkMode}) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        
        onResult(null);
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const predictionResponse = await api.post('/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const prediction = predictionResponse.data;
            onResult(prediction);

            const token = localStorage.getItem('token');
            if (token && prediction.label) {
                try {
                    await api.post(
                        '/logs/',
                        { category: prediction.label },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } catch (logErr) {
                    console.warn('⚠️ Failed to save log:', logErr)
                }
            }
        } catch (err) {
            console.error('Prediction error:', err);
        } finally {
            setLoading(false);
        }
    }

    const fileButtonLight = `
    py-2 px-6 rounded-full font-semibold
    bg-green-100 text-green-700 border border-green-400
    hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500
    transition-colors duration-300
    `

    const fileButtonDark = `
    py-2 px-6 rounded-full font-semibold
    bg-green-800 text-green-200 border border-green-600
    hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300
    transition-colors duration-300
    `

    const fileButtonClasses = darkMode ? fileButtonDark : fileButtonLight;

    const buttonBase = `
        flex items-center justify-center
        py-2 px-6 rounded font-semibold
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
    `

    const buttonState = loading 
        ? 'opacity-50 cursor-not-allowed' 
        : darkMode
        ? 'bg-green-500 text-gray-900 hover:bg-green-600 focus:ring-green-300 cursor-pointer'
        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 cursor-pointer'

    const buttonClasses = `${buttonBase} ${buttonState}`

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center w-full gap-3">
                <label htmlFor="file-upload" className={`cursor-pointer ${fileButtonClasses} mb-0`}>
                    Choose file
                </label>
                <input
                    id="file-upload"
                    type="file"
                    title="Upload an image"
                    aria-label="Upload image file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                />
                <span className="text-center">{file ? file.name : 'No file chosen'}</span>
            </div>
            <button type="submit" disabled={loading} className={buttonClasses}>
                {loading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12" cy="12" r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        Processing...
                    </>
                ) : (
                    'Classify Waste'
                )}
            </button>
        </form>
    );
};

export default UploadImage;