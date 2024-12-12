/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Completes an order by sending a PUT request to the API.
 * @async
 * @param {string} ordernum - The order number to complete.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const completeOrder = async (ordernum) => {
  try {
    const response = await fetch(`${API_BASE_URL}/complete-order/${ordernum}`, {
      method: 'PUT',  // Use PUT to update the order
    });

    console.log('Completing order number:', ordernum);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to complete order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};
