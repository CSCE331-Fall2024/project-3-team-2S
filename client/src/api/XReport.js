/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches the X Report for a given date from the API.
 * @async
 * @param {string} date - The date for which to fetch the X Report.
 * @returns {Promise<Object>} The X Report data.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getXReport = async (date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/xreport?date=${date}`);
    const data = await response.json();
    return data;  // Ensure this matches the expected structure
  } catch (error) {
    console.error('Error fetching X Report:', error);
    throw error;
  }
};
