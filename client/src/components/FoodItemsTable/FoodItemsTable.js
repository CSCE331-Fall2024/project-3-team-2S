import React, { useState, useEffect } from 'react';
import './FoodItemsTable.css'; // Create or update this CSS file for FoodItemsTable
import { getFoodItems } from '../../api/FoodItems'; // Import the correct API function
import { tableCustomStyles } from './FoodItemsTable.jsx'; // Import custom styles if needed
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Food ID',
    selector: row => row.foodid,
    sortable: true,
    width: '10%'
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    width: '23%'
  },
  {
    name: 'Category',
    selector: row => row.category,
    sortable: true,
    width: '10%'
  },
  {
    name: 'Calories',
    selector: row => row.calories,
    sortable: true,
    width: '10%'
  },
  {
    name: 'Gluten-Free',
    selector: row => (row.isgf ? 'Yes' : 'No'),
    sortable: true,
    width: '14%'
  },
  {
    name: 'Vegetarian',
    selector: row => (row.isvegetarian ? 'Yes' : 'No'),
    sortable: true,
    width: '13%'
  },
  {
    name: 'Spicy',
    selector: row => (row.isspicy ? 'Yes' : 'No'),
    sortable: true,
    width: '10%'
  },
  {
    name: 'Premium',
    selector: row => (row.ispremium ? 'Yes' : 'No'),
    sortable: true,
    width: '10%'
  },
];
function FoodItemsTable({ data, setData, onSelectItem }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItemsData = async () => {
      try {
        const fetchedData = await getFoodItems(); // Fetch food items from API
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching food items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItemsData();
  }, [setData]);

  const handleRowClick = (row) => {
    onSelectItem(row); // Pass the selected row back to parent component
  };

  return (
    <div className='fooditems-table'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        striped
        progressPending={loading}
        customStyles={tableCustomStyles} // Apply custom styles if needed
        onRowClicked={handleRowClick}
        pointerOnHover
        highlightOnHover
      />
    </div>
  );
}

export default FoodItemsTable;