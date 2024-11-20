const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getNextOrderNum = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/next-order-num`);
    if (!response.ok) {
      throw new Error('Failed to fetch next order number');
    }
    const data = await response.json();
    return data.nextOrderNum;
  } catch (error) {
    console.error('Error fetching next order number:', error);
    throw error;
  }
};