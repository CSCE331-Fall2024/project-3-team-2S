import './StartPage.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { CreateCustomer } from '../../api/CreateCustomer';

function StartPage() {
  const navigate = useNavigate();
  const { user } = useUser(); // Use Clerk's hook to get the user
  const [inputCustomerId, setInputCustomerId] = useState("");

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
          <button className="employee-button" onClick={handleEmployeeClick}>
            I'm an Employee
          </button>
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
          <button className="employee-button" onClick={handleEmployeeClick}>
            I'm an Employee
          </button>
          <UserButton />
          {/* <button
            className="auth-button"
            onClick={() => {
              localStorage.removeItem("customerId");
              navigate("/");
            }}
          >
            Sign Out
          </button> */}
          <button className="action-button" onClick={handleSaveCustomerId}>
          New Order
          </button>
        </div>
      </SignedIn>
    </div>
  );
}

export default StartPage;
