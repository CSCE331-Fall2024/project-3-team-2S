import React, { useState, useEffect } from 'react';
import './EmployeeTable.css';
import { getEmployees } from '../../api/Employee';  // Import the correct API function
import { tableCustomStyles } from './EmployeeTableStyle.jsx';  // Update the custom styles if necessary
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Employee ID',
    selector: row => row.employeeid,
    sortable: true
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'Salary',
    selector: row => row.salary,
    sortable: true
  },
  {
    name: 'Position',
    selector: row => row.position,
    sortable: true
  },
];

function EmployeeTable({ data, setData, onSelectItem }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const fetchedData = await getEmployees();  // Fetch employee data
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [setData]);

  const handleRowClick = (row) => {
    onSelectItem(row);  // Pass the selected employee data to parent component
  };

  return (
    <div className='employee-table'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        striped
        progressPending={loading}
        customStyles={tableCustomStyles}  // Apply custom styles if needed
        onRowClicked={handleRowClick}
        pointerOnHover
        highlightOnHover
      />
    </div>
  );
}

export default EmployeeTable;