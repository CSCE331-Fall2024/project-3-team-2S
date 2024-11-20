const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
