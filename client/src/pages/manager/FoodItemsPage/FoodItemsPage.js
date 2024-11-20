import React, { useState } from 'react';
import './FoodItemsPage.css'; // Create a CSS file for FoodItemsPage
import { useNavigate } from 'react-router-dom'; // Import for routing
import Logo from "../../../assets/images/logo.png";
import FoodItemsTable from '../../../components/FoodItemsTable/FoodItemsTable'; // Import FoodItemsTable component
import FoodItemsDetails from '../../../components/FoodItemsDetails/FoodItemsDetails'; // Import FoodItemsDetails component
import AddFoodItemsPanel from '../../../components/AddFoodItemsPanel/AddFoodItemsPanel'; // Import AddFoodItemsPanel component
import ManagerProfileDropdown from '../../../components/ManagerProfileDropdown/ManagerProfileDropdown'; // Import ManagerProfile component

function FoodItemsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [foodItemsData, setFoodItemsData] = useState([]);
  const [activePage] = useState("Food Items"); // Track the active page
  
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle selecting an item from the table
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Handle updating an existing item
  const handleItemUpdate = (updatedItem) => {
    setFoodItemsData(prevData => 
      prevData.map(item => 
        item.foodid === updatedItem.foodid ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  // Handle deleting an item
  const handleItemDelete = (deletedItemId) => {
    setFoodItemsData(prevData => 
      prevData.filter(item => item.foodid !== deletedItemId)
    );
    setSelectedItem(null);
  };

  // Handle adding a new food item
  const handleNewFoodItemAdd = (newItem) => {
    setFoodItemsData(prevData => [...prevData, newItem]); // Add new item to food items list
  };

  // Handle navigation clicks
  const handleNavClick = (text) => {
    if (text === "Order History") {
      navigate("/orderhistory"); // Navigate to Order History page
    } 
    else if (text === "Inventory") {
      navigate("/inventory"); // Navigate to Inventory page
    } 
    else if (text === "Food Items") {
      navigate("/fooditems"); // Navigate to Food Items page
    } 
    else if (text === "Employees") {
      navigate("/employees"); // Navigate to Employee page
    }
    else if (text === "Reports") {
      navigate("/reports"); // Navigate to Reports page
    }
  };

  return (
    <div>
      <div className="header-container">
        <img src={Logo} alt="Logo" className="logo"/>
        <h1>Manager</h1>
        <div className='bar'></div>
        
        {/* Manager Navigation */}
        <div className='manager-nav'>
          <span 
            onClick={() => handleNavClick("Order History")}
            className={activePage === "Order History" ? "active-nav" : ""}
          >
            Order History
          </span>
          <span 
            onClick={() => handleNavClick("Inventory")}
            className={activePage === "Inventory" ? "active-nav" : ""}
          >
            Inventory
          </span>
          <span 
            onClick={() => handleNavClick("Food Items")}
            className={activePage === "Food Items" ? "active-nav" : ""}
          >
            Food Items
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
            <div className='manager-profile-dropdown'>
              <ManagerProfileDropdown /> 
            </div>
            <button className='sign-out-button' onClick={() => navigate('/')}>Sign Out</button>
        </div>
      </div>

      <div className="fooditems-container">
        <div className="fooditems-header">
          <h1>Food Items</h1>
          <div className="fooditems-body">
            <FoodItemsTable 
              data={foodItemsData} 
              setData={setFoodItemsData} 
              onSelectItem={handleSelectItem} 
            />
          </div>
        </div>

        <FoodItemsDetails 
          selectedItem={selectedItem} 
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />

        <div className="divider"></div>

        <AddFoodItemsPanel 
          onItemAdd={handleNewFoodItemAdd} 
        />
      </div>
    </div>
  );
}

export default FoodItemsPage;