const API_BASE_URL = 'https://project-3-team-2-s-dep-server.vercel.app/api';

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
