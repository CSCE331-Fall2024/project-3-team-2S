import './CashierReceipt.css';
import { useState } from 'react';
import CashierReceiptItem from '../CashierReceiptItem/CashierReceiptItem';
import { useCashierOrderContext } from '../../context/CashierOrderContext';

function CashierReceipt() {
  const { selectedReceiptItem } = useCashierOrderContext();

  const [receiptItems, setReceiptItems] = useState([
    {
      id: 1,
      menuItemType: "Plate",
      side: "Fried Rice",
      entrees: ["Orange Chicken", "Grilled Teriyaki"],
      alacarte: null,
      appetizer: null,
      drink: null,
      price: 3,
    },
    {
      id: 2,
      menuItemType: "Appetizer",
      side: null,
      entrees: ["Mushroom Chicken"],
      alacarte: null,
      appetizer: null,
      drink: null,
      price: 5,
    },
    {
      id: 3,
      menuItemType: "Appetizer",
      side: null,
      entrees: ["Mushroom Chicken"],
      alacarte: null,
      appetizer: null,
      drink: null,
      price: 5,
    },
  ]);

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
          selected={selectedReceiptItem?.id === item.id} // Check unique id for selection
        />
      ))}
    </div>
  );
}

export default CashierReceipt;
