import React, { useState } from 'react';
import './ManagerIDPopup.css';
import { useNavigate } from 'react-router-dom';
import { findEmployee } from '../../api/Employee';

function ManagerIDPopup({ onClose }) {
  const [managerId, setManagerId] = useState("");
  const [showInvalidPopup, setShowInvalidPopup] = useState(false);
  const [showNotCashierPopup, setShowNotCashierPopup] = useState(false);

  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setManagerId(value);
    }
  };

  const handleButtonClick = () => {
    console.log(`Manager ID entered: ${managerId}`);
    
    findEmployee(managerId)
      .then((position) => {
        if(position === "Manager") {
            navigate("/orderhistory");
        } else if(position === "Cashier") {
            navigate("/cashier");
        } else {
            console.log("Employee not manager or cashier");
            setShowNotCashierPopup(true);
            setTimeout(() => {
              setShowNotCashierPopup(false);
            }, 2000); 
        }
        console.log(`Position retrieved: ${position}`); 
        })
      .catch((error) => {
        console.error(`Failed to find employee: ${error.message}`);
        setShowInvalidPopup(true);
        setTimeout(() => {
          setShowInvalidPopup(false);
        }, 2000); 
      });
  };


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Enter Manager ID</h2>
        <input
          type="text"
          value={managerId}
          onChange={handleInputChange}
          placeholder="Enter Manager ID"
        />
        <div className="popup-buttons">
          <button onClick={handleButtonClick}>Check ID</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
      {showNotCashierPopup && (
        <div className="invalid-popup">
          <p>Employee not a manager or cashier</p>
        </div>
      )}
      {showInvalidPopup && (
        <div className="invalid-popup">
          <p>ID is not valid</p>
        </div>
      )}
    </div>
  );
}

export default ManagerIDPopup;

