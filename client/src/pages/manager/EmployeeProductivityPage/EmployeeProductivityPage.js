import React, { useState, useEffect } from 'react';
import './EmployeeProductivityPage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getEmployeeProductivity } from '../../../api/EmployeeProductivity';

function EmployeeProductivityPage() {
  const [activePage] = useState("Employee Productivity");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEmployeeProductivity();
        setData(result);
      } catch (error) {
        console.error('Error fetching Employee Productivity:', error);
      }
    };

    fetchData();
  }, []);

  // Find the max value of total_orders_completed for YAxis scaling
  const maxValue = Math.max(...data.map((d) => d.total_orders_completed));

  return (
    <div>
      <ManagerHeader activePage={activePage} />
      <div className="chart-container">
        <BarChart
          width={800}
          height={600}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Employee Name', position: 'insideBottomRight', offset: -5 }} />
          <YAxis 
            label={{ value: 'Total Orders Completed', angle: -90, position: 'insideLeft' }} 
            domain={[0, maxValue + Math.ceil(maxValue * 0.1)]}  // Add 10% margin to the top of the Y-axis
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_orders_completed" fill="#c41e3a" />
        </BarChart>
      </div>
    </div>
  );
}

export default EmployeeProductivityPage;
