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
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Classify Waste</button>
        </form>
    );
};

export default UploadImage;