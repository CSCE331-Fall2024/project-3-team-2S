import React, { useState, useEffect } from 'react';
import './InventoryTable.css';
import { getInventory } from '../../api/Inventory';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Ingredient ID',
        selector: row => row.ingrid,
        sortable: true
    },
    {
        name: 'Ingredient',
        selector: row => row.ingredient,
        sortable: true
    },
    {
        name: 'Quantity',
        selector: row => row.quantity,
        sortable: true
    },
];
  
  function InventoryTable() {
    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchInventoryData = async () => {
        try {
          const data = await getInventory();
          setInventoryData(data);
        } catch (error) {
          console.error('Error fetching inventory:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchInventoryData();
    }, []);
  
    return (
      <div>
        <DataTable
          columns={columns}
          data={inventoryData}
          pagination
          progressPending={loading}
        />
      </div>
    );
  }
  
  export default InventoryTable;