import './StartPage.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { CreateCustomer } from '../../api/CreateCustomer';
import ManagerIDPopup from '../../components/ManagerIDPopup/ManagerIDPopup';

function StartPage() {
  const navigate = useNavigate();
  const { user } = useUser(); // Use Clerk's hook to get the user
  const [inputCustomerId, setInputCustomerId] = useState("");
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    if (user) {
      // Automatically set the customer ID based on the user's email or Clerk ID
      // const customerId = user.id; // Or use a hashed version of user.emailAddress
      console.log(user.id, user.fullName, "1")
      CreateCustomer(user.id, user.fullName, "1")
      setInputCustomerId(user.id);
      localStorage.setItem("customerId", user.id);
    }
  }, [user]);

  const handleSaveCustomerId = () => {
    if (inputCustomerId.trim()) {
      localStorage.setItem("customerId", inputCustomerId.trim());
      navigate("/new-order");
    } else {
      alert("Please enter a valid Customer ID.");
    }
  };

  const handleCashierClick = () => {
    navigate("/cashier");
  };

  const handleEmployeeClick = () => {
    navigate("/orderhistory");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveCustomerId();
    }
  };

  return (
    <div className="start-page">
      <img src={Logo} alt="Panda Express Logo" />

      <SignedOut>
        <div className="auth-buttons">
          {/* <button className="cashier-button" onClick={handleCashierClick}>
            I'm a Cashier
          </button> */}
          {/* <button className="employee-button" onClick={() => setShowPopup(true)} >
            I'm a Cashier
          </button>
          {showPopup && ( <ManagerIDPopup onClose={() => setShowPopup(false)} />)} */}

          <button className="employee-button" onClick={() => setShowPopup(true)} >
            I'm an Employee
          </button>
          {showPopup && ( <ManagerIDPopup onClose={() => setShowPopup(false)} />)}
            
          {/* <button className="employee-button" onClick={handleEmployeeClick}>
            I'm a Manager
          </button> */}

          <SignInButton mode="modal">
            <button className="auth-button">Sign In</button>
          </SignInButton>
          <button
            className="auth-button"
            onClick={() => {
              localStorage.removeItem("customerId");
              navigate("/new-order");
            }}
          >
            Continue As Guest
          </button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="auth-buttons">

          {/* <button className="cashier-button" onClick={handleCashierClick}>
            I'm a Cashier
          </button> */}

          <button className="employee-button" onClick={() => setShowPopup(true)} >
            I'm an Employee
          </button>
          {showPopup && ( <ManagerIDPopup onClose={() => setShowPopup(false)} />)}

          {/* <button className="employee-button" onClick={handleEmployeeClick}>
            I'm a Manager
          </button> */}

          <UserButton />
          {/* <button
            className="auth-button"
            onClick={() => {
              navigate("/rewards");
            }}
          >
            Rewards
          </button> */}
          <button className="action-button" onClick={handleSaveCustomerId}>
          New Order
          </button>
        </div>
      </SignedIn>
      <div className="translate-btn-container">
      </div>
    </div>
  );
}

export default StartPage;
