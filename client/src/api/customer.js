// API/customer.js

/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches customer data from the database by sending a SQL query to the API.
 * @async
 * @returns {Promise<Object[]>} An array of customer data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function getCustomers() {
  const sql = `
    SELECT customerid, "name", cardid
    FROM public.customer;
  `;

  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    throw error;
  }
}
