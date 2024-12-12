/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches the order history from the API.
 * @async
 * @returns {Promise<Object[]>} An array of order history data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function getOrderHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/orderhistory`);
    if (!response.ok) {
      throw new Error('Failed to fetch order history');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
}
