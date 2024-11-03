const API_BASE_URL = 'http://localhost:3001/api';

// export async function getInventory() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/inventory`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch inventory');
//     }
//     const data = await response.json();
//     console.log(data)
//     return data;
//   } catch (error) {
//     console.error('Error fetching inventory:', error);
//     throw error;
//   }
// }

export const getInventory = async () => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  const data = await response.json();
  return data;  // Ensure this matches the expected structure
};
// export async function updateInventory(item) {
//   const response = await fetch(`/api/inventory/${item.ingrid}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       ingredient: item.ingredient,
//       quantity: item.quantity,
//     }),
//   });
//   return response.json();
// }

// export async function deleteInventory(itemId) {
//   const response = await fetch(`/api/inventory/${itemId}`, {
//     method: 'DELETE',
//   });
//   return response.json();
// }
