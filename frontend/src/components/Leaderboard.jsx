import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from '../api';

function Leaderboard({ darkMode, setDarkMode }) {
    const [leaders, setleaders] = useState([]);

    useEffect(() => {
        api.get('/leaderboard')
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

    const headingClass = `text-2xl font-bold mb-6 text-center`;

    const leaderItemClass = `
        p-4 rounded-lg border transition
        ${darkMode 
        ? 'bg-gray-800 border-gray-700 text-gray-200' 
        : 'bg-gray-100 border-gray-300 text-gray-800'}
    `;

    return (
        <div className={pageWrapperClasses}>
            <div className={containerClasses}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <h2 className={headingClass}>🏆 Global Leaderboard</h2>

                <ol className="space-y-3">
                {leaders.map((entry, i) => (
                    <li key={i} className={leaderItemClass}>
                    <p className="text-sm font-semibold">{i + 1}. {entry.username}</p>
                    <p className="text-sm text-green-500 dark:text-green-400">♻️ {entry.total} items recycled</p>
                    </li>
                ))}
                </ol>
            </div>
        </div>
    );
}

export default Leaderboard;