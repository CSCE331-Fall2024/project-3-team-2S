const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getFoodItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`);
    const data = await response.json();
    return data;  // Ensure this matches the expected structure
  } catch (error) {
    console.error(`Error fetching food items: ${error.message}`);
    throw error;
  }
};

export async function addFoodItem(newItem) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        foodid: newItem.foodid,
        name: newItem.name,
        category: newItem.category,
        calories: newItem.calories,
        isgf: newItem.isgf || false, // Default to false if not provided
        isvegetarian: newItem.isvegetarian || false, // Default to false if not provided
        isspicy: newItem.isspicy || false, // Default to false if not provided
        ispremium: newItem.ispremium || false, // Default to false if not provided
        imagesrc: newItem.imagesrc,
      }),
    });

    if (response.ok) {
      console.log(`Successfully added new food item with ID: ${newItem.foodid}`);
      return await response.json();
    } else {
      console.error(`Failed to add new food item. Status: ${response.status}`);
      throw new Error(`Add failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error adding food item: ${error.message}`);
    throw error;
  }
}

export async function updateFoodItem(item) {
  try {
    console.log('Updating food item:', item); // Log to check if correct data is being passed

    const response = await fetch(`${API_BASE_URL}/fooditems/${item.foodid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: item.name,
        category: item.category,
        calories: item.calories,
        isgf: item.isgf || false,
        isvegetarian: item.isvegetarian || false,
        isspicy: item.isspicy || false,
        ispremium: item.ispremium || false,
        imagesrc: item.imagesrc,
      }),
    });

    if (response.ok) {
      console.log(`Successfully updated food item with ID: ${item.foodid}`);
      return await response.json();
    } else if (response.status === 404) {
      console.error(`Food item with ID: ${item.foodid} not found. Unable to update.`);
      throw new Error(`Food item not found with ID: ${item.foodid}`);
    } else {
      console.error(`Failed to update food item with ID: ${item.foodid}. Status: ${response.status}`);
      throw new Error(`Update failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error updating food item: ${error.message}`);
    throw error;
  }
}

export async function deleteFoodItem(foodId) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${foodId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Successfully deleted food item with ID: ${foodId}`);
      return await response.json();
    } else {
      console.error(`Failed to delete food item with ID: ${foodId}. Status: ${response.status}`);
      throw new Error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting food item: ${error.message}`);
    throw error;
  }
}