const API_BASE_URL = 'http://localhost:3001/api';

export async function getFoodItems() {
  try {
    console.log("test")
    const response = await fetch(`${API_BASE_URL}/fooditems`);
    if (!response.ok) {
      throw new Error('Failed to fetch food items');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
}
