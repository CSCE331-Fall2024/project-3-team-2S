import React, { useState, useEffect } from 'react';
import './FoodItemsDetails.css';
import { updateFoodItem, deleteFoodItem } from '../../api/FoodItems'; // Change to FoodItems API
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import Alert from '../Alert/Alert'; // Import the Alert component

function FoodItemsDetails({ selectedItem, onItemUpdate, onItemDelete }) {
  
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
          <p>Select a food item to view details</p>
        </div>
      );
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedItem(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setEditedItem(prev => ({ ...prev, [name]: checked }));
    };

    const handleSave = async () => {
      try {
        await updateFoodItem(editedItem);
        onItemUpdate(editedItem);
        setError(null);
        setSuccessMessage(`Entry "${editedItem.name}" updated successfully!`);
        setShowSuccessAlert(true); // Show success alert when save is successful
      } catch (error) {
        console.error('Error updating item:', error);
        setError(error.message);
      }
    };

    const handleDelete = async () => {
      try {
        await deleteFoodItem(editedItem.foodid);
        onItemDelete(editedItem.foodid);
        setError(null);
        setSuccessMessage(`Entry "${editedItem.name}" deleted successfully!`);
        setShowSuccessAlert(true); // Show deletion alert when item is deleted
        setShowDeleteModal(false); // Close modal after deletion
      } catch (error) {
        console.error('Error deleting item:', error);
        setError(error.message);
      }
    };

    return (
      <div className="details-panel">
        <h2>Food Item Details</h2>
        
        {/* Show success alert when entry is updated or deleted */}
        {showSuccessAlert && (
          <Alert 
            message={successMessage} 
            onClose={() => setShowSuccessAlert(false)} 
          />
        )}

        {error && <p className="error-message">{error}</p>}
        
        <div>
          <label>Food ID:</label>
          <input 
            type="text" 
            name="foodid" 
            value={editedItem?.foodid || ''} 
            readOnly 
          />
        </div>

        <div>
          <label>Name:</label>
          <textarea 
            name="name" 
            value={editedItem?.name || ''} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Category:</label>
          <textarea 
            name="category" 
            value={editedItem?.category || ''} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Calories:</label>
          <input 
            type="number" 
            name="calories" 
            value={editedItem?.calories || ''} 
            onChange={handleInputChange}
          />
        </div>

        {/* Boolean Checkboxes */}
        <div className="checkbox-group">
          <label><input type="checkbox" name="isgf" checked={!!editedItem?.isgf} onChange={handleCheckboxChange} /> Gluten-Free</label>
          <label><input type="checkbox" name="isvegetarian" checked={!!editedItem?.isvegetarian} onChange={handleCheckboxChange} /> Vegetarian</label>
          <label><input type="checkbox" name="isspicy" checked={!!editedItem?.isspicy} onChange={handleCheckboxChange} /> Spicy</label>
          <label><input type="checkbox" name="ispremium" checked={!!editedItem?.ispremium} onChange={handleCheckboxChange} /> Premium</label>
        </div>

        {/* Image Source */}
        <div>
          <label>Image Source:</label>
          <textarea 
            name="imagesrc" 
            value={editedItem?.imagesrc || ''} 
            onChange={handleInputChange}
          />
        </div>

        {/* Save and Delete Buttons */}
        <div>
          <button className='save-button' onClick={handleSave}>Save</button>
          {/* Trigger modal when Delete is clicked */}
          <button className='delete-button' onClick={() => setShowDeleteModal(true)}>Delete</button>
        </div>

        {/* Include Delete Confirmation Modal */}
        <DeleteConfirmationModal
          show={showDeleteModal}
          itemName={editedItem?.name}
          onClose={() => setShowDeleteModal(false)} // Close modal without deleting
          onConfirm={handleDelete} // Proceed with deletion
        />
      </div>
    );
}

export default FoodItemsDetails;