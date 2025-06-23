import React from 'react';

const PredictionResult = ({ result }) => {
    if (!result) return null;

    const isUnsure = result.confidence < 0.15;

    return (
        <div className="mt-6 bg-white shadow-md rounded p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Prediction Result</h2>
            {isUnsure ? (
                <p className="text-red-600 mt-2">We're unable to confidently classify this image. Please try a clearer image.</p>
            ) : (
                <>
                    <p className="mt-2">Class: <span className="font-bold">{result.label}</span></p>
                    <p>Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(2)}%</span></p>
                </>
            )}
        </div>
    );
};

export default PredictionResult