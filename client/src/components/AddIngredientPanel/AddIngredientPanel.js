import React, { useState } from 'react';
import './AddIngredientPanel.css';
import { addInventory } from '../../api/Inventory'; 
import Alert from '../Alert/Alert'; // Import Alert component

/**
 * AddIngredientPanel component for adding a new ingredient.
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onItemAdd - Function to handle adding the new ingredient.
 */
function AddIngredientPanel({ onItemAdd }) {
  const [newItem, setNewItem] = useState({ ingrid: '', ingredient: '', quantity: '' });
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [addedIngredientName, setAddedIngredientName] = useState(''); // Store added ingredient name

  /**
   * Handles input change events for the form fields.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handles adding a new ingredient.
   * @async
   */
  const handleAdd = async () => {
    try {
      await addInventory(newItem); // Call API to add new ingredient
      onItemAdd(newItem); // Pass the new item back to parent component
      setAddedIngredientName(newItem.ingredient); // Set the added ingredient name for success message
      setShowSuccessAlert(true); // Show success alert when item is successfully added
      setNewItem({ ingrid: '', ingredient: '', quantity: '' }); // Reset form after adding
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
  };

  return (
    <div className="add-ingredient-panel">
      <h2>Add New Ingredient</h2>

      {/* Show success alert when entry is added */}
      {showSuccessAlert && (
        <Alert 
          message={`New ingredient "${addedIngredientName}" added successfully!`} 
          onClose={() => setShowSuccessAlert(false)} 
        />
      )}

      {error && <p className="error-message">{error}</p>}

      <div>
        <label>Ingredient ID:</label>
        <input 
          type="text" 
          name="ingrid" 
          value={newItem.ingrid} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Ingredient:</label>
        <textarea 
          name="ingredient" 
          value={newItem.ingredient} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Quantity:</label>
        <textarea 
          name="quantity" 
          value={newItem.quantity} 
          onChange={handleInputChange}
        />
      </div>

      <div className="button-container">
        <button className="save-button" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default AddIngredientPanel;
