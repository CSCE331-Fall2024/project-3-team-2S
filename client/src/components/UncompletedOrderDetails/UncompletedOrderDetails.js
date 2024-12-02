import React, { useState, useEffect } from 'react';
import './UncompletedOrderDetails.css';
import { getMenuItems, getMenuItemsAndFoodItems } from '../../api/GetMenuItems';
import { deleteOrder } from '../../api/DeleteOrder';

function UncompletedOrderDetails({ selectedOrder, onClose, onDelete }) {
  const [menuItems, setMenuItems] = useState([]);
  const [foodItems, setFoodItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await getMenuItems(selectedOrder.ordernum);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedOrder]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { menuItems, foodItems } = await getMenuItemsAndFoodItems(selectedOrder.ordernum);
        setMenuItems(menuItems);
        
        // Create a mapping of food IDs to names
        const foodItemsMap = foodItems.reduce((acc, item) => {
          acc[item.foodid] = item.name;
          return acc;
        }, {});
        setFoodItems(foodItemsMap);

        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOrder]);

  if (!selectedOrder) {
    return (
      <div className="details-panel">
        <p>Select an order to view details</p>
      </div>
    );
  }

  return (
    <div className="details-panel">
      <h2>Order Details</h2>
      <button className="close-button"  style={{ right: '10px' }} onClick={onClose}>Close</button>
      <button className="close-button"  style={{ right: '80px' }}  onClick={() => {
        onDelete(selectedOrder.ordernum);
      }}>Delete</button>
      <button className="close-button"  style={{ right: '150px' }}  onClick={() => {
        onDelete(selectedOrder.ordernum);
      }}>Complete</button>
      
      <div>
        <label>Order Number:</label>
        <input 
          type="text" 
          value={selectedOrder.ordernum || ''} 
          readOnly 
        />
      </div>

      <div>
        <label>Customer Name:</label>
        <input 
          type="text" 
          value={selectedOrder.name || ''} 
          readOnly 
        />
      </div>

      <div>
        <label>Employee ID:</label>
        <input 
          type="text" 
          value={selectedOrder.employeeid || ''} 
          readOnly 
        />
      </div>

      <div>
        <label>Time Completed:</label>
        <input 
          type="text" 
          value={selectedOrder.timecompleted || ''} 
          readOnly 
        />
      </div>

      <h3>Menu Items</h3>
      {loading ? (
        <p>Loading menu items...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="menu-items-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Food IDs</th>
            </tr>
          </thead>
          <tbody>
        {menuItems.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>
              {item.price != null && !isNaN(item.price)
                ? `$${Number(item.price).toFixed(2)}`
                : 'N/A'}
            </td>
            <td>
              {[item.foodid1, item.foodid2, item.foodid3, item.foodid4]
                .filter(Boolean)
                .map(id => foodItems[id] || id)
                .join(', ')}
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      )}
    </div>
  );
}

export default UncompletedOrderDetails;