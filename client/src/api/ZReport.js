/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches the Z Report from the API.
 * @async
 * @returns {Promise<Object>} The Z Report data.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getZReport = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/zreport`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Z Report:', error);
    throw error;
  }
};
