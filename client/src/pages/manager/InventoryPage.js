import './InventoryPage.css'
import Logo from "../../assets/images/logo.png"

function ExamplePage() {
  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>Inventory</h1>
        <button>Sign Out</button>
      </div>
      <div class="inventory-body">

      </div>
    </div>
  )
}

export default ExamplePage
