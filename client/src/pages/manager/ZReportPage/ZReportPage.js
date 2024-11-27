import React, { useState } from 'react';
import './ZReportPage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';

function ZReportPage() {
  const [activePage] = useState("Z Report"); // Track the active page

  return (
    <div>
      <ManagerHeader activePage={activePage} />
    </div>
  );
}

export default ZReportPage;