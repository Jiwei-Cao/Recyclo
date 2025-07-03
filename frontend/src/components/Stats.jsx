import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import api from '../api';

function Stats({ darkMode, setDarkMode }) {
  const [dailyStreak, setDailyStreak] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [recycleLog, setRecycleLog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [streakRes, logsRes] = await Promise.all([
          api.get('/logs/streak', { headers }),
          api.get('/logs', { headers }),
        ]);

        setDailyStreak(streakRes.data.streak);
        const data = logsRes.data;
        setRecycleLog(data);

        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        const monthly = data.filter(log => {
          const d = new Date(log.timestamp);
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        });

        const weekly = data.filter(log => new Date(log.timestamp) >= startOfWeek);

        setMonthlyTotal(monthly.length);
        setWeeklyTotal(weekly.length);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth/login', { replace: true });
        } else {
          console.error('Error loading stats:', err);
        }
      }
    };

    loadStats();
  }, [navigate]);

  function formatTime(timestamp) {
    const d = new Date(timestamp);
    return d.toLocaleString();
  }

  const containerClasses = `
    mt-6 px-4 py-6 w-full max-w-md mx-auto 
    rounded-2xl border transition-colors duration-300
    ${darkMode 
      ? 'bg-gray-900 border-gray-700 text-gray-100' 
      : 'bg-white border-gray-200 text-gray-800 shadow-md'}
  `;

  const titleClasses = `text-2xl font-bold mb-6 text-center`;

  const statItem = `flex justify-between text-sm sm:text-base`;

  const logCard = `
    p-4 rounded-lg border transition
    ${darkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-200' 
      : 'bg-gray-100 border-gray-300 text-gray-800'}
  `;

  const logDateText = `text-sm mb-1 font-medium`;

  const pageWrapperClasses = `
    min-h-screen w-full flex items-center justify-center 
    px-4 transition-colors duration-300
    ${darkMode ? 'bg-black' : 'bg-gray-100'}
  `;

  return (
    <div className={pageWrapperClasses}>
      <div className={containerClasses}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <h2 className={titleClasses}>📊 Your Recycling Stats</h2>

        <div className="mb-6 space-y-2">
          <div className={statItem}>
            <span>🔥 Daily Streak:</span>
            <span className="font-semibold">{dailyStreak} days</span>
          </div>
          <div className={statItem}>
            <span>📅 This Week:</span>
            <span className="font-semibold">{weeklyTotal} items</span>
          </div>
          <div className={statItem}>
            <span>🗓️ This Month:</span>
            <span className="font-semibold">{monthlyTotal} items</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 mt-4">🕒 Activity Log</h3>
          <ul className="space-y-3">
            {recycleLog.map((log, i) => (
              <li key={i} className={logCard}>
                <p className={logDateText}>{formatTime(log.timestamp)}</p>
                <p className="text-sm font-semibold mb-1">🗑️ {log.category}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Stats;
