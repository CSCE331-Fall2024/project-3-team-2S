import React, { useState } from 'react';
import './EmployeePage.css'; // Make sure to create this CSS file or rename it from InventoryPage.css
import { useNavigate } from 'react-router-dom'; // Import for routing
import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable'; // Import EmployeeTable component
import EmployeeDetails from '../../../components/EmployeeDetails/EmployeeDetails'; // Import EmployeeDetails component
import AddEmployeePanel from '../../../components/AddEmployeePanel/AddEmployeePanel'; // Import AddEmployeePanel component
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';

function EmployeePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [activePage] = useState("Employees"); // Track the active page
  
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

  return (
    <div>
      <ManagerHeader activePage={activePage} />

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