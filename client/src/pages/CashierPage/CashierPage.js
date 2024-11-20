import React, { useState } from 'react';
import './CashierPage.css';
import { useNavigate } from 'react-router-dom'; // Import for routing
import Logo from "../../assets/images/logo.png";
import OrderTable from '../../components/OrderTable/OrderTable';

function CashierPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [activePage, setActivePage] = useState("Cashier"); // Track the active page
  
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle selecting an item from the table
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Handle updating an existing item
  const handleItemUpdate = (updatedItem) => {
    setOrderData(prevData => 
      prevData.map(item => 
        item.ingrid === updatedItem.ingrid ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  // Handle deleting an item
  const handleItemDelete = (deletedItemId) => {
    setOrderData(prevData => 
      prevData.filter(item => item.ingrid !== deletedItemId)
    );
    setSelectedItem(null);
  };

  // Handle navigation clicks
  const handleNavClick = (text) => {
    if (text === "Inventory") {
      navigate("/inventory"); // Navigate to Inventory page
    } else if (text === "Employees") {
      navigate("/employees"); // Navigate to Employee page
    } else if (text === "Reports") {
      navigate("/reports"); // Navigate to Reports page
    }
  };

  return (
    <div>
      <div className="header-container">
        <img src={Logo} alt="Logo" />
        <h1>Cashier</h1>
        <div className='bar'></div>
        
        {/* Manager Navigation */}
        <div className='cashier-nav'>
          <span 
            onClick={() => handleNavClick("Inventory")}
            className={activePage === "Inventory" ? "active-nav" : ""}
          >
            Inventory
          </span>
          <span 
            onClick={() => handleNavClick("Employees")}
            className={activePage === "Employees" ? "active-nav" : ""}
          >
            Employees
          </span>
          <span 
            onClick={() => handleNavClick("Reports")}
            className={activePage === "Reports" ? "active-nav" : ""}
          >
            Reports
          </span>
        </div>

        <div className="header-right">
          <button className='sign-out-button' onClick={() => navigate('/')}>Sign Out</button>
        </div>
      </div>

      <div className="inventory-container">
        <div className="inventory-header">
          <h1>Inventory</h1>
          <div className="inventory-body">
            <OrderTable 
              data={orderData} 
              setData={setOrderData} 
              onSelectItem={handleSelectItem} 
            />
          </div>
        </div>

        {/* <InventoryDetails 
          selectedItem={selectedItem} 
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        /> */}

        <div className="divider"></div>

      </div>
    </div>
  );
}

export default CashierPage;