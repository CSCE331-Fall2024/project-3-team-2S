/**
 * Base URL for the API, sourced from environment variables.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetches all employees from the API.
 * @async
 * @returns {Promise<Object[]>} An array of employee data objects.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`);
    const data = await response.json();
    return data;  // Ensure this matches the expected structure
  } catch (error) {
    console.error(`Error fetching employees: ${error.message}`);
    throw error;
  }
};

/**
 * Adds a new employee by sending a POST request to the API.
 * @async
 * @param {Object} newEmployee - The new employee data.
 * @param {string} newEmployee.employeeid - The employee's ID.
 * @param {string} newEmployee.name - The employee's name.
 * @param {number} newEmployee.salary - The employee's salary.
 * @param {string} newEmployee.position - The employee's position.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function addEmployee(newEmployee) {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employeeid: newEmployee.employeeid,
        name: newEmployee.name,
        salary: newEmployee.salary,
        position: newEmployee.position,
      }),
    });

    if (response.ok) {
      console.log(`Successfully added new employee with ID: ${newEmployee.employeeid}`);
      return await response.json();
    } else {
      console.error(`Failed to add new employee. Status: ${response.status}`);
      throw new Error(`Add failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error adding employee: ${error.message}`);
    throw error;
  }
}

/**
 * Updates an existing employee by sending a PUT request to the API.
 * @async
 * @param {Object} employee - The employee data to update.
 * @param {string} employee.employeeid - The employee's ID.
 * @param {string} employee.name - The employee's name.
 * @param {number} employee.salary - The employee's salary.
 * @param {string} employee.position - The employee's position.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function updateEmployee(employee) {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${employee.employeeid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: employee.name,
        salary: employee.salary,
        position: employee.position,
      }),
    });

    if (response.ok) {
      console.log(`Successfully updated employee with ID: ${employee.employeeid}`);
      return await response.json();
    } else if (response.status === 404) {
      console.error(`Employee with ID: ${employee.employeeid} not found. Unable to update.`);
      throw new Error(`Employee not found with ID: ${employee.employeeid}`);
    } else {
      console.error(`Failed to update employee with ID: ${employee.employeeid}. Status: ${response.status}`);
      throw new Error(`Update failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error updating employee: ${error.message}`);
    throw error;
  }
}

/**
 * Deletes an employee by sending a DELETE request to the API.
 * @async
 * @param {string} employeeId - The ID of the employee to delete.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function deleteEmployee(employeeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Successfully deleted employee with ID: ${employeeId}`);
      return await response.json();
    } else {
      console.error(`Failed to delete employee with ID: ${employeeId}. Status: ${response.status}`);
      throw new Error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting employee: ${error.message}`);
    throw error;
  }
}

/**
 * Finds an employee's position by their ID by sending a request to the API.
 * @async
 * @param {string} employeeId - The ID of the employee.
 * @returns {Promise<string>} The position of the employee.
 * @throws Will throw an error if the request fails or the response is not ok.
 */
export async function findEmployee(employeeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/position`);

    if (response.ok) {
      const { position } = await response.json();
      console.log(`Position of employee with ID ${employeeId}: ${position}`);
      return position;
    } else if (response.status === 404) {
      console.error(`Employee with ID ${employeeId} not found.`);
      throw new Error(`Employee not found with ID: ${employeeId}`);
    } else {
      console.error(`Failed to fetch position for employee with ID ${employeeId}. Status: ${response.status}`);
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching position for employee with ID ${employeeId}: ${error.message}`);
    throw error;
  }
}
