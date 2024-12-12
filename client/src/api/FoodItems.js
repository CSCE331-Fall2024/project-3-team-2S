/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches all food items from the API.
 * @async
 * @returns {Promise<Object[]>} An array of food item data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getFoodItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`);
    const data = await response.json();
    return data;  
  } catch (error) {
    console.error(`Error fetching food items: ${error.message}`);
    throw error;
  }
};

/**
 * Adds a new food item by sending a POST request to the API.
 * @async
 * @param {Object} newItem - The new food item data.
 * @param {string} newItem.foodid - The food item's ID.
 * @param {string} newItem.name - The food item's name.
 * @param {string} newItem.category - The food item's category.
 * @param {number} newItem.calories - The food item's calorie count.
 * @param {boolean} [newItem.isgf=false] - Whether the food item is gluten-free.
 * @param {boolean} [newItem.isvegetarian=false] - Whether the food item is vegetarian.
 * @param {boolean} [newItem.isspicy=false] - Whether the food item is spicy.
 * @param {boolean} [newItem.ispremium=false] - Whether the food item is premium.
 * @param {string} newItem.imagesrc - The source of the food item's image.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function addFoodItem(newItem) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        foodid: newItem.foodid,
        name: newItem.name,
        category: newItem.category,
        calories: newItem.calories,
        isgf: newItem.isgf || false, // Default to false if not provided
        isvegetarian: newItem.isvegetarian || false, // Default to false if not provided
        isspicy: newItem.isspicy || false, // Default to false if not provided
        ispremium: newItem.ispremium || false, // Default to false if not provided
        imagesrc: newItem.imagesrc,
      }),
    });

    if (response.ok) {
      console.log(`Successfully added new food item with ID: ${newItem.foodid}`);
      return await response.json();
    } else {
      console.error(`Failed to add new food item. Status: ${response.status}`);
      throw new Error(`Add failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error adding food item: ${error.message}`);
    throw error;
  }
}

/**
 * Updates an existing food item by sending a PUT request to the API.
 * @async
 * @param {Object} item - The food item data to update.
 * @param {string} item.foodid - The food item's ID.
 * @param {string} item.name - The food item's name.
 * @param {string} item.category - The food item's category.
 * @param {number} item.calories - The food item's calorie count.
 * @param {boolean} [item.isgf=false] - Whether the food item is gluten-free.
 * @param {boolean} [item.isvegetarian=false] - Whether the food item is vegetarian.
 * @param {boolean} [item.isspicy=false] - Whether the food item is spicy.
 * @param {boolean} [item.ispremium=false] - Whether the food item is premium.
 * @param {string} item.imagesrc - The source of the food item's image.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function updateFoodItem(item) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${item.foodid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: item.name,
        category: item.category,
        calories: item.calories,
        isgf: item.isgf || false,
        isvegetarian: item.isvegetarian || false,
        isspicy: item.isspicy || false,
        ispremium: item.ispremium || false,
        imagesrc: item.imagesrc,
      }),
    });

    const responseBody = await response.text(); // Use text() to capture any error message

    if (response.ok) {
      console.log(`Successfully updated food item with ID: ${item.foodid}`);
      return JSON.parse(responseBody); // Parse the JSON if successful
    } else {
      throw new Error(`Failed to update food item. Status: ${response.status}. Message: ${responseBody}`);
    }
  } catch (error) {
    console.error(`Error updating food item: ${error.message}`);
    throw error;
  }
}

/**
 * Deletes a food item by sending a DELETE request to the API.
 * @async
 * @param {string} foodId - The ID of the food item to delete.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function deleteFoodItem(foodId) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${foodId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Successfully deleted food item with ID: ${foodId}`);
      return await response.json();
    } else {
      console.error(`Failed to delete food item with ID: ${foodId}. Status: ${response.status}`);
      throw new Error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting food item: ${error.message}`);
    throw error;
  }
}
