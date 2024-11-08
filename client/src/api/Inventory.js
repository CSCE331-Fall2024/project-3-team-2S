const API_BASE_URL = 'http://localhost:3001/api';

export const getInventory = async () => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  const data = await response.json();
  return data;  // Ensure this matches the expected structure
};

export async function addInventory(newItem) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingrid: newItem.ingrid,
        ingredient: newItem.ingredient,
        quantity: newItem.quantity,
      }),
    });

    if (response.ok) {
      console.log(`Successfully added new item with ID: ${newItem.ingrid}`);
      return await response.json();
    } else {
      console.error(`Failed to add new item. Status: ${response.status}`);
      throw new Error(`Add failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error adding inventory item: ${error.message}`);
    throw error;
  }
}

export async function updateInventory(item) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/${item.ingrid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredient: item.ingredient,
        quantity: item.quantity,
      }),
    });
    
    if (response.ok) {
      console.log(`Successfully updated item with ID: ${item.ingrid}`);
      return await response.json();
    } else if (response.status === 404) {
      console.error(`Item with ID: ${item.ingrid} not found. Unable to update.`);
      throw new Error(`Item not found with ID: ${item.ingrid}`);
    } else {
      console.error(`Failed to update item with ID: ${item.ingrid}. Status: ${response.status}`);
      throw new Error(`Update failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error updating inventory item: ${error.message}`);
    throw error;
  }
}

export async function deleteInventory(itemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/${itemId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log(`Successfully deleted item with ID: ${itemId}`);
      return await response.json();
    } else {
      console.error(`Failed to delete item with ID: ${itemId}. Status: ${response.status}`);
      throw new Error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting inventory item: ${error.message}`);
    throw error;
  }
}