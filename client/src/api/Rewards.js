const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const storedCustomerId = localStorage.getItem("customerId");

export async function Rewards() {
  try {
    // Ensure we have a customer ID to work with
    if (!storedCustomerId) {
      throw new Error("No customer ID found in localStorage.");
    }

    // Fetch the total price for the current customer
    const response = await fetch(`${API_BASE_URL}/api/customer-total-price?customerId=${storedCustomerId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rewards data: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the total price data
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return null; // Return null in case of an error
  }
}
