import './CompletedModal.css';

function CompletedModal({ onClose }) {

  return (
    <div className="completed-modal-container">
      <div className="completed-modal-text-container">
        Thanks, your order will be ready soon!
      </div>
      <div className="completed-modal-btn-container">
        <button onClick={onClose}>Start New Order</button>
      </div>
    </div>
  );
}

export default CompletedModal;
