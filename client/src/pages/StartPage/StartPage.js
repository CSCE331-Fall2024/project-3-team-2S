import './StartPage.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getFoodItemFromID } from '../../api/GetFoodItemFromID'

function StartPage() {
  const navigate = useNavigate();
  const [inputCustomerId, setInputCustomerId] = useState("");

  const handleSaveCustomerId = () => {
    localStorage.setItem("customerId", inputCustomerId);
    navigate("/new-order");
  };

  const handleEmployeeClick = () => {
    console.log("Employee button clicked");
    navigate("/inventory");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveCustomerId();
    }
  };

  return (
    <div className="start-page">
      <img src={Logo} alt="Panda Express Logo" />
      <input
        className="button"
        type="text"
        placeholder="Enter Customer ID"
        value={inputCustomerId}
        onChange={(e) => setInputCustomerId(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSaveCustomerId();
          }
        }}
      />

      <button onClick={handleSaveCustomerId}>New Order</button>

      {/* Employee Button */}
      <button className="employee-button" onClick={handleEmployeeClick}>
        I'm an employee
      </button>

    </div>
  );
}

export default StartPage;