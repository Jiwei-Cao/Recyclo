import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js'

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }

      try {
        const response = await api.get('/protected',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div>
      <h1>Protected Content</h1>
      <p>If you see this, your token is valid.</p>
    </div>
  );
}

export default ProtectedPage;
