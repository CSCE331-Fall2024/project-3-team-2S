import React, { useState } from 'react';
import './FoodItemsPage.css';
import { useNavigate } from 'react-router-dom'; // Import for routing
import Logo from "../../../assets/images/logo.png";
import ManagerProfileDropdown from '../../../components/ManagerProfileDropdown/ManagerProfileDropdown'; // Import ManagerProfile component

function ItemsPage() {
  const [activePage] = useState("Food Items"); // Track the active page
  
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle navigation clicks
  const handleNavClick = (text) => {
    if (text === "Order History") {
      navigate("/orderhistory"); // Navigate to Order History page
    } 
    else if (text === "Inventory") {
      navigate("/inventory"); // Navigate to Inventory page
    } 
    else if (text === "Food Items") {
      navigate("/fooditems"); // Navigate to Items page
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

    </div>
  );
}

export default ItemsPage;