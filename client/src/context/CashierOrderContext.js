import React, { createContext, useContext, useState, useEffect } from 'react';

const CashierOrderContext = createContext();

export const CashierOrderProvider = ({ children }) => {
  const [selectedReceiptItem, setSelectedReceiptItem] = useState(null);
  const [currentMenuItemType, setCurrentMenuItemType] = useState(null);

  useEffect(() => {
    if (selectedReceiptItem) {
      setCurrentMenuItemType(selectedReceiptItem.menuItemType);
    } else {
      setCurrentMenuItemType(null);
    }
  }, [selectedReceiptItem]);

  const selectReceiptItem = (item) => {
    setSelectedReceiptItem(item);
  };

  return (
    <CashierOrderContext.Provider value={{ selectedReceiptItem, currentMenuItemType, selectReceiptItem }}>
      {children}
    </CashierOrderContext.Provider>
  );
};

export const useCashierOrderContext = () => useContext(CashierOrderContext);