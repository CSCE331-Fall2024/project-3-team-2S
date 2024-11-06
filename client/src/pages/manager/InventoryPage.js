import './InventoryPage.css'
import Logo from "../../assets/images/logo.png"
import InventoryTable from '../../components/InventoryTable/InventoryTable';

function InventoryPage() {
  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>Inventory</h1>
        <button className='sign-out-button'>Sign Out</button>
      </div>
      <div className="inventory-container">
        <div className="inventory-body">
          <InventoryTable />
        </div>
        <div className="details-panel">
          {/* Content for details panel goes here */}
        </div>
      </div>
    </div>
  )
}

export default InventoryPage
