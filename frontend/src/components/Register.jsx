import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
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
                `${import.meta.env.VITE_API_BASE_URL}/register`,
                {
                    method: `POST`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formDetails.toString(),
                }
            );

            if (!response.ok) {
                setLoading(false);
                throw new Error('Registration failed. Please try again.');
            }

            navigate('/login');
        } catch (error) {
            setLoading(false);
            setError('An error occurred: ' + error.message + ' Please try again later.');
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">📝 Register</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
            className="w-full border px-3 py-2 mt-1"
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
            className="w-full border px-3 py-2 mt-1"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Register;