import './CashierReceipt.css'
import CashierReceiptItem from '../CashierReceiptItem/CashierReceiptItem'

function CashierReceipt() {
  return (
    <div className="cashier-receipt">
      <CashierReceiptItem
        menuItemType="Plate"
        side="Fried Rice"
        entrees={["Orange Chicken, Grilled Teriyaki"]}
        alacarte={null}
        appetizer={null}
        drink={null}
        price={3}
      />
      <CashierReceiptItem
        menuItemType="Appetizer"
        side={null}
        entrees={["Mushroom Chicken"]}
        alacarte={null}
        appetizer={null}
        drink={null}
        price={5}
      />
    </div>
  )
}

export default CashierReceipt
