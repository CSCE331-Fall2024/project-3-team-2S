import './CashierOrderPage.css';
import Logo from "../../assets/images/logo.png";
import CashierReceipt from '../../components/CashierReceipt/CashierReceipt';
import { useCashierOrderContext } from '../../context/CashierOrderContext';

/**
 * CashierOrderPage Component
 * Displays the cashier interface for creating and managing orders, including menu items and receipt items.
 *
 * @component
 * @returns {JSX.Element} The rendered CashierOrderPage component.
 */
function CashierOrderPage() {
  // Destructure state and actions from the CashierOrderContext
  const {
    currentMenuItemType, // The currently selected menu item type (e.g., 'Bowl', 'Plate').
    receiptItems,        // Array of items currently added to the receipt.
    setReceiptItems,     // Function to update the receipt items state.
    selectReceiptItem,   // Function to select a specific receipt item.
    addToReceiptItem,    // Function to add additional details to a selected receipt item.
  } = useCashierOrderContext();

  /**
   * Adds a new receipt item based on the selected menu item type.
   *
   * @param {string} menuItemType - The type of menu item to add (e.g., 'Bowl', 'Plate').
   */
  const addReceiptItem = (menuItemType) => {
    const newItem = {
      id: receiptItems.length + 1, // Assign a unique ID based on the length of the receiptItems array.
      menuItemType,
      side: null,
      entrees: [],
      alacarte: null,
      appetizer: null,
      drink: null,
      price: 5, // Default price for each item.
    };

    // Update the receipt items state and select the newly added item.
    setReceiptItems((prevItems) => [...prevItems, newItem]);
    selectReceiptItem(newItem);
  };

  return (
    <div className="cashier-order-page-container">
      <div className="cashier-order-page-top">
        <div className="cashier-fooditems-container">
          <div className="cashier-menuitems-container">
            {/* Buttons for adding new menu items to the receipt */}
            <button onClick={() => addReceiptItem('Bowl')}>New Bowl</button>
            <button onClick={() => addReceiptItem('Plate')}>New Plate</button>
            <button onClick={() => addReceiptItem('Bigger Plate')}>New Bigger Plate</button>
            <button onClick={() => addReceiptItem('A La Carte')}>New A La Carte</button>
            <button onClick={() => addReceiptItem('Appetizer')}>New Appetizer</button>
            <button onClick={() => addReceiptItem('Drink')}>New Drink</button>
          </div>

          {/* Conditional rendering for sides and entrees based on the current menu item type */}
          {['Bowl', 'Plate', 'Bigger Plate', 'A La Carte'].includes(currentMenuItemType) && (
            <>
              <div className="cashier-sides">
                <h3>Sides</h3>
                <div className="cashier-btns">
                  {/* Buttons for adding sides */}
                  <button onClick={() => addToReceiptItem('side', 'White Rice')}>White Rice</button>
                  <button onClick={() => addToReceiptItem('side', 'Fried Rice')}>Fried Rice</button>
                  <button onClick={() => addToReceiptItem('side', 'Super Greens')}>Super Greens</button>
                </div>
              </div>
              <div className="cashier-entrees">
                <h3>Entrees</h3>
                <div className="cashier-btns">
                  {/* Buttons for adding entrees */}
                  <button onClick={() => addToReceiptItem('entree', 'Orange Chicken')}>Orange Chicken</button>
                  <button onClick={() => addToReceiptItem('entree', 'Teriyaki')}>Teriyaki</button>
                  <button onClick={() => addToReceiptItem('entree', 'Mushroom Chicken')}>Mushroom Chicken</button>
                </div>
              </div>
            </>
          )}

          {/* Conditional rendering for appetizers */}
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

          {/* Conditional rendering for drinks */}
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

        {/* Receipt display */}
        <div className="cashier-receipt-container">
          <CashierReceipt />
        </div>
      </div>

      <div className="cashier-order-page-bottom">
        {/* Bottom action buttons */}
        <button>Delete</button>
        <button>Repeat</button>
        <button>Pay</button>
      </div>
    </div>
  );
}

export default CashierOrderPage;
