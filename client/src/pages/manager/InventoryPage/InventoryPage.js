import React, { useState } from 'react'; // Add this line to import useState
import './InventoryPage.css';
import { useNavigate } from 'react-router-dom'; // Import for routing
import Logo from "../../../assets/images/logo.png";
import InventoryTable from '../../../components/InventoryTable/InventoryTable';
import InventoryDetails from '../../../components/InventoryDetails/InventoryDetails';
import AddIngredientPanel from '../../../components/AddIngredientPanel/AddIngredientPanel'; // Import the new component

function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [activePage, setActivePage] = useState("Inventory"); // Track the active page
  
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle selecting an item from the table
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Handle updating an existing item
  const handleItemUpdate = (updatedItem) => {
    setInventoryData(prevData => 
      prevData.map(item => 
        item.ingrid === updatedItem.ingrid ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  // Handle deleting an item
  const handleItemDelete = (deletedItemId) => {
    setInventoryData(prevData => 
      prevData.filter(item => item.ingrid !== deletedItemId)
    );
    setSelectedItem(null);
  };

  // Handle adding a new ingredient
  const handleNewIngredientAdd = (newItem) => {
    setInventoryData(prevData => [...prevData, newItem]); // Add the new item to the inventory list
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
        <h1>Manager</h1>
        <div className='bar'></div>
        
        {/* Manager Navigation */}
        <div className='manager-nav'>
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

        {/* Sign Out Button */}
        <button className='sign-out-button' onClick={() => navigate('/')}>Sign Out</button>
      </div>

      <div className="inventory-container">
        <div className="inventory-header">
        <h1>Inventory</h1>
          <div className="inventory-body">
            <InventoryTable 
              data={inventoryData} 
              setData={setInventoryData} 
              onSelectItem={handleSelectItem} 
            />
          </div>
        </div>

        <InventoryDetails 
          selectedItem={selectedItem} 
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />

        <div className="divider"></div>

        <AddIngredientPanel 
          onItemAdd={handleNewIngredientAdd} 
        />
      </div>
    </div>
  );
}

export default InventoryPage;