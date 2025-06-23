import React from 'react';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const PredictionResult = ({ result, darkMode }) => {
    if (!result) return null;

    const isUnsure = result.confidence < 0.15;

    const containerClasses = `
        mt-6 p-4 rounded-lg transition-colors duration-300
        ${darkMode
        ? 'bg-gray-800 border border-gray-700 shadow-none text-gray-200'
        : 'bg-white border border-gray-200 shadow-md text-gray-800'}
    `

    const titleClasses = `
        text-lg font-semibold mb-2
        ${darkMode ? 'text-gray-100' : 'text-gray-800'}
    `
    
    const messageClasses = isUnsure
    ? `mt-2 font-medium ${
        darkMode ? 'text-red-400' : 'text-red-600'
      }`
    : `mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}
    `


    return (
        <div className="containerClasses">
            <h2 className="titleClasses">Prediction Result</h2>

            {isUnsure ? (
                <p className="messageClasses">
                    We're unable to confidently classify this image. Please try a clearer image.
                </p>
            ) : (
                <p className={messageClasses}>
                    Detected Waste: <span className="font-bold">{capitalize(result.label)}</span>
                </p>
            )}
        </div>
    );
};

export default PredictionResult