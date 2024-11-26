import React, { useState } from 'react';
import './FoodItemsPage.css'; // Create a CSS file for FoodItemsPage
import { useNavigate } from 'react-router-dom'; // Import for routing
import FoodItemsTable from '../../../components/FoodItemsTable/FoodItemsTable'; // Import FoodItemsTable component
import FoodItemsDetails from '../../../components/FoodItemsDetails/FoodItemsDetails'; // Import FoodItemsDetails component
import AddFoodItemsPanel from '../../../components/AddFoodItemsPanel/AddFoodItemsPanel'; // Import AddFoodItemsPanel component
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';

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

  return (
    <div>
      <ManagerHeader activePage={activePage} />

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