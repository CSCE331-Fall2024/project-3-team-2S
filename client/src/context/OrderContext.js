import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  
  const [menuItemType, setMenuItemType] = useState("Bowl");

  return (
    <OrderContext.Provider value={{ menuItemType, setMenuItemType }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
