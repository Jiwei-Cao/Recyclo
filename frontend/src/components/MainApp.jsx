import React, { useState } from 'react'
import UploadImage from './UploadImage'
import PredictionResult from './PredictionResult'
import Header from "./Header"

function MainApp({ darkMode, setDarkMode }) {
  const [prediction, setPrediction] = useState(null)

  const baseContainer = `
    flex flex-col items-center justify-center 
    px-4 sm:px-6 md:px-10 min-h-screen 
    transition-colors duration-300
  `
  
  const lightContainer = `bg-gray-100 text-black border border-gray-200 shadow-lg`
  const darkContainer = `bg-gray-900 text-white border border-gray-700 shadow-none`

  const containerClasses = `${baseContainer} ${darkMode ? darkContainer : lightContainer}`

  const headingClass = `
    text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 
    transition-colors duration-300
    ${darkMode ? 'text-green-400' : 'text-green-600'}
  `

  return (
    <div className={containerClasses}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>

      <h1 className={headingClass}>
        ♻️ Recyclo Waste Classifier
      </h1>

      <UploadImage onResult={setPrediction} darkMode={darkMode}/>
      <PredictionResult result={prediction} darkMode={darkMode}/>
    </div>
  )
}

export default MainApp;