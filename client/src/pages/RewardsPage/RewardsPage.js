import React, { useState, useEffect } from "react";

const RewardsPage = () => {
  const [rewardPoints, setRewardPoints] = useState(0);
  const [customerId, setCustomerId] = useState("");
  
  const redeemableItems = [
    { id: 1, name: "Gift Card", points: 100 },
    { id: 2, name: "Discount Coupon", points: 50 },
    { id: 3, name: "Free Coffee", points: 25 },
    { id: 4, name: "Movie Ticket", points: 200 },
  ];

  useEffect(() => {
    // Assume customerId is stored in localStorage
    const storedCustomerId = localStorage.getItem("customerId");
    setCustomerId(storedCustomerId);

    const fetchRewardPoints = async () => {
      if (storedCustomerId) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/customer-total-price?customerId=${storedCustomerId}`
          );
          const data = await response.json();

          if (data.total_price) {
            setRewardPoints(data.total_price * 100); // Calculate reward points
          } else {
            console.error("Reward points data not found");
          }
        } catch (error) {
          console.error("Error fetching reward points:", error);
        }
      }
    };

    fetchRewardPoints();
  }, []);

  const handleRedeem = (item) => {
    if (rewardPoints >= item.points) {
      setRewardPoints(rewardPoints - item.points);
      alert(`You have successfully redeemed: ${item.name}`);
    } else {
      alert("Not enough points to redeem this item.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Rewards Page</h1>

      {/* Display User Info */}
      <div style={{ marginBottom: "20px" }}>
        <p><strong>User ID:</strong> {customerId}</p>
        <p><strong>Total Reward Points:</strong> {rewardPoints.toFixed(2)}</p>
      </div>

      {/* Display Redeemable Items */}
      <h2>Redeemable Items</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {redeemableItems.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span>
              <strong>{item.name}</strong> ({item.points} points)
            </span>
            <button
              onClick={() => handleRedeem(item)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Redeem
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RewardsPage;
