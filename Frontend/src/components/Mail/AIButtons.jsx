import { FaReply, FaRobot } from "react-icons/fa";
import { BiMessageAltDetail } from "react-icons/bi";
import { StyledButtons } from "./AIButtons.styles";
import { StarIcon } from "./StarIcon";
import Summary from "./Summary/Summary";
import { useState } from "react";
import Reply from "./Reply/Reply";

function AIButtons({ onSummaryShow, mail }) {
  const [showSummary, setShowSummary] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [summaryResult, setSummaryResult] = useState();
  const [replyResult, setReplyResult] = useState();

  const handleSummarize = async () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const credentials = btoa(`${email}:${password}`);

    const summaryResponse = await fetch(
      "https://neuromail-backend.onrender.com/email-app/api/emails/analyze?type=summarize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          subject: mail.subject,
          body: mail.body,
        }),
      }
    );
    // console.log(mail.subject);
    if (!summaryResponse.ok) {
      const errorData = await summaryResponse.json();
      throw new Error(errorData.message || "Failed to get summary");
    }

    const data = await summaryResponse.json();
    // console.log("Summary response:", data);

    setShowSummary(true);
    setSummaryResult(data.result);
    onSummaryShow();
  };

  const handleAIReply = async () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const credentials = btoa(`${email}:${password}`);

    const replySuggestion = await fetch(
      "http://localhost:8080/email-app/api/emails/analyze?type=reply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          subject: mail.subject,
          body: mail.body,
        }),
      }
    );
    // console.log(mail.subject);
    if (!replySuggestion.ok) {
      const errorData = await replySuggestion.json();
      throw new Error(errorData.message || "Failed to get summary");
    }

    // console.log(mail.body);
    const data = await replySuggestion.json();
    // console.log("Server Response",data);

    setShowReply(true);
    setReplyResult(data.result);
    onSummaryShow();
  };

  return (
    <>
      <StyledButtons>
        <button className="animated-btn">
          <FaReply />
          <span>Reply</span>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`star-${num}`}>
              <StarIcon />
            </div>
          ))}
        </button>

        <button className="animated-btn" onClick={handleSummarize}>
          <BiMessageAltDetail />
          <span>Summarize</span>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`star-${num}`}>
              <StarIcon />
            </div>
          ))}
        </button>

        <button className="animated-btn" onClick={handleAIReply}>
          <FaRobot />
          <span>AI Reply</span>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`star-${num}`}>
              <StarIcon />
            </div>
          ))}
        </button>
      </StyledButtons>

      {showSummary && (
        <Summary onClose={() => setShowSummary(false)} result={summaryResult} />
      )}
      {showReply && <Reply onClose={() => setShowReply(false)} result={replyResult} mail={mail}/>}
    </>
  );
}

export default AIButtons;
