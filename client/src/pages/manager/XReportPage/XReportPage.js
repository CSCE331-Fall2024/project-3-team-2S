import React, { useState } from 'react';
import './XReportPage.css';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';

function XReportPage() {
  const [activePage] = useState("X Report"); // Track the active page

  return (
    <div>
      <ManagerHeader activePage={activePage} />
    </div>
  );
}

export default XReportPage;