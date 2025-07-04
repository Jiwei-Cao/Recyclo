import React from 'react';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const PredictionResult = ({ result, darkMode }) => {
    if (!result) return null;

    const [width, height] = useWindowSize();
    
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
    ? `mt-2 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`
    : `mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}
    `

    const impactMessageText = `
        mt-2 text-sm italic
        ${darkMode ? 'text-green-400' : 'text-green-700'}
    `
    
    const impactMap = {
        plastic: 'You helped save a turtle 🐢',
        glass: 'You reduced landfill waste ♻️',
        metal: 'You saved enough energy to run a washing machine for an hour ⚡',
        paper: 'You saved part of a tree 🌳',
        cardboard: 'You helped protect forests 🌲',
        trash: 'Please try to recycle next time 🚮',
    };

    const impactMessage = impactMap[result.label] || 'Small steps, big impact!';

    const CelebrationConfetti = ({ width, height }) => (
        <Confetti width={width} height={height} numberOfPieces={600} gravity={1} wind={0.05}
            initialVelocityX={15} initialVelocityY={25} recycle={false} />
    );

    return (
        <>
            {!isUnsure && <CelebrationConfetti width={width} height={height} />}

            <div className={containerClasses}>
                <h2 className={titleClasses}>Prediction Result</h2>

                {isUnsure ? (
                    <p className={messageClasses}>
                        We're unable to confidently classify this image. Please try a clearer image.
                    </p>
                ) : (
                    <>
                        <p className={messageClasses}>
                            Detected Waste:{' '}
                            <span className="font-bold">{capitalize(result.label)}</span>
                        </p>
                        <p className={impactMessageText}>
                            {impactMessage}
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default PredictionResult