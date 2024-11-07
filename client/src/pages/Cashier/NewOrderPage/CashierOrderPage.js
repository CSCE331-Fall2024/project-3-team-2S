import './CashierOrderPage.css'
import Logo from "../../../assets/images/logo.png"

function CashierOrderPage() {

  return (
    <div className="cashier-order-page-container">
      <div className="cashier-order-page-top">
        <div className="cashier-fooditems-container">
          <div className="cashier-menuitems-container">
            <button>New Bowl</button>
            <button>New Plate</button>
            <button>New Bigger Plate</button>
            <button>New A La Carte</button>
            <button>New Appetizer</button>
            <button>New Drink</button>
          </div>
          <div className="cashier-sides">
            <h3>Sides</h3>
            <div className="cashier-btns">
              <button>White Rice</button>
              <button>Fried Rice</button>
              <button>Super Greens</button>
            </div>
          </div>
          <div className="cashier-entrees">
            <h3>Entrees</h3>
            <div className="cashier-btns">
              <button>Orange Chicken</button>
              <button>Teriyaki</button>
              <button>Mushroom Chicken</button>
            </div>
          </div>
          <div className="cashier-appetizers">
            <h3>Appetizers</h3>
            <div className="cashier-btns">
              <button>Cream Cheese Rangoon</button>
              <button>Apple Pie Roll</button>
              <button>Apple Slices</button>
            </div>
          </div>
          <div className="cashier-drinks">
            <h3>Drinks</h3>
            <div className="cashier-btns">
              <button>Aquafina</button>
              <button>Dr Pepper</button>
              <button>Sweet Tea</button>
            </div>
          </div>
        </div>
        <div className="cashier-receipt-container">
          <h1>Placeholder for receipt component</h1>
        </div>
      </div>
      <div className="cashier-order-page-bottom">
        <button>Delete</button>
        <button>Repeat</button>
        <button>Pay</button>
      </div>
    </div>
  )
}

export default CashierOrderPage