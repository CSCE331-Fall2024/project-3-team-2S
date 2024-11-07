import './CashierReceiptItem.css';
import { useCashierOrderContext } from '../../context/CashierOrderContext';

function CashierReceiptItem({ id, menuItemType, side, entrees, alacarte, appetizer, drink, price, selected }) {
  const { selectReceiptItem } = useCashierOrderContext();
  
  const receiptDetails = [
    side,
    ...(entrees || []),
    alacarte,
    appetizer,
    drink
  ].filter(Boolean).join(', ');

  const handleClick = () => {
    selectReceiptItem({ id, menuItemType, side, entrees, alacarte, appetizer, drink, price });
  };

  return (
    <button
      className={`cashier-receipt-item-btn ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="cashier-receipt-item">
        <p>
          {menuItemType}: {receiptDetails} {selected && ' - SELECTED'}
        </p>
        {price && <p className="item-price">${price.toFixed(2)}</p>}
      </div>
    </button>
  );
}

export default CashierReceiptItem;
