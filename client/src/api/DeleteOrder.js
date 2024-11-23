const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function deleteOrder(ordernum) {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteOrder/${ordernum}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Successfully deleted food item with ID: ${ordernum}`);
      return await response.json();
    } else {
      console.error(`Failed to delete food item with ID: ${ordernum}. Status: ${response.status}`);
      throw new Error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting food item: ${error.message}`);
    throw error;
  }
}