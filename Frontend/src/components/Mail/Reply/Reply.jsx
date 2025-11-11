import "./Reply.css";

function Reply({ onClose, result, mail }) {
  const email = localStorage.getItem("email");

  return (
    <div className="reply-container">
      <button className="close-btn flex justify-center items-center" onClick={onClose}>
        <span><i class="fa-solid fa-xmark"></i></span>
      </button>
      <h2>AI Generated Reply</h2>
      <div className="reply-content">
        <div className="email-header">
          <p>
            <strong>To:</strong>{" "}
            <span className="recipient">{mail.sender}</span>
          </p>
          <p>
            <strong>Subject:</strong>{" "}
            <span className="subject">Replying to {mail.subject}</span>
          </p>
        </div>
        <div className="email-body">
        <p>Dear {mail.sender.split("@")[0].charAt(0).toUpperCase() + mail.sender.split("@")[0].slice(1)},</p>
          <p>
            {result}
          </p>
          <p>
            Please let me know if you need any additional information from my
            end.
          </p>
          <p>
            Best regards,
            <br />
            {email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)}
          </p>
        </div>
        <div className="reply-actions">
          <button className="action-btn send">Send</button>
          <button className="action-btn edit">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Reply;
