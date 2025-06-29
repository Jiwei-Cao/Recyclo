import React, { useEffect, useState } from 'react';

function Leaderboard() {
    const [leaders, setleaders] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/leaderboard`)
            .then(res => res.json())
            .then(data => setleaders(data))
            .catch(err => console.error('Error fetching leaderboard:', err));
    });
    
    return (
        <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">🏆 Global Leaderboard</h2>
        <ol className="space-y-2">
            {leaders.map((entry, i) => (
            <li key={i} className="border p-3 rounded bg-gray-100 dark:bg-gray-800">
                <span className="font-bold">{i + 1}. {entry.username}</span> — ♻️ {entry.total} items
            </li>
            ))}
        </ol>
        </div>
    );
}

export default Leaderboard;