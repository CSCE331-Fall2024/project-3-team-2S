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
export async function getFoodItems() {
  try {
    console.log("Api Base Url: " + API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/fooditems`);
    if (!response.ok) {
      throw new Error('Failed to fetch food items');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
}
