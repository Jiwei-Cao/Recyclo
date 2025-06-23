import React, { useState } from 'react';
import api from "../api.js";

const UploadImage = ({ onResult }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onResult(response.data);
        } catch (error) {
            console.error("Prediction error:", error);
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
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
            >
                    Classify Waste
            </button>
        </form>
    );
};

export default UploadImage;