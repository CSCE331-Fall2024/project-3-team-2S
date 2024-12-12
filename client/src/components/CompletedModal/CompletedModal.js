import './CompletedModal.css';

/**
 * CompletedModal component for displaying a completion message with order details.
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onClose - Function to handle closing the modal.
 * @param {string} props.orderNumber - The order number to display.
 * @param {boolean} [props.cashier=true] - Indicates if the cashier-specific button should be displayed.
 */
function CompletedModal({ onClose, orderNumber, cashier = true }) {
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
