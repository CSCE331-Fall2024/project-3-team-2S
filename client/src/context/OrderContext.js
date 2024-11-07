import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [menuItemType, setMenuItemType] = useState("Bowl");
  const [orders, setOrders] = useState([]);
  const [editOrderIndex, setEditOrderIndex] = useState(null); // Track index of order being edited
  const [currentEditOrder, setCurrentEditOrder] = useState(null); // Store order details in edit mode

  const addToOrder = (orderItem) => {
    if (editOrderIndex !== null) {
      // Update the existing order in edit mode
      setOrders((prevOrders) =>
        prevOrders.map((order, index) => index === editOrderIndex ? orderItem : order)
      );
      setEditOrderIndex(null); // Reset edit index after updating
      setCurrentEditOrder(null);
    } else {
      // Add new order
      setOrders((prevOrders) => [...prevOrders, orderItem]);
    }
  };

  const removeOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const editOrder = (index) => {
    setEditOrderIndex(index);
    setCurrentEditOrder(orders[index]);
    setMenuItemType(orders[index].menuItemType); // Set the menuItemType based on the selected order
  };

  const clearOrder = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{
      menuItemType,
      setMenuItemType,
      orders,
      addToOrder,
      removeOrder,
      clearOrder,
      editOrder,
      currentEditOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrderContext = () => useContext(OrderContext);
