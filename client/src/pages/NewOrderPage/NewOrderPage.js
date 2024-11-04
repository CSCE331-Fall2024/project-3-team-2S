import './NewOrderPage.css';
import Logo from "../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import { useEffect, useState } from 'react';

function NewOrderPage() {
  const navigate = useNavigate();
  const { setMenuItemType } = useOrderContext();
  
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  const handleMenuItemSelection = (menuItemType) => {
    setMenuItemType(menuItemType);
    navigate("/food-item");
  };

  return (
    <div>
      <div className="header-container">
        <img src={Logo} alt="Panda Express Logo" />
        <h1>New Order</h1>
        {customerId && (
        <div className="customer-id-display">
          Customer ID: {customerId}
        </div>
        )}
      </div>
      <div className="menu-item-container">
        <button onClick={() => handleMenuItemSelection("Bowl")}>Bowl</button>
        <button onClick={() => handleMenuItemSelection("Plate")}>Plate</button>
        <button onClick={() => handleMenuItemSelection("Bigger Plate")}>Bigger Plate</button>
        <button onClick={() => handleMenuItemSelection("A La Carte")}>A La Carte</button>
        <button onClick={() => handleMenuItemSelection("Appetizer")}>Appetizer</button>
        <button onClick={() => handleMenuItemSelection("Drink")}>Drink</button>
      </div>
      <div className="nav-btn-container">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
}

export default NewOrderPage;
