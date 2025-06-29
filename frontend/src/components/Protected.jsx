import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/protected`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return navigate('/login');
        }

        const userData = await response.json();
        console.log('Logged in as:', userData);

      } catch (err) {
        navigate('/login');
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
