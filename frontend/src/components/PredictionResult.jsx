import React from 'react';

const PredictionResult = ({ result }) => {
    if (!result) return null;

    const confidence = result.confidence; 
    const isUnsure = confidence < 0.15;

    return (
        <div>
            <h3>Prediction Result</h3>
            {isUnsure ? (
                <p>We're unable to confidently classify this image. Please try a clearer image.</p>
            ) : (
                <>
                    <p>Class: {result.label}</p>
                    <p>Confidence: {(confidence * 100).toFixed(2)}%</p>
                </>
            )}
        </div>
    );
};

export default PredictionResult