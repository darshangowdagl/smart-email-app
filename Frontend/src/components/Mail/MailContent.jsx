import "./MailContent.css";
import { FaGithub } from "react-icons/fa";

function MailContent({ mail }) {
  return (
    <div className="mail-content-container">
      <div className="mail-header">
        <h1 className="mail-title">{mail?.subject || "No Subject"}</h1>

        <div className="sender-details">
          <div className="sender-avatar">
            <FaGithub className="avatar-icon" />
          </div>
          <div className="sender-info">
            <span className="sender-name">
              {mail?.sender.split("@")[0].charAt(0).toUpperCase() +
                mail?.sender.split("@")[0].slice(1) || "Sender"}
            </span>
            <span className="sender-email">{mail?.sender || "EMAIL"}</span>
            <span className="recipient">
              to <span className="recipient-email">me</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mail-body">
        <p>{mail?.body || ``}</p>
      </div>
    </div>
  );
}

export default MailContent;
