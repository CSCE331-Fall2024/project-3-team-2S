import React, { useState, useEffect } from 'react';
import './ZReportPage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';
import { getZReport } from '../../../api/ZReport';

function ZReportPage() {
  const [activePage] = useState("Z Report");
  const [reportData, setReportData] = useState({ sales: [], employees: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getZReport();
        setReportData(result);
      } catch (error) {
        console.error('Error fetching Z Report:', error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate totals and format the report
  const formatReport = () => {
    let totalSales = 0;
    let categories = {
      "A la Carte": { count: 0, sales: 0 },
      "Appetizer": { count: 0, sales: 0 },
      "Bigger Plate": { count: 0, sales: 0 },
      "Bowl": { count: 0, sales: 0 },
      "Drink": { count: 0, sales: 0 },
      "Plate": { count: 0, sales: 0 },
    };

    reportData.sales.forEach(item => {
      if (categories[item.menu_name]) {
        categories[item.menu_name].count += parseInt(item.item_count, 10); // Ensure it's an integer
        categories[item.menu_name].sales += item.total_price;
        totalSales += item.total_price;
      }
    });

    const totalTax = totalSales * 0.0825;
    const totalCollected = totalSales + totalTax;

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const year = yesterdayDate.getFullYear();
    const month = String(yesterdayDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(yesterdayDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
      <div>
        <h2>Z-Report for Yesterday {formattedDate}</h2>
        <div className="report-section">
          <h3>Sales and Taxes Summary</h3>
          <p>Total Net Sales: ${totalSales.toFixed(2)}</p>
          <p>Total Tax: ${totalTax.toFixed(2)}</p>
          <p>Total Sales: ${totalCollected.toFixed(2)}</p>
        </div>
        <div className="report-section">
          <h3>Sales Categories</h3>
          {Object.keys(categories).map((key) => (
            <p key={key}>
              {key} Sold: {categories[key].count} (${categories[key].sales.toFixed(2)})
            </p>
          ))}
        </div>
        <div className="report-section">
          <h3>Top Earning Employees</h3>
          {reportData.employees.slice(0, 5).map((emp, index) => (
            <p key={index}>#{index + 1} {emp.name} - {emp.order_count} Orders</p>
          ))}
        </div>
        <div className="report-section">
          <p>Total Cash: $0</p>
          <p>We don't take cash because Panda Express doesn't take cash</p>
          <p>Total Card: ${totalCollected.toFixed(2)}</p>
        </div>
        <div className="report-section">
          <p>End of Report</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ManagerHeader activePage={activePage} />
      <div className="z-report-page">
        <div className="report-container">
          {formatReport()}
        </div>
      </div>
    </div>
  );
}

export default ZReportPage;