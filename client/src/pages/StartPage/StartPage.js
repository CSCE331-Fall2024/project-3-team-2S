import './StartPage.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getFoodItemFromID } from '../../api/GetFoodItemFromID'



function StartPage() {
  const navigate = useNavigate();
  const [inputCustomerId, setInputCustomerId] = useState("");

  const handleSaveCustomerId = () => {
    // console.log("Button clicked"); // Check if the function is triggered
    localStorage.setItem("customerId", inputCustomerId);
    navigate("/new-order");
    // console.log(inputCustomerId); // This should log the input value
  };
  

  return (
    <div className="start-page">
      <img src={Logo} alt="Panda Express Logo" />
      <input
        className="button"
        type="text"
        placeholder="Enter Customer ID"
        value={inputCustomerId}
        onChange={(e) => {
          setInputCustomerId(e.target.value);
          // console.log("Input changed:", e.target.value); // Verify input updates
        }}
      />

      <button onClick={handleSaveCustomerId}>New Order</button>

    </div>
  );
}
export default StartPage;