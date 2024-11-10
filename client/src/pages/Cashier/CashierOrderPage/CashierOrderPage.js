import './CashierOrderPage.css';
import Logo from "../../../assets/images/logo.png";
import CashierReceipt from '../../../components/CashierReceipt/CashierReceipt';
import { useCashierOrderContext } from '../../../context/CashierOrderContext';

function CashierOrderPage() {
  const {
    currentMenuItemType,
    receiptItems,
    setReceiptItems,
    selectReceiptItem,
    addToReceiptItem,
  } = useCashierOrderContext();

  const addReceiptItem = (menuItemType) => {
    const newItem = {
      id: receiptItems.length + 1,
      menuItemType,
      side: null,
      entrees: [],
      alacarte: null,
      appetizer: null,
      drink: null,
      price: 5,
    };

    setReceiptItems((prevItems) => [...prevItems, newItem]);
    selectReceiptItem(newItem);
  };

  return (
    <div className="cashier-order-page-container">
      <div className="cashier-order-page-top">
        <div className="cashier-fooditems-container">
          <div className="cashier-menuitems-container">
            <button onClick={() => addReceiptItem('Bowl')}>New Bowl</button>
            <button onClick={() => addReceiptItem('Plate')}>New Plate</button>
            <button onClick={() => addReceiptItem('Bigger Plate')}>New Bigger Plate</button>
            <button onClick={() => addReceiptItem('A La Carte')}>New A La Carte</button>
            <button onClick={() => addReceiptItem('Appetizer')}>New Appetizer</button>
            <button onClick={() => addReceiptItem('Drink')}>New Drink</button>
          </div>

          {['Bowl', 'Plate', 'Bigger Plate', 'A La Carte'].includes(currentMenuItemType) && (
            <>
              <div className="cashier-sides">
                <h3>Sides</h3>
                <div className="cashier-btns">
                  <button onClick={() => addToReceiptItem('side', 'White Rice')}>White Rice</button>
                  <button onClick={() => addToReceiptItem('side', 'Fried Rice')}>Fried Rice</button>
                  <button onClick={() => addToReceiptItem('side', 'Super Greens')}>Super Greens</button>
                </div>
              </div>
              <div className="cashier-entrees">
                <h3>Entrees</h3>
                <div className="cashier-btns">
                  <button onClick={() => addToReceiptItem('entree', 'Orange Chicken')}>Orange Chicken</button>
                  <button onClick={() => addToReceiptItem('entree', 'Teriyaki')}>Teriyaki</button>
                  <button onClick={() => addToReceiptItem('entree', 'Mushroom Chicken')}>Mushroom Chicken</button>
                </div>
              </div>
            </>
          )}

          {currentMenuItemType === 'Appetizer' && (
            <div className="cashier-appetizers">
              <h3>Appetizers</h3>
              <div className="cashier-btns">
                <button onClick={() => addToReceiptItem('appetizer', 'Cream Cheese Rangoon')}>Cream Cheese Rangoon</button>
                <button onClick={() => addToReceiptItem('appetizer', 'Apple Pie Roll')}>Apple Pie Roll</button>
                <button onClick={() => addToReceiptItem('appetizer', 'Apple Slices')}>Apple Slices</button>
              </div>
            </div>
          )}

          {currentMenuItemType === 'Drink' && (
            <div className="cashier-drinks">
              <h3>Drinks</h3>
              <div className="cashier-btns">
                <button onClick={() => addToReceiptItem('drink', 'Aquafina')}>Aquafina</button>
                <button onClick={() => addToReceiptItem('drink', 'Dr Pepper')}>Dr Pepper</button>
                <button onClick={() => addToReceiptItem('drink', 'Sweet Tea')}>Sweet Tea</button>
              </div>
            </div>
          )}
        </div>

        <div className="cashier-receipt-container">
          <CashierReceipt />
        </div>
      </div>
      <div className="cashier-order-page-bottom">
        <button>Delete</button>
        <button>Repeat</button>
        <button>Pay</button>
      </div>
    </div>
  );
}

export default CashierOrderPage;
