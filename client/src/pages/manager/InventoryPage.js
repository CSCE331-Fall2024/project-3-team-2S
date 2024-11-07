import React, { useState } from 'react';
import './InventoryPage.css'
import Logo from "../../assets/images/logo.png"
import InventoryTable from '../../components/InventoryTable/InventoryTable';
import InventoryDetails from '../../components/InventoryDetails/InventoryDetails';

function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleItemUpdate = (updatedItem) => {
    setInventoryData(prevData => 
      prevData.map(item => 
        item.ingrid === updatedItem.ingrid ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  const handleItemDelete = (deletedItemId) => {
    setInventoryData(prevData => 
      prevData.filter(item => item.ingrid !== deletedItemId)
    );
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="header-container">
        <img src={Logo} alt="Logo" />
        <h1>Inventory</h1>
        <button className='sign-out-button'>Sign Out</button>
      </div>
      <div className="inventory-container">
        <div className="inventory-body">
          <InventoryTable 
            data={inventoryData} 
            setData={setInventoryData} 
            onSelectItem={handleSelectItem} 
          />
        </div>
        <InventoryDetails 
          selectedItem={selectedItem} 
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />
      </div>
    </div>
  );
}

export default InventoryPage;