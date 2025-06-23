import React, { useState } from 'react';
import api from "../api.js";

const UploadImage = ({ onResult }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onResult(response.data);
        } catch (error) {
            console.error("Prediction error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])}  
            className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-green-100 file:text-green-700
                   hover:file:bg-green-200"
            />


            <button 
                type="submit"
                disabled={loading}
                className={`
                    flex items-center justify-center
                    bg-green-600 hover:bg-green-700 text-white font-semibold 
                    py-2 px-6 rounded
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                {loading
                    ? (
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
                    )
                    : 'Classify Waste'
                }
            </button>
        </form>
    );
};

export default UploadImage;