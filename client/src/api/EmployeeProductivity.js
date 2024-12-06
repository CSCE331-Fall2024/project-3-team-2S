const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getEmployeeProductivity = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employeeproductivity`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Employee Productivity:', error);
    throw error;
  }
};