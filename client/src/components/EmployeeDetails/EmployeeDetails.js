import React, { useState, useEffect } from 'react';
import './EmployeeDetails.css'; // Create a matching CSS file for employee details
import { updateEmployee, deleteEmployee } from '../../api/Employee'; // Import Employee API functions
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import Alert from '../Alert/Alert'; // Import the Alert component

function EmployeeDetails({ selectedItem, onItemUpdate, onItemDelete }) {
  
    const [editedEmployee, setEditedEmployee] = useState(null);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for showing success alert
    const [successMessage, setSuccessMessage] = useState(''); // Store dynamic success message

    useEffect(() => {
      setEditedEmployee(selectedItem);
      setError(null);
    }, [selectedItem]);

    if (!selectedItem) {
      return (
        <div className="details-panel">
          <p>Select an employee to view details</p>
        </div>
      );
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        await updateEmployee(editedEmployee); // Call the employee update API
        onItemUpdate(editedEmployee);
        setError(null);
        setSuccessMessage(`Employee "${editedEmployee.name}" updated successfully!`);
        setShowSuccessAlert(true); // Show success alert when save is successful
      } catch (error) {
        console.error('Error updating employee:', error);
        setError(error.message);
      }
    };

    const handleDelete = async () => {
      try {
        await deleteEmployee(editedEmployee.employeeid); // Call the employee delete API
        onItemDelete(editedEmployee.employeeid);
        setError(null);
        setSuccessMessage(`Employee "${editedEmployee.name}" deleted successfully!`);
        setShowSuccessAlert(true); // Show deletion alert when employee is deleted
        setShowDeleteModal(false); // Close modal after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
        setError(error.message);
      }
    };

    return (
      <div className="details-panel">
        <h2>Employee Details</h2>
        
        {/* Show success alert when entry is updated or deleted */}
        {showSuccessAlert && (
          <Alert 
            message={successMessage} 
            onClose={() => setShowSuccessAlert(false)} 
          />
        )}

        {error && <p className="error-message">{error}</p>}
        
        <div>
          <label>Employee ID:</label>
          <input 
            type="text" 
            name="employeeid" 
            value={editedEmployee?.employeeid || ''} 
            readOnly 
          />
        </div>

        <div>
          <label>Name:</label>
          <textarea 
            name="name" 
            value={editedEmployee?.name || ''} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Salary:</label>
          <textarea 
            name="salary" 
            value={editedEmployee?.salary || ''} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Position:</label>
          <textarea 
            name="position" 
            value={editedEmployee?.position || ''} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button className='save-button' onClick={handleSave}>Save</button>
          {/* Trigger modal when Delete is clicked */}
          <button className='delete-button' onClick={() => setShowDeleteModal(true)}>Delete</button>
        </div>

        {/* Include Delete Confirmation Modal */}
        <DeleteConfirmationModal
          show={showDeleteModal}
          itemName={editedEmployee?.name}
          onClose={() => setShowDeleteModal(false)} // Close modal without deleting
          onConfirm={handleDelete} // Proceed with deletion
        />
      </div>
    );
}

export default EmployeeDetails;