import './CheckoutPage.css'
import Logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom'

function CheckoutPage() {

  const navigate = useNavigate();

  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>Checkout</h1>
      </div>
      <div class="order-container">
        {/* Populate orders here */}
        <h3>Placeholder order</h3>
      </div>
      <div class="nav-btn-container">
        <button onClick={() => navigate("/new-order")}>Back</button>
        <button>Tendered</button>
      </div>
    </div>
  )
}

export default CheckoutPage