import React, { useState } from 'react';
import './AddEmployeePanel.css';
import { addEmployee } from '../../api/Employee'; // Import Employee API function
import Alert from '../Alert/Alert'; // Import Alert component

/**
 * AddEmployeePanel component for adding a new employee.
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onItemAdd - Function to handle adding the new employee.
 */
function AddEmployeePanel({ onItemAdd }) {
  const [newEmployee, setNewEmployee] = useState({ employeeid: '', name: '', salary: '', position: '' });
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [addedEmployeeName, setAddedEmployeeName] = useState(''); // Store added employee name

  /**
   * Handles input change events for the form fields.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handles adding a new employee.
   * @async
   */
  const handleAdd = async () => {
    try {
      await addEmployee(newEmployee); // Call API to add new employee
      onItemAdd(newEmployee); // Pass the new employee back to parent component
      setAddedEmployeeName(newEmployee.name); // Set the added employee name for success message
      setShowSuccessAlert(true); // Show success alert when employee is successfully added
      setNewEmployee({ employeeid: '', name: '', salary: '', position: '' }); // Reset form after adding
    } catch (error) {
      console.error('Error adding employee:', error);
      setError(error.message);
    }
  };

  return (
    <div className="add-employee-panel">
      <h2>Add New Employee</h2>

      {/* Show success alert when entry is added */}
      {showSuccessAlert && (
        <Alert 
          message={`New employee "${addedEmployeeName}" added successfully!`} 
          onClose={() => setShowSuccessAlert(false)} 
        />
      )}

      {error && <p className="error-message">{error}</p>}

      <div>
        <label>Employee ID:</label>
        <input 
          type="text" 
          name="employeeid" 
          value={newEmployee.employeeid} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={newEmployee.name} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Salary:</label>
        <input 
          type="text" 
          name="salary" 
          value={newEmployee.salary} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Position:</label>
        <input 
          type="text" 
          name="position" 
          value={newEmployee.position} 
          onChange={handleInputChange}
        />
      </div>

      <div className="button-container">
        <button className="save-button" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default AddEmployeePanel;
