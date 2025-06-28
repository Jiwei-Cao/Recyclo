import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Protected from './protected';
import ProtectedApp from './components/ProtectedApp';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/protected"
          element={
            <Protected>
              <ProtectedApp 
                prediction={prediction}
                setPrediction={setPrediction}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
