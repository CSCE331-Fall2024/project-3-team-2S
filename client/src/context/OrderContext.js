import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  
  const [menuItemType, setMenuItemType] = useState("Bowl");
  const [orders, setOrders] = useState([]);

  const addToOrder = (orderItem) => {
    setOrders((prevOrders) => [...prevOrders, orderItem]);
  };

  const removeOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const clearOrder = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{ menuItemType, setMenuItemType, orders, addToOrder, removeOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrderContext = () => useContext(OrderContext);
