import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login({ darkMode, setDarkMode}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !password) {
            setError('Username and password are required.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        const formDetails = new URLSearchParams();
        formDetails.append('username', username);
        formDetails.append('password', password);
    
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/login`,
                {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formDetails.toString(),
                }
            );

            if (!response.ok) {
                setLoading(false);
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            navigate('/stats');
        } catch (error) {
            setLoading(false);
            setError('An error occurred: ' + error.message + ' Please try again later.');
        }
    }

    const outerClass = `
        min-h-screen flex flex-col items-center justify-center p-4 
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
        transition-colors duration-300
    `;

    const formClass = `
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
        p-6 rounded shadow-md w-full max-w-md border
        ${darkMode ? 'border-gray-700' : 'border-gray-200'}
        transition-colors duration-300
    `;

    const inputClass = `
        w-full border px-3 py-2 mt-1 bg-transparent 
        ${darkMode ? 'border-gray-600' : 'border-gray-300'} 
        rounded transition-colors duration-300
    `;

    const buttonClass = `
        bg-green-600 text-white px-4 py-2 w-full rounded 
        hover:bg-green-700 disabled:opacity-50
        transition-colors duration-300
    `;

    return (
    <div className={outerClass}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <form onSubmit={handleSubmit} className={formClass}>
        <h2 className="text-2xl font-bold mb-4">🔑 Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
            Username:
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
            className={inputClass}
            />
        </label>

        <label className="block mb-4">
            Password:
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className={inputClass}
            />
        </label>

        <button
            type="submit"
            disabled={loading}
            className={buttonClass}
        >
            {loading ? 'Logging in…' : 'Login'}
        </button>

        <p className="mt-4 text-sm text-center">
            Don't have an account? <a href="/register" className="text-blue-600">Register here</a>
        </p>
        </form>
    </div>
    );
}

export default Login;