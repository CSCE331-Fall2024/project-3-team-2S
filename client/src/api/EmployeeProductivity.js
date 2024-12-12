/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches employee productivity data from the API.
 * @async
 * @returns {Promise<Object[]>} An array of employee productivity data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getEmployeeProductivity = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employeeproductivity`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Employee Productivity:', error);
    throw error;
  }
};
