import './CompletedModal.css';

function CompletedModal({ onClose, orderNumber, cashier = true
}) {
  return (
    <div className="completed-modal-container">
      <div className="completed-modal-text-container">
        Thanks, your order will be ready soon!
        <hr></hr>
        <p>Order Number: </p>
        <h1>{orderNumber}</h1>
        <hr></hr>
      </div>
      <div className="completed-modal-btn-container">
        {cashier && <button onClick={onClose}>Start New Order</button>}
        {!cashier && <button onClick={onClose}>Back to Cashier Home</button>}
      </div>
    </div>
  );
}

export default CompletedModal;