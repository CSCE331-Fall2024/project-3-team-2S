const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getXReport = async (date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/xreport?date=${date}`);
    const data = await response.json();
    return data;  // Ensure this matches the expected structure
  } catch (error) {
    console.error('Error fetching X Report:', error);
    throw error;
  }
};