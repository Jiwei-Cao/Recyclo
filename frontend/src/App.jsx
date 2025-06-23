import React, { useState } from 'react'
import UploadImage from './components/UploadImage'
import PredictionResult from './components/PredictionResult'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [prediction, setPrediction] = useState(null)
  const [darkMode, setDarkMode] = useState(false);

  const containerClasses = `
    relative flex flex-col items-center justify-center 
    p-6 min-h-screen transition-colors duration-300
    ${darkMode
      ? 'dark:bg-gray-900 text-white border-gray-700 shadow-none'
      : 'bg-gray-100 text-black border-gray-200 shadow-lg'}
  `
  return (
    <div className={containerClasses}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <h1 className={`text-3xl font-bold mb-6 ${
        darkMode ? 'text-green-400' : 'text-green-600'
      }`}>
        ♻️ Recyclo Waste Classifier
      </h1>

      <UploadImage onResult={setPrediction} darkMode={darkMode}/>
      <PredictionResult result={prediction} darkMode={darkMode}/>
    </div>
  )
}

export default App;