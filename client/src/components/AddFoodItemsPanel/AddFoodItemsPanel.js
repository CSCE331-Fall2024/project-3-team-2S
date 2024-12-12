import React, { useState } from 'react';
import './AddFoodItemsPanel.css';
import { addFoodItem } from '../../api/FoodItems'; // Import FoodItems API
import Alert from '../Alert/Alert'; // Import Alert component

/**
 * AddFoodItemsPanel component for adding a new food item.
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onItemAdd - Function to handle adding the new food item.
 */
function AddFoodItemsPanel({ onItemAdd }) {
  const [newItem, setNewItem] = useState({
    foodid: '',
    name: '',
    category: '',
    calories: '',
    isgf: false,
    isvegetarian: false,
    isspicy: false,
    ispremium: false,
    imagesrc: ''
  });
  
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [addedFoodName, setAddedFoodName] = useState(''); // Store added food name

  /**
   * Handles input change events for the form fields.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handles checkbox change events for the form fields.
   * @param {Object} e - The event object.
   */
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewItem(prev => ({ ...prev, [name]: checked }));
  };

  /**
   * Handles adding a new food item.
   * @async
   */
  const handleAdd = async () => {
    try {
      await addFoodItem(newItem); // Call API to add new food item
      onItemAdd(newItem); // Pass the new item back to parent component
      setAddedFoodName(newItem.name); // Set the added food name for success message
      setShowSuccessAlert(true); // Show success alert when item is successfully added
      setNewItem({
        foodid: '',
        name: '',
        category: '',
        calories: '',
        isgf: false,
        isvegetarian: false,
        isspicy: false,
        ispremium: false,
        imagesrc: ''
      }); // Reset form after adding
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
  };

  return (
    <div className="add-fooditems-panel">
      <h2>Add New Food Item</h2>

      {/* Show success alert when entry is added */}
      {showSuccessAlert && (
        <Alert 
          message={`New food item "${addedFoodName}" added successfully!`} 
          onClose={() => setShowSuccessAlert(false)} 
        />
      )}

      {error && <p className="error-message">{error}</p>}

      <div>
        <label>Food ID:</label>
        <input 
          type="text" 
          name="foodid" 
          value={newItem.foodid} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Name:</label>
        <textarea 
          name="name" 
          value={newItem.name} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Category:</label>
        <textarea 
          name="category" 
          value={newItem.category} 
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Calories:</label>
        <input 
          type="number" 
          name="calories" 
          value={newItem.calories} 
          onChange={handleInputChange}
        />
      </div>

      {/* Boolean Checkboxes */}
      <div className="checkbox-group">
        <label><input type="checkbox" name="isgf" checked={newItem.isgf} onChange={handleCheckboxChange} /> Gluten-Free</label>
        <label><input type="checkbox" name="isvegetarian" checked={newItem.isvegetarian} onChange={handleCheckboxChange} /> Vegetarian</label>
        <label><input type="checkbox" name="isspicy" checked={newItem.isspicy} onChange={handleCheckboxChange} /> Spicy</label>
        <label><input type="checkbox" name="ispremium" checked={newItem.ispremium} onChange={handleCheckboxChange} /> Premium</label>
      </div>

      {/* Image Source */}
      <div>
        <label>Image Source:</label>
        <textarea 
          name="imagesrc" 
          value={newItem.imagesrc} 
          onChange={handleInputChange}
        />
      </div>

      {/* Add Button */}
      <div className="button-container">
        <button className="save-button" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default AddFoodItemsPanel;
