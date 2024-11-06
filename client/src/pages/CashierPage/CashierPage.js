import './CashierPage.css'
import Logo from "../../assets/images/logo.png"
import React from 'react';

function ExamplePage() {
  return (
    <div>
      <div className="header">
        <img src={Logo} />
        <h1>Cashier Home Page</h1>
      </div>
      <DataTable />
    </div>
  )
}

function DataTable() {
  // Sample data to display in the table
  const data = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', age: 35, email: 'mike@example.com' }
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExamplePage;