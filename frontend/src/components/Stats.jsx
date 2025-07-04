import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import api from '../api';

function Stats({ darkMode, setDarkMode }) {
  const [dailyStreak, setDailyStreak] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [recycleLog, setRecycleLog] = useState([]);
  const [filter, setFilter] = useState('all');
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
  };

  function filterLogs(logs, filter) {
    const now = new Date();
    return logs.filter((log) => {
      const date = new Date(log.timestamp);

      if (filter === 'today') {
        return date.toDateString() === now.toDateString();
      }

      if (filter === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
      }

      if (filter === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        return date >= startOfWeek &&date <= now;
      }

      if (filter === 'month') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }

      return true;
    });
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

  const selectClass = `
    w-full mb-4 px-3 py-2 text-sm rounded border transition-colors duration-300
    ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}
  `;

  const filterLogText = `
      text-lg font-semibold mb-3 mt-4 transition-colors duration-300
  `

  const emptyStateText = `
    text-center text-sm mt-4 italic 
    text-gray-500 dark:text-gray-400
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
          <h3 className={filterLogText}>🕒 Activity Log</h3>
          <select className={selectClass} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {filterLogs(recycleLog, filter).length === 0 ? (
            <p className={emptyStateText}>
              No logs found for selected filter.
            </p>
          ) : (
            <ul className="space-y-3">
              {filterLogs(recycleLog, filter).map((log, i) => (
                <li key={i} className={logCard}>
                  <p className={logDateText}>{formatTime(log.timestamp)}</p>
                  <p className="text-sm font-semibold mb-1">🗑️ {log.category}</p>
                </li>
            ))}
          </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;
