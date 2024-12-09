const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const completeOrder = async (ordernum) => {
  try {
    const response = await fetch(`${API_BASE_URL}/complete-order/${ordernum}`, {
      method: 'PUT',  // Use PUT to update the order
    });

    
    console.log('Completing order number:', ordernum);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to complete order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};
