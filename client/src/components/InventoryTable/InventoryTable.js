import React, { useState, useEffect } from 'react';
import './InventoryTable.css';
import { getInventory } from '../../api/Inventory';
import { tableCustomStyles } from './InventoryTableStyle.jsx';
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

function InventoryTable({ data, setData, onSelectItem }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const fetchedData = await getInventory();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [setData]);

  const handleRowClick = (row) => {
    onSelectItem(row);
  };

  return (
    <div className='inventory-table'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        striped
        progressPending={loading}
        customStyles={tableCustomStyles}
        onRowClicked={handleRowClick}
        pointerOnHover
        highlightOnHover
      />
    </div>
  );
}

export default InventoryTable;