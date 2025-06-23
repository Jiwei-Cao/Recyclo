import React, { useState } from 'react'
import UploadImage from './components/UploadImage'
import PredictionResult from './components/PredictionResult'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [prediction, setPrediction] = useState(null)
  const [darkMode, setDarkMode] = useState(false);

  const containerClasses = `
    relative flex flex-col items-center justify-center p-6 min-h-screen
    ${darkMode
      ? 'dark:bg-gray-900 dark:text-white'
      : 'bg-gray-100 text-black'}
  `

  return (
    <div className={containerClasses}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
        ♻️ Recyclo Waste Classifier
      </h1>

      <UploadImage onResult={setPrediction} />
      <PredictionResult result={prediction} />
    </div>
  )
}

export default App;