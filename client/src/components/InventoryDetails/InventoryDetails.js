import React, { useState, useEffect } from 'react';
import './InventoryDetails.css';
import { updateInventory, deleteInventory } from '../../api/Inventory';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import Alert from '../Alert/Alert'; // Import the Alert component

function InventoryDetails({ selectedItem, onItemUpdate, onItemDelete }) {
  
    const [editedItem, setEditedItem] = useState(null);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for showing success alert
    const [successMessage, setSuccessMessage] = useState(''); // Store dynamic success message

    useEffect(() => {
      setEditedItem(selectedItem);
      setError(null);
    }, [selectedItem]);

    if (!selectedItem) {
      return (
        <div className="details-panel">
          <p>Select an item to view details</p>
        </div>
      );
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        await updateInventory(editedItem);
        onItemUpdate(editedItem);
        setError(null);
        setSuccessMessage(`Entry "${editedItem.ingredient}" updated successfully!`);
        setShowSuccessAlert(true); // Show success alert when save is successful
      } catch (error) {
        console.error('Error updating item:', error);
        setError(error.message);
      }
    };

    const handleDelete = async () => {
      try {
        await deleteInventory(editedItem.ingrid);
        onItemDelete(editedItem.ingrid);
        setError(null);
        setSuccessMessage(`Entry "${editedItem.ingredient}" deleted successfully!`);
        setShowSuccessAlert(true); // Show deletion alert when item is deleted
        setShowDeleteModal(false); // Close modal after deletion
      } catch (error) {
        console.error('Error deleting item:', error);
        setError(error.message);
      }
    };

    return (
      <div className="details-panel">
        <h2>Item Details</h2>
        
        {/* Show success alert when entry is updated or deleted */}
        {showSuccessAlert && (
          <Alert 
            message={successMessage} 
            onClose={() => setShowSuccessAlert(false)} 
          />
        )}

        {error && <p className="error-message">{error}</p>}
        
        <div>
          <label>Ingredient ID:</label>
          <input 
            type="text" 
            name="ingrid" 
            value={editedItem?.ingrid || ''} 
            readOnly 
          />
        </div>

        <div>
          <label>Ingredient:</label>
          <textarea 
            name="ingredient" 
            value={editedItem?.ingredient || ''} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Quantity:</label>
          <textarea 
            name="quantity" 
            value={editedItem?.quantity || ''} 
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
          itemName={editedItem?.ingredient}
          onClose={() => setShowDeleteModal(false)} // Close modal without deleting
          onConfirm={handleDelete} // Proceed with deletion
        />
      </div>
    );
}

export default InventoryDetails;