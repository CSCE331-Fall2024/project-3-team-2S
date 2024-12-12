import './CheckoutCard.css';

/**
 * CheckoutCard component for displaying a checkout card with order details.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.menuItemType - The type of menu item.
 * @param {string} props.orderDetails - Details of the order.
 * @param {number} props.price - The price of the order.
 * @param {function} props.handleCardRemove - Function to handle removing the card.
 * @param {function} props.handleEditOrder - Function to handle editing the order.
 * @param {boolean} [props.promo=false] - Indicates if the promo button should be displayed.
 * @param {function} props.promoOrder - Function to handle promo orders.
 * @param {Object} props.currentOrder - The current order details.
 * @param {function} props.handleRewards - Function to handle rewards.
 */
function CheckoutCard({ 
  menuItemType, 
  orderDetails, 
  price, 
  handleCardRemove, 
  handleEditOrder, 
  promo = false, 
  promoOrder, 
  currentOrder, 
  handleRewards 
}) {
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
        {promo && (
          <button style={{ width: '30%' }} onClick={() => promoOrder(currentOrder)}>
            Promo
          </button>
        )}
        <button style={{ width: promo ? '30%' : '48%' }} onClick={handleRewards}>
          Rewards
        </button>
      </div>
    </div>
  );
}

export default CheckoutCard;
