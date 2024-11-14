import React, { useState } from 'react';
import ProfileIcon from "../../assets/images/white-profile-icon.png";
import './ManagerProfileDropdown.css'; // Create this CSS file for styling

function ManagerProfileDropdown() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div className="manager-profile-dropdown">
      {/* Profile Icon */}
      <div className="profile-icon" onClick={handleProfileClick}>
        <img src={ProfileIcon} alt="Manager Profile" /> {/* Use <img> to display the icon */}
      </div>

      {/* Dropdown Section */}
      {isDropdownVisible && (
        <div className="profile-dropdown">
          <p>Welcome Manager!</p>
          <div className="empty-div"></div>
          <span className="settings-link" onClick={() => console.log('Navigate to Settings')}>Settings</span>
        </div>
      )}
    </div>
  );
}

export default ManagerProfileDropdown;