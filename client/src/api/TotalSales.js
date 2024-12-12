/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches total sales data for a given range from the API.
 * @async
 * @param {string} range - The range of time for which to fetch total sales data.
 * @returns {Promise<Object>} The total sales data.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getTotalSales = async (range) => {
  try {
    const response = await fetch(`${API_BASE_URL}/totalsales?range=${range}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Total Sales:', error);
    throw error;
  }
};
