import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth/login', { replace: true });
    }
  }, [navigate]);

  return children;
}

export default ProtectedPage;
