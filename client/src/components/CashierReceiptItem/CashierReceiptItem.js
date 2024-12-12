import './CashierReceiptItem.css';
import { useCashierOrderContext } from '../../context/CashierOrderContext';

/**
 * CashierReceiptItem component for displaying individual receipt items.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the receipt item.
 * @param {string} props.menuItemType - The type of menu item.
 * @param {string} [props.side] - The side dish, if applicable.
 * @param {string[]} [props.entrees] - The array of entrees, if applicable.
 * @param {string} [props.alacarte] - The a la carte item, if applicable.
 * @param {string} [props.appetizer] - The appetizer, if applicable.
 * @param {string} [props.drink] - The drink, if applicable.
 * @param {number} props.price - The price of the receipt item.
 * @param {boolean} props.selected - Whether the receipt item is selected.
 */
function CashierReceiptItem({ id, menuItemType, side, entrees, alacarte, appetizer, drink, price, selected }) {
  const { selectReceiptItem } = useCashierOrderContext();
  
  const receiptDetails = [
    side,
    ...(entrees || []),
    alacarte,
    appetizer,
    drink
  ].filter(Boolean).join(', ');

  /**
   * Handles the click event to select the receipt item.
   */
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
