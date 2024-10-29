import './NewOrderPage.css'
import Logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom'

function NewOrderPage() {

  const navigate = useNavigate();

  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>New Order</h1>
      </div>
      <div class="menu-item-container">
        <button onClick={() => navigate("/food-item")}>Bowl</button>
        <button onClick={() => navigate("/food-item")}>Plate</button>
        <button onClick={() => navigate("/food-item")}>Bigger Plate</button>
        <button onClick={() => navigate("/food-item")}>A La Carte</button>
        <button onClick={() => navigate("/food-item")}>Appetizer</button>
        <button onClick={() => navigate("/food-item")}>Drink</button>
      </div>
      <div class="nav-btn-container">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  )
}

export default NewOrderPage
