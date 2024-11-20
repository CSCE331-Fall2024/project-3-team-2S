const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getMenuItems(orderNum) {
  try {
    const response = await fetch(`${API_BASE_URL}/menuitems/${orderNum}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
}

// In your GetMenuItems.js file
export async function getMenuItemsAndFoodItems(orderNum) {
  try {
    const [menuItemsResponse, foodItemsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/menuitems/${orderNum}`),
      fetch(`${API_BASE_URL}/fooditems`)
    ]);

    if (!menuItemsResponse.ok || !foodItemsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const menuItems = await menuItemsResponse.json();
    const foodItems = await foodItemsResponse.json();

    return { menuItems, foodItems };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}