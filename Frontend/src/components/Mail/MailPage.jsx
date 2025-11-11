import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import HomeNavbar from "../Home/HomeNavbar";
import Features from "./Features";
import MailContent from "./MailContent";
import AIButtons from "./AIButtons";

function MailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMail, setSelectedMail] = useState(null);
  const summaryRef = useRef(null);
  const { state } = useLocation();

  useEffect(() => {
    if(state?.email) {
      setSelectedMail(state.email);
    }
    else {
      // navigate("/");
      return;
    }
  }, [id, state]);

  const handleSummaryShow = () => {
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <HomeNavbar />
      <div className="mail-page">
        <Features />
        <MailContent mail={selectedMail} />
      </div>

      <div ref={summaryRef}>
        <AIButtons onSummaryShow={handleSummaryShow} mail={selectedMail}/>
      </div>
    </>
  );
}

export default MailPage;
