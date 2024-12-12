/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Creates a new customer by sending a POST request to the API.
 * @async
 * @param {string} customerid - The ID of the customer.
 * @param {string} name - The name of the customer.
 * @param {string} cardid - The card ID associated with the customer.
 * @returns {Promise<Object>} An object containing the success status, message, and new customer data.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function CreateCustomer(customerid, name, cardid) {
  try {
    const response = await fetch(`${API_BASE_URL}/create-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerid, name, cardid }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create customer: ${errorMessage}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message,
      newCustomer: data.newCustomer,
    };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong',
    };
  }
}
