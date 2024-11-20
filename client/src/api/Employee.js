const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all employees
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

// Add a new employee
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

// Update an existing employee
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

// Delete an employee
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