import './CheckoutCard.css';

function CheckoutCard({ menuItemType, orderDetails, price, handleCardRemove }) {

  return (
    <div className="card-container">
      <div className="info-container">
        <div className="text-container">
          <h2>{menuItemType}</h2>
          <h3>{orderDetails}</h3>
        </div>
        <div className="price-container">
          <h2>${price}</h2>
        </div>
      </div>
      <div className="btn-container">
        <button>Edit</button>
        <button onClick={handleCardRemove}>Remove</button>
      </div>
    </div>
  );
}

export default CheckoutCard;
