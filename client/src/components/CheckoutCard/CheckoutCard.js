import './CheckoutCard.css';

function CheckoutCard({ menuItemType, orderDetails, price, handleCardRemove, handleEditOrder, promo = false, promoOrder, currentOrder }) {

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

        <button style={{ width: promo ? '30%' : '48%' }} onClick={handleEditOrder}>
          Edit
        </button>
        <button style={{ width: promo ? '30%' : '48%' }} onClick={handleCardRemove}>
          Remove
        </button>
        {promo && ( <button style={{ width: '30%' }} onClick={() => promoOrder(currentOrder)}>
          Promo
        </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutCard;