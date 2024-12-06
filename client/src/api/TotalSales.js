const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTotalSales = async (range) => {
    try {
      const response = await fetch(`${API_BASE_URL}/totalsales?range=${range}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Total Sales:', error);
      throw error;
    }
  };
  