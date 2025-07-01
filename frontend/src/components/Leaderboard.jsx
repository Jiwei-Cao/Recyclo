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

    const outerClass = `
        min-h-screen transition-colors duration-300
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `;

    const containerClass = `
        p-6 max-w-xl mx-auto
    `;

    const headingClass = `
        text-xl font-bold mb-4
    `;

    const itemClass = `
        border p-3 rounded transition-colors duration-300
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}
    `;

    return (
        <div className={outerClass}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className={containerClass}>
                <h2 className={headingClass}>🏆 Global Leaderboard</h2>
                <ol className="space-y-2">
                    {leaders.map((entry, i) => (
                    <li key={i} className={itemClass}>
                        <span className="font-bold">{i + 1}. {entry.username}</span> — ♻️ {entry.total} items
                    </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Leaderboard;