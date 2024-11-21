import React, { useState } from 'react';
import './CashierPage.css';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/logo.png";
import OrderTable from '../../components/OrderTable/OrderTable';

function CashierPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderData, setOrderData] = useState([]); // Ensure orderData includes ordernum
  const [activePage, setActivePage] = useState("Cashier");
  
  const navigate = useNavigate();

  // Handle selecting an item from the table
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Handle deleting an order
  const handleItemDelete = () => {
    if (selectedItem) {
      setOrderData(prevData => 
        prevData.filter(item => item.ordernum !== selectedItem.ordernum)
      );
      setSelectedItem(null);
    }
  };

  // Handle completing an order
  const handleItemComplete = () => {
    if (selectedItem) {
      alert(`Order ${selectedItem.ordernum} has been completed!`);
      handleItemDelete(); // Assume completion also removes the order from uncompleted orders
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="header-container">
        <img src={Logo} alt="Logo" />
        <h1>Cashier</h1>
        <div className="bar"></div>

        {/* Navigation */}
        <div className='cashier-nav'>
          <span 
            onClick={() => navigate("/orders")} 
            className={activePage === "Cashier" ? "active-nav" : ""}
          >
            Uncompleted Orders
          </span>
          <span 
            onClick={() => navigate("/employees")} 
            className={activePage === "Employees" ? "active-nav" : ""}
          >
            Employees
          </span>
          <span 
            onClick={() => navigate("/reports")} 
            className={activePage === "Reports" ? "active-nav" : ""}
          >
            Reports
          </span>
        </div>

        <div className="header-right">
          <button className='sign-out-button' onClick={() => navigate('/')}>Sign Out</button>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="inventory-container">
        <div className="inventory-header">
          <h1>Uncompleted Orders</h1>
          <button className="create-order-button" onClick={() => alert("Create new order coming soon!")}>
            Create New Order
          </button>
        </div>

        <div className="inventory-body">
          <OrderTable 
            data={orderData} 
            setData={setOrderData} 
            onSelectItem={handleSelectItem} 
          />
        </div>
      </div>

      {/* Popup Order Details */}
      {selectedItem && (
        <div className="order-details-popup">
          <h2>Order Details</h2>
          <p><strong>ID:</strong> {selectedItem.ordernum}</p>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          <p><strong>Price:</strong> ${selectedItem.price.toFixed(2)}</p>
          
          <div className="popup-actions">
            <button className="complete-order-button" onClick={handleItemComplete}>
              Complete Order
            </button>
            <button className="delete-order-button" onClick={handleItemDelete}>
              Delete Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CashierPage;
