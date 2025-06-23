import React, { useState } from 'react'
import UploadImage from './components/UploadImage'
import PredictionResult from './components/PredictionResult'

function App() {
  const [prediction, setPrediction] = useState(null)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">♻️ Recyclo Waste Classifier</h1>
      <UploadImage onResult={setPrediction} />
      <PredictionResult result={prediction} />
    </div>
  );
}

export default App;