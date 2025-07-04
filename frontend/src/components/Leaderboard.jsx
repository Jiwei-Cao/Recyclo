import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from '../api';
import { FaCrown } from 'react-icons/fa';

function Leaderboard({ darkMode, setDarkMode }) {
    const [leaders, setleaders] = useState([]);

    useEffect(() => {
        api.get('/logs/leaderboard')
            .then(res => setleaders(res.data))
            .catch(err => console.error('Error fetching leaderboard:', err));
    }, []);

    const pageWrapperClasses = `
        min-h-screen w-full flex items-center justify-center 
        px-4 transition-colors duration-300
        ${darkMode ? 'bg-black' : 'bg-gray-100'}
    `;

    const containerClasses = `
        mt-6 px-4 py-6 w-full max-w-md mx-auto 
        rounded-2xl border transition-colors duration-300
        ${darkMode 
        ? 'bg-gray-900 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-200 text-gray-800 shadow-md'}
    `;

    const headingClass = `text-2xl font-bold text-center mb-2`;

    const subheadingClass = `text-sm text-center mb-4 text-gray-400`;

    const headerRow = `
        grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 font-semibold text-sm border-b pb-2 mb-2
        ${darkMode ? 'border-gray-700' : 'border-gray-300'}
    `;

    const rowClass = `
        grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 items-center text-sm py-2 px-3 rounded
        ${darkMode 
        ? 'bg-gray-800 border border-gray-700 text-gray-100' 
        : 'bg-gray-100 border border-gray-300 text-gray-800'}
    `;

    const crownClass = `text-yellow-400 animate-pulse`

    return (
        <div className={pageWrapperClasses}>
            <div className={containerClasses}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <h2 className={headingClass}>🏆 Global Leaderboard</h2>
                <p className={subheadingClass}>All-Time Recycling Stats</p>

                <div className={headerRow}>
                    <span>#</span>
                    <span>Name</span>
                    <span className="text-right">♻️ Items Recycled</span>
                </div>

                <ol className="space-y-2">
                    {leaders.map((entry, i) => (
                        <li key={i} className={rowClass}>
                            <span>
                                {i === 0 ? <FaCrown className={crownClass} /> : i + 1}
                            </span>
                            <span className="flex items-center gap-2 truncate">{entry.username}</span>
                            <span className="text-right">{entry.total}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Leaderboard;