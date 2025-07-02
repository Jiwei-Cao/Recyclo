import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Header from './Header';
import api from '../api';

function Stats({ darkMode, setDarkMode}) {
    const [dailyStreak, setDailyStreak] = useState(0);
    const [weeklyTotal, setWeeklyTotal] = useState(0);
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [recycleLog, setRecycleLog] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth/login');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        api.get('/streak', { headers })
            .then(res => setDailyStreak(res.data.streak))
            .catch(err => console.error('Error fetching daily streak:', err));

        api.get('/logs', { headers })
          .then(res => {
            const data = res.data
            setRecycleLog(data);

            const now = new Date();
            const thisMonth = now.getMonth();
            const thisYear = now.getFullYear();

            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());

            const monthly = data.filter(log => {
                const date = new Date(log.timestamp);
                return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
            })

            const weekly = data.filter(log => {
                const date = new Date(log.timestamp);
                return date >= startOfWeek;
            })

            setMonthlyTotal(monthly.length);
            setWeeklyTotal(weekly.length);
        })
        .catch(err => console.error('Error fetching recycle logs:', err));
    }, []);

    const getImpactMessage = (category) => {
        switch (category) {
        case 'plastic': return '🐢 You saved a turtle!';
        case 'paper': return '🌳 One tree says thanks!';
        case 'glass': return '🍷 Less glass, more class!';
        default: return '♻️ Good job!';
        }
    };

    return (
    <div className="p-6 max-w-xl mx-auto">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <h2 className="text-xl font-bold mb-4">📊 Your Recycling Stats</h2>

      <div className="mb-4">
        <p>🔥 Daily Streak: <span className="font-semibold">{dailyStreak} days</span></p>
        <p>📅 This Week: <span className="font-semibold">{weeklyTotal} items</span></p>
        <p>🗓️ This Month: <span className="font-semibold">{monthlyTotal} items</span></p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">🕒 Activity Log</h3>
        <ul className="space-y-2">
          {recycleLog.map((log, i) => (
            <li key={i} className="border p-3 rounded bg-gray-100 dark:bg-gray-800">
              <p className="text-sm">{formatTime(log.timestamp)} - {log.category}</p>
              <p className="text-xs text-green-600 dark:text-green-400">{getImpactMessage(log.category)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stats;