import './CashierReceipt.css';
import CashierReceiptItem from '../CashierReceiptItem/CashierReceiptItem';
import { useCashierOrderContext } from '../../context/CashierOrderContext';

/** * CashierReceipt component for displaying a list of receipt items. * @component */
function CashierReceipt() {
  const { receiptItems, selectedReceiptItem } = useCashierOrderContext();

  return (
    <div className="cashier-receipt">
      {receiptItems.map((item) => (
        <CashierReceiptItem
          key={item.id}
          id={item.id}
          menuItemType={item.menuItemType}
          side={item.side}
          entrees={item.entrees}
          alacarte={item.alacarte}
          appetizer={item.appetizer}
          drink={item.drink}
          price={item.price}
          selected={selectedReceiptItem?.id === item.id}
        />
      ))}
    </div>
  );
}

export default CashierReceipt;
