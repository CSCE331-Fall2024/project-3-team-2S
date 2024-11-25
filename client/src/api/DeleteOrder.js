const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const deleteOrder = async (ordernum) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-order/${ordernum}`, {
      method: 'DELETE',
    });

    console.log('Deleting order number from orders and menuitems:', ordernum);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};