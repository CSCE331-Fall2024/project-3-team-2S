/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches a food item by its ID from the API.
 * @async
 * @param {string} foodID - The ID of the food item to fetch.
 * @returns {Promise<Object>} The data of the fetched food item.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function getFoodItemFromID(foodID) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${foodID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch food item');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
}
