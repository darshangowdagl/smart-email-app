import { FaArrowLeft, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import emailData from "../../data/emails.json";
import "./Features.css";

function Features() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mailInfo, setMailInfo] = useState(null);

  useEffect(() => {
    const mail = emailData.find((email) => email.id === parseInt(id));
    setMailInfo(mail);
  }, [id]);

  const handleBack = () => {
    navigate('/home');
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="features">
      <div className="feature-buttons">
        <button className="feature-btn back" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <button className="feature-btn delete">
          <FaTrash />
        </button>
        <div className="info-container">
          <button className="feature-btn info">
            <FaInfoCircle />
          </button>
          <div className="info-box">
            <h3>Mail Information</h3>
            <div className="info-item">
              <span>From:</span>
              <p>{mailInfo?.name || 'N/A'}</p>
            </div>
            <div className="info-item">
              <span>Email:</span>
              <p>{mailInfo?.sender || 'N/A'}</p>
            </div>
            <div className="info-item">
              <span>Time:</span>
              <p>{formatDate(mailInfo?.timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
