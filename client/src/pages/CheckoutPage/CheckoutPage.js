import './CheckoutPage.css';
import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import { getFoodItemFromID } from '../../api/GetFoodItemFromID';
import CheckoutCard from '../../components/CheckoutCard/CheckoutCard';
import Receipt from '../../components/Receipt/Receipt';
import CompletedModal from '../../components/CompletedModal/CompletedModal';
import { getNextOrderNum } from '../../api/NextOrderNum'; // Import the function
import { SendOrder } from '../../api/SendOrder';
import { useLocation } from 'react-router-dom';



function CheckoutPage() {
  const navigate = useNavigate();
  const { orders, removeOrder, editOrder, clearOrder } = useOrderContext();
  const { menuItemType, addToOrder, currentEditOrder, setFoodItemDetailsInContext, isFoodItemDetailsModalVisible, openFoodItemDetailsModal, exitEditOrder } = useOrderContext();

  const [orderDetails, setOrderDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(null);

  const location = useLocation();
  const role = location.state?.role || "customer";

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch order details first
        const details = await Promise.all(
          orders.map(async (order) => {
            const sideName = order.side ? (await getFoodItemFromID(order.side)).name : null;
            const entreeNames = order.entrees ? await Promise.all(order.entrees.map(async id => (await getFoodItemFromID(id)).name)) : [];
            const appetizerName = order.appetizer ? (await getFoodItemFromID(order.appetizer)).name : null;
            const alacarteName = order.alacarte ? (await getFoodItemFromID(order.alacarte)).name : null;
            const drinkName = order.drink ? (await getFoodItemFromID(order.drink)).name : null;
            const employeeId = 1;


            return {
              menuItemType: order.menuItemType,
              price: order.price,
              side: sideName,
              entrees: entreeNames,
              appetizer: appetizerName,
              alacarte: alacarteName,
              drink: drinkName,
              employee: employeeId,
            };
          })
        );
        setOrderDetails(details);

        // Fetch total price and reward points only if customerId is available
        if (customerId) {
          const response = await fetch(
            `https://project-3-team-2-s-dep-server.vercel.app/api/customer-total-price?customerId=${customerId}`
          );
          const data = await response.json();

          if (data.total_price) {
            setTotalPrice(data.total_price);
            setRewardPoints(data.total_price * 100);  // Calculate reward points
          } else {
            console.error("Total price not found");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Trigger the fetchData when orders or customerId changes
    if (orders.length > 0 || customerId) {
      fetchData();
    }
  }, [orders, customerId]);

  const handlePlaceOrder = async () => {
    try {
      const num = await getNextOrderNum(); // Fetch the next order number
      setOrderNumber(num);
    } catch (error) {
      console.error('Failed to fetch next order number:', error);
    }

    SendOrder(orders) 
    setIsModalVisible(true);
  };

  const addFoodItemPromoToOrder = (foodItem) => {
    const promoItem = {
      menuItemType: `${foodItem.menuItemType} Promo`,
      price: -1 * foodItem.price, // Assuming the same price calculation logic applies
      foodid: foodItem.foodid, // Associate with the original food item
      promo: true, // Flag to indicate it's a promo item
    };
    addToOrder(promoItem);
  };

  const handleApplyRewardPoints = (index) => {
    setOrderDetails((prevOrderDetails) => {
      const updatedDetails = [...prevOrderDetails];
      const item = { ...updatedDetails[index] }; // Clone item to avoid mutation
  
      if (rewardPoints >= item.price * 100) {
        let pointsToDeduct = item.price * 100;
        console.log("cost is " + item.price);
        if(item.price > 0) { // TODO TOGGLE REWARDS HERE TO PASS TO order.rewards FOR EACH INDIVIDUAL ITEM
          item.price = 0;
          orders[index].rewards = true;
        } else {
          orders[index].rewards = false;
          // item.rewards = false;
          console.log("item type is " + item.menuItemType); 
          switch(item.menuItemType) {
            case "Bowl":
              item.price = 8.30;
              break;
            case "Plate":
              item.price = 9.80;
              break;
            case "Bigger Plate":
              item.price = 11.30;
              break;
            case "Appetizer":
              item.price = 2.0;
              break;
            case "A La Carte":
              item.price = 4.0;
              break;
            case "Drink":
              item.price = 1;
              break;
            default:
              item.price = 0;
              break;
          }
          pointsToDeduct = item.price * -100;
          // pointsToDeduct = 0;
        }
        updatedDetails[index] = item; // Update the cloned array
        console.log("difference is " + pointsToDeduct);
        setRewardPoints((prevPoints) => prevPoints - pointsToDeduct); // Deduct points
      } else {
        alert("Not enough reward points to apply to this item.");
      }
  
      return updatedDetails;
    });
  };
  
  


  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearOrder();
    if(role === "customer") {
      navigate("/");
    } else {
      navigate("/cashier");
    }
  };


  return (
    <div>
      <div className={`overlay ${isModalVisible ? 'overlay-active' : ''}`} />
      <div className={`content ${isModalVisible ? 'blurred' : ''}`}>
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>Checkout</h1>
          {totalPrice !== null ? (
            <div>
              {/* <p><strong>Total Price: </strong>${totalPrice.toFixed(2)}</p> */}
              <p><strong>Reward Points: </strong>{rewardPoints.toFixed(2)}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="checkout-content">
          <div className="order-container">
            {orderDetails.length === 0 ? (
              <h3>No items in your order.</h3>
            ) : (
              orderDetails.map((order, index) => (
                <CheckoutCard
                  key={index}
                  menuItemType={order.menuItemType}
                  orderDetails={[
                    order.side,
                    ...(order.entrees || []),
                    order.appetizer,
                    order.alacarte,
                    order.drink,
                    order.rewards
                  ]
                    .filter(Boolean)
                    .join(", ")}
                  price={order.price.toFixed(2)}
                  handleCardRemove={() => removeOrder(index)}
                  handleEditOrder={() => {
                    editOrder(index);
                    navigate("/food-item", { state: { role } });
                  }}
                  promo={role === "cashier"}
                  promoOrder={addFoodItemPromoToOrder}
                  currentOrder={order}
                  handleRewards={() => handleApplyRewardPoints(index)}
                >
                  {rewardPoints >= Math.abs(order.price) * 100 && (
                    <button onClick={() => handleApplyRewardPoints(index)}>
                      Apply Points
                    </button>
                  )}
                </CheckoutCard>  
              ))
            )}
          </div>
          <div className="receipt-container">
            <Receipt orders={orders} handlePlaceOrder={handlePlaceOrder} />
          </div>
        </div>
        <div className="nav-btn-container">
          <button onClick={() => navigate("/new-order", { state: { role } })}>Back</button>
        </div>
      </div>
      {isModalVisible && (
        <div className="modal-container">
          <CompletedModal onClose={handleCloseModal} orderNumber={orderNumber} cashier={role === "customer"} /> </div>
      )}
    </div>
  );
}

export default CheckoutPage;