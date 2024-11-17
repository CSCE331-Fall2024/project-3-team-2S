const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getFoodItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`);
    if (!response.ok) {
      throw new Error('Failed to fetch food items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
}
