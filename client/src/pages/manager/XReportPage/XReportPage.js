import React, { useState, useEffect } from 'react';
import './XReportPage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getXReport } from '../../../api/XReport';

function XReportPage() {
  const [activePage] = useState("X Report");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [displayedDate, setDisplayedDate] = useState('');


  useEffect(() => {
    // Fetch data for the initial date (today)
    const today = new Date();
    const formattedDate = getFormattedDate(today);
    setSelectedDate(formattedDate);
    setDisplayedDate(formattedDate);
    fetchData(formattedDate);
  }, []);

  const fetchData = async (date) => {
    try {
      const result = await getXReport(date);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = () => {
    setDisplayedDate(selectedDate);
    fetchData(selectedDate);
  };

  const handleTodayButtonClick = () => {
    const today = new Date();
    const formattedDate = getFormattedDate(today);
    setSelectedDate(formattedDate);
    setDisplayedDate(formattedDate);
    fetchData(formattedDate);
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMaxValue = (data, key) => {
    if (!data || data.length === 0) return 0;
    return Math.max(...data.map(item => item[key]));
  };

  return (
    <div>
      <ManagerHeader activePage={activePage} />
      <div className="input-container">
        <label htmlFor="date-input">Select Date:</label>
        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleTodayButtonClick}>
  Use Today's Date
</button>
      </div>
      <div className="chart-container">
        <div className="chart-date">
          <h2>Sales Per Hour for: {displayedDate}</h2>
        </div>
        <BarChart
          width={800}
          height={600}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            label={{ value: 'Hour', position: 'insideBottomRight', offset: -5 }}
            domain={[0, 24]}
          />
          <YAxis 
            label={{ value: 'Number of Orders', angle: -90, position: 'insideLeft' }} 
            domain={[0, Math.ceil(getMaxValue(data, 'total_orders') * 1.1)]} 
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_orders" fill="#c8102e" />
        </BarChart>
      </div>
    </div>
  );
}

export default XReportPage;