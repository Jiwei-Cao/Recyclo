import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Protected from './components/Protected';
import MainApp from './MainApp';
import Stats from './components/Stats';
import Leaderboard from './components/Leaderboard';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
        <Route path="/login" element={<Login />} />

         {/* Protected stats page */}
        <Route
          path="/stats"
          element={
            <Protected>
              <Stats />
            </Protected>
          }
        />

        {/* Leaderboard page */}
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
