import React, { createContext, useContext, useState, useEffect } from 'react';

const CashierOrderContext = createContext();

export const CashierOrderProvider = ({ children }) => {
  const [selectedReceiptItem, setSelectedReceiptItem] = useState(null);
  const [currentMenuItemType, setCurrentMenuItemType] = useState(null);
  const [receiptItems, setReceiptItems] = useState([]);

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

  const addToReceiptItem = (type, value) => {
    setSelectedReceiptItem((prevItem) => {
      if (!prevItem) return prevItem; // Do nothing if no selected item

      let updatedItem;
      switch (type) {
        case 'side':
          updatedItem = { ...prevItem, side: value };
          break;
        case 'entree':
          updatedItem = { ...prevItem, entrees: [...(prevItem.entrees || []), value] };
          break;
        case 'appetizer':
          updatedItem = { ...prevItem, appetizer: value };
          break;
        case 'drink':
          updatedItem = { ...prevItem, drink: value };
          break;
        default:
          return prevItem;
      }

      // Update the receiptItems array with the modified item
      setReceiptItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );

      return updatedItem;
    });
  };

  return (
    <CashierOrderContext.Provider
      value={{
        selectedReceiptItem,
        selectReceiptItem,
        currentMenuItemType,
        receiptItems,
        setReceiptItems,
        addToReceiptItem,
      }}
    >
      {children}
    </CashierOrderContext.Provider>
  );
};

export const useCashierOrderContext = () => useContext(CashierOrderContext);
