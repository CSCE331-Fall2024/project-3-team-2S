// API/customer.js

const API_BASE_URL = 'http://localhost:3001/api';

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
