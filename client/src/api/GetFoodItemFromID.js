const API_BASE_URL = 'https://project-3-team-2-s-dep-server.vercel.app/api';

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
