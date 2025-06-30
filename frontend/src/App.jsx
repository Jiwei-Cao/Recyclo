import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Protected from './components/Protected';
import MainApp from './components/MainApp';
import Stats from './components/Stats';
import Leaderboard from './components/Leaderboard';
import Register from './components/Register';

const getInitialDarkMode = () => {
  const stored = localStorage.getItem('darkMode');
  return stored === 'true';
}

function App() {
  const [prediction, setPrediction] = useState(null);
  const [darkMode, _setDarkMode] = useState(getInitialDarkMode);

  const setDarkMode = (valueOrUpdater) => {
    const nextValue = typeof valueOrUpdater === 'function'
      ? valueOrUpdater(darkMode)
      : valueOrUpdater;

    _setDarkMode(nextValue);
    localStorage.setItem('darkMode', nextValue);
  };

  return (
    <Router>
      <Routes>
        {/* Main Recyclo page */}
        <Route 
            path="/"
            element={
                <MainApp 
                prediction={prediction} 
                setPrediction={setPrediction} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                />
            }   
        />

        {/* Login page */}
        <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode}/>} />

         {/* Protected stats page */}
        <Route
          path="/stats"
          element={
            <Protected>
              <Stats darkMode={darkMode} setDarkMode={setDarkMode}/>
            </Protected>
          }
        />

        {/* Leaderboard page */}
        <Route path="/leaderboard" element={<Leaderboard darkMode={darkMode} setDarkMode={setDarkMode}/>} />

        {/* Register page */}
        <Route path="/register" element={<Register darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      </Routes>
    </Router>
  );
}

export default App;
