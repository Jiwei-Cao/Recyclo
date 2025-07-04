import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import Header from './Header';
import api from '../api';

function Register({ darkMode, setDarkMode }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !username || !password || !confirmPassword) {
            setError('All fields are required.');
            return false;
        }

        if (password != confirmPassword) {
          setError('Passwords do not match.')
          return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            await api.post('/auth/register', {
              username: username,
              email: email,
              password: password
            })
            toast.success('Registered! Please log in.')
            navigate('/auth/login');
        } catch (err) {
          const detail = err.response?.data?.detail;
            setError(detail || err.message);
        } finally {
          setLoading(false);
        }
    };

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
        <h2 className="text-2xl font-bold mb-4">📝 Register</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className={inputClass}
          />
        </label>

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

        <label className="block mb-4">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Registering…' : 'Register'}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account? 
          <a href="/auth/login" className="text-blue-600">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Register;