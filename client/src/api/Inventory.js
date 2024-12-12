/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches all inventory items from the API.
 * @async
 * @returns {Promise<Object[]>} An array of inventory data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getInventory = async () => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  const data = await response.json();
  return data; 
};

/**
 * Adds a new inventory item by sending a POST request to the API.
 * @async
 * @param {Object} newItem - The new inventory item data.
 * @param {string} newItem.ingrid - The inventory item's ID.
 * @param {string} newItem.ingredient - The inventory item's name.
 * @param {number} newItem.quantity - The quantity of the inventory item.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
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

/**
 * Updates an existing inventory item by sending a PUT request to the API.
 * @async
 * @param {Object} item - The inventory item data to update.
 * @param {string} item.ingrid - The inventory item's ID.
 * @param {string} item.ingredient - The inventory item's name.
 * @param {number} item.quantity - The quantity of the inventory item.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
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

/**
 * Deletes an inventory item by sending a DELETE request to the API.
 * @async
 * @param {string} itemId - The ID of the inventory item to delete.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
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
