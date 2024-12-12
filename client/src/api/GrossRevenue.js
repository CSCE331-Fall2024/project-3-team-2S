/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches the gross revenue data from the API.
 * @async
 * @returns {Promise<Object>} The gross revenue data.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getGrossRevenue = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/grossrevenue`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Gross Revenue:', error);
    throw error;
  }
};
