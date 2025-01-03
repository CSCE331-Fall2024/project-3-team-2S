import './Receipt.css';

function Receipt({ orders, handlePlaceOrder }) {

  function calculateSubtotal(orders) {
    return orders.reduce((subtotal, order) => {
      return subtotal + (order.rewards ? 0 : order.price);
    }, 0);
  }

  
  function calculateTax(orders) {
    return parseFloat((calculateSubtotal(orders) * 0.0625).toFixed(2));
  }

  return (
    <div className="receipt-container">
      <div className="receipt">
        <div className="receipt-item">
          <span>Subtotal:</span>
          <span>${calculateSubtotal(orders).toFixed(2)}</span>
        </div>
        <div className="receipt-item">
          <span>Tax:</span>
          <span>${calculateTax(orders).toFixed(2)}</span>
        </div>
        <div className="receipt-item total">
          <span>Total:</span>
          <span>${(calculateSubtotal(orders) + calculateTax(orders)).toFixed(2)}</span>
        </div>
        {orders.length > 0 && <button onClick={() => handlePlaceOrder()}>Place Order</button>}
      </div>
    </div>
  );
}

export default Receipt;