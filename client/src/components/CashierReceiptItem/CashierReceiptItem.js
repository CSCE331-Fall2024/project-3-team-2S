import './CashierReceiptItem.css';

function CashierReceiptItem({ menuItemType, side, entrees, alacarte, appetizer, drink, price }) {
  const receiptDetails = [
    side, 
    ...(entrees || []),
    alacarte, 
    appetizer, 
    drink
  ].filter(Boolean).join(', ');

  return (
    <button className="cashier-receipt-item-btn">
      <div className="cashier-receipt-item">
        <p>{receiptDetails}</p>
        {price && <p className="item-price">${price.toFixed(2)}</p>}
      </div>
    </button>
  );
}

export default CashierReceiptItem;
