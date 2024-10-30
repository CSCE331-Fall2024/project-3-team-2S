import './NewOrderPage.css'
import Logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom'
import { useOrderContext } from '../../context/OrderContext'

function NewOrderPage() {

  const navigate = useNavigate();
  const { setMenuItemType } = useOrderContext();
  
  const handleMenuItemSelection = (menuItemType) => {
    setMenuItemType(menuItemType);
    navigate("/food-item");
  }

  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>New Order</h1>
      </div>
      <div class="menu-item-container">
        <button onClick={() => handleMenuItemSelection("Bowl")}>Bowl</button>
        <button onClick={() => handleMenuItemSelection("Plate")}>Plate</button>
        <button onClick={() => handleMenuItemSelection("Bigger Plate")}>Bigger Plate</button>
        <button onClick={() => handleMenuItemSelection("A La Carte")}>A La Carte</button>
        <button onClick={() => handleMenuItemSelection("Appetizer")}>Appetizer</button>
        <button onClick={() => handleMenuItemSelection("Drink")}>Drink</button>
      </div>
      <div class="nav-btn-container">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  )
}

export default NewOrderPage
