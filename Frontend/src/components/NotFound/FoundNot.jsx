import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FoundNot.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="row">
        <img 
          src="/Images/NotFoundImage.svg" 
          alt="404 Not Found" 
          className="not-found-image floating" 
        />
      </div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigate('/')} className="back-home-btn">
        Back to Home
      </button>
    </div>
  );
}

export default NotFound;