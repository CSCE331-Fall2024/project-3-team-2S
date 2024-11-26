import React, { useState } from 'react';
import './InventoryPage.css';
import { useNavigate } from 'react-router-dom'; // Import for routing
import InventoryTable from '../../../components/InventoryTable/InventoryTable';
import InventoryDetails from '../../../components/InventoryDetails/InventoryDetails';
import AddIngredientPanel from '../../../components/AddIngredientPanel/AddIngredientPanel'; // Import AddIngredientPanel
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';

function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [activePage] = useState("Inventory"); // Track the active page
  
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle selecting an item from the table
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Handle updating an existing item
  const handleItemUpdate = (updatedItem) => {
    setInventoryData(prevData => 
      prevData.map(item => 
        item.ingrid === updatedItem.ingrid ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  // Handle deleting an item
  const handleItemDelete = (deletedItemId) => {
    setInventoryData(prevData => 
      prevData.filter(item => item.ingrid !== deletedItemId)
    );
    setSelectedItem(null);
  };

  // Handle adding a new ingredient
  const handleNewIngredientAdd = (newItem) => {
    setInventoryData(prevData => [...prevData, newItem]); // Add new item to inventory list
  };

  return (
    <div>
      <ManagerHeader activePage={activePage} />

      <div className="inventory-container">
        <div className="inventory-header">
          <h1>Inventory</h1>
          <div className="inventory-body">
            <InventoryTable 
              data={inventoryData} 
              setData={setInventoryData} 
              onSelectItem={handleSelectItem} 
            />
          </div>
        </div>

        <InventoryDetails 
          selectedItem={selectedItem} 
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />

        <div className="divider"></div>

        <AddIngredientPanel 
          onItemAdd={handleNewIngredientAdd} 
        />
      </div>
    </div>
  );
}

export default InventoryPage;