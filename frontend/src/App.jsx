import React, { useState } from 'react'
import UploadImage from './components/UploadImage'
import PredictionResult from './components/PredictionResult'

function App() {
  const [prediction, setPrediction] = useState(null)

  return (
    <div>
      <h1>Recyclo Waste Classifier</h1>
      <UploadImage onResult={setPrediction} />
      <PredictionResult result={prediction} />
    </div>
  );
}

export default App;
