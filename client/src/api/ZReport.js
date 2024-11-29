const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getZReport = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/zreport`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Z Report:', error);
    throw error;
  }
};