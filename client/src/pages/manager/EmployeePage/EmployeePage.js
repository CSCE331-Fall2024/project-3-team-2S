import React, { useState } from 'react';
import './EmployeePage.css'; // Make sure to create this CSS file or rename it from InventoryPage.css
import { useNavigate } from 'react-router-dom'; // Import for routing
import Logo from "../../../assets/images/logo.png";
import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable'; // Import EmployeeTable component
import EmployeeDetails from '../../../components/EmployeeDetails/EmployeeDetails'; // Import EmployeeDetails component
import AddEmployeePanel from '../../../components/AddEmployeePanel/AddEmployeePanel'; // Import AddEmployeePanel component

function EmployeePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [activePage, setActivePage] = useState("Employees"); // Track the active page
  
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle selecting an item from the table
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Handle updating an existing item
  const handleItemUpdate = (updatedItem) => {
    setEmployeeData(prevData => 
      prevData.map(item => 
        item.employeeid === updatedItem.employeeid ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  // Handle deleting an item
  const handleItemDelete = (deletedItemId) => {
    setEmployeeData(prevData => 
      prevData.filter(item => item.employeeid !== deletedItemId)
    );
    setSelectedItem(null);
  };

  // Handle adding a new employee
  const handleNewEmployeeAdd = (newItem) => {
    setEmployeeData(prevData => [...prevData, newItem]); // Add the new employee to the employee list
  };

  // Handle navigation clicks and update active page
  const handleNavClick = (text) => {
    setActivePage(text); // Set the active page

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

      <div className="employee-container">
        <div className="employee-header">
          <h1>Employees</h1>
          <div className="employee-body">
            <EmployeeTable 
              data={employeeData} 
              setData={setEmployeeData} 
              onSelectItem={handleSelectItem} 
            />
          </div>
        </div>

        <EmployeeDetails 
          selectedItem={selectedItem} 
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />

        <div className="divider"></div>

        <AddEmployeePanel 
          onItemAdd={handleNewEmployeeAdd} 
        />
      </div>
    </div>
  );
}

export default EmployeePage;