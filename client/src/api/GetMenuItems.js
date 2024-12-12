/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches menu items for a specific order number from the API.
 * @async
 * @param {string} orderNum - The order number to fetch menu items for.
 * @returns {Promise<Object[]>} An array of menu item data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function getMenuItems(orderNum) {
  try {
    const response = await fetch(`${API_BASE_URL}/menuitems/${orderNum}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
}

/**
 * Fetches both menu items for a specific order number and all food items from the API.
 * @async
 * @param {string} orderNum - The order number to fetch menu items for.
 * @returns {Promise<Object>} An object containing arrays of menu items and food items data.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function getMenuItemsAndFoodItems(orderNum) {
  try {
    const [menuItemsResponse, foodItemsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/menuitems/${orderNum}`),
      fetch(`${API_BASE_URL}/fooditems`)
    ]);

    if (!menuItemsResponse.ok || !foodItemsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const menuItems = await menuItemsResponse.json();
    const foodItems = await foodItemsResponse.json();

    return { menuItems, foodItems };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
