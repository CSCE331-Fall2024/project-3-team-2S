// ManagerSidebar.js
import React, { useState } from 'react';
import './ManagerSidebar.css';

const ManagerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? '→' : '←'}
      </button>
      <nav>
        <ul>
          <li><a href="#link1">Link 1</a></li>
          <li><a href="#link2">Link 2</a></li>
          <li><a href="#link3">Link 3</a></li>
          <li><a href="#link4">Link 4</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default ManagerSidebar;
