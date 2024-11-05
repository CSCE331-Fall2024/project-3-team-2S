const API_BASE_URL = 'http://localhost:3001/api';

export async function getFoodItemFromID(foodID) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${foodID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch food item');
    }
    const data = await response.json();
    return data.name
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
}