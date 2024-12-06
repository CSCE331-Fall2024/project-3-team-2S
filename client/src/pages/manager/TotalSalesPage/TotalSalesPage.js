import React, { useState, useEffect } from 'react';
import './TotalSalesPage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getTotalSales } from '../../../api/TotalSales';

function TotalSalesPage() {
  const [activePage] = useState("Total Sales");
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  const fetchData = async (range) => {
    try {
      const result = await getTotalSales(range);
      setData(result);
    } catch (error) {
      console.error('Error fetching Total Sales:', error);
    }
  };

  return (
    <div>
      <ManagerHeader activePage={activePage} />
      <div className="controls">
        <label htmlFor="time-range">Select Time Range:</label>
        <select id="time-range" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="day">Past Day</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
          <option value="all">All Time</option>
        </select>
      </div>
      <div className="chart-container">
        <LineChart
          width={800}
          height={600}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sale_date" label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Total Sales', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_sales" stroke="#c41e3a" />
        </LineChart>
      </div>
    </div>
  );
}

export default TotalSalesPage;