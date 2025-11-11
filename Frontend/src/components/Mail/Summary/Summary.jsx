import './Summary.css';

function Summary({ onClose, result }) {
  return (
    <div className="summary-container">
      <button className="close-btn flex justify-center items-center" onClick={onClose}><span><i class="fa-solid fa-xmark"></i></span></button>
      <h2>Email Summary</h2>
      <p>
        {result}
      </p>
    </div>
  );
}

export default Summary;