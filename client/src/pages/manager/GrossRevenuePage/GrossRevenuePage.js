import React, { useState, useEffect } from 'react';
import './GrossRevenuePage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getGrossRevenue } from '../../../api/GrossRevenue';

function GrossRevenuePage() {
  const [activePage] = useState("Gross Revenue");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGrossRevenue();
        setData(result);
      } catch (error) {
        console.error('Error fetching Gross Revenue:', error);
      }
    };

    fetchData();
  }, []);

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
          <XAxis dataKey="foodid" label={{ value: 'Food ID', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Total Gross Revenue', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="gross_revenue" fill="#c41e3a" />
        </BarChart>
      </div>
    </div>
  );
}

export default GrossRevenuePage;