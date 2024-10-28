import './NewOrderPage.css'
import Logo from "../../assets/images/logo.png"

function NewOrderPage() {
  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>New Order</h1>
      </div>
      <div class="menu-item-container">
        <button
          onClick={() => {
            console.log("Redirect to food item page.")
          }}
        >
            Bowl
        </button>
        <button>Plate</button>
        <button>Bigger Plate</button>
        <button>A La Carte</button>
        <button>Appetizer</button>
        <button>Drink</button>
      </div>
      <div class="nav-btn-container">
        <button>Back</button>
        <button>Checkout</button>
      </div>
    </div>
  )
}

export default NewOrderPage
