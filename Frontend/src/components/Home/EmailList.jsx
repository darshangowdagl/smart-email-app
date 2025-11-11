import "./EmailList.css";
import { FaGithub, FaStar, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Category from "./Category"; 

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("personal");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmailsByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchEmailsByCategory = async (category) => {
    try {
      setLoading(true);
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      const credentials = btoa(`${email}:${password}`);

      const response = await fetch(
        `https://neuromail-backend.onrender.com/email-app/api/emails/get-inbox?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized: Please login again");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      const emailArray = Array.isArray(data) ? data : data.emails || [];
      console.log(emailArray);
      setEmails(emailArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setError(error.message);
      setLoading(false);

      if (error.message === "Unauthorized: Please login again") {
        navigate("/login");
      }
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleEmailClick = (id) => {
    const selectedEmail = emails.find(email => email.id === id);
    navigate(`/mail/${id}`, {
      state: { email: selectedEmail }
    });
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    // You can add delete API call logic here if needed
    setEmails(prevEmails => prevEmails.filter(email => email.id !== id));
  };

  return (
    <motion.div
      className="email-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Category 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      {loading && <div className="loading">Loading emails...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <AnimatePresence mode="popLayout">
          {Array.isArray(emails) && emails.length > 0 ? (
            emails.map((email, index) => (
              <motion.div
                key={email.id}
                className="email-item"
                onClick={() => handleEmailClick(email.id)}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -100,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                layout
              >
                <div className="email-left">
                  <motion.div className="sender-avatar" whileHover={{ scale: 1.1 }}>
                    <FaGithub className="avatar-icon" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, color: "#ffd700" }}>
                    <FaStar className="star-icon" />
                  </motion.div>
                  <div className="sender-info">
                    <span className="sender-name">{email.name}</span>
                    <span className="sender-email">{email.sender}</span>
                  </div>
                </div>
                <div className="email-content">
                  <h3 className="email-subject">{email.subject}</h3>
                  <p>{email.body}</p>
                  <span className="email-timestamp">
                    {new Date(email.timestamp).toLocaleString()}
                  </span>
                </div>
                <motion.button
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, email.id)}
                  whileHover={{ scale: 1.2, color: "#ff3b3b" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <div className="no-emails">No emails found</div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default EmailList;
