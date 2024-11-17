const API_BASE_URL = 'http://localhost:3001/api'

export async function getOrderHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/orderhistory`);
      if (!response.ok) {
        throw new Error('Failed to fetch order history');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order history:', error);
      throw error;
    }
  }