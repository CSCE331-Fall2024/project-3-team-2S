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

function CheckoutPage() {
  const navigate = useNavigate();
  const { orders, removeOrder, editOrder, clearOrder } = useOrderContext();

  const [orderDetails, setOrderDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(null);

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

            return {
              menuItemType: order.menuItemType,
              price: order.price,
              side: sideName,
              entrees: entreeNames,
              appetizer: appetizerName,
              alacarte: alacarteName,
              drink: drinkName,
            };
          })
        );
        setOrderDetails(details);

        // Fetch total price and reward points only if customerId is available
        if (customerId) {
          const response = await fetch(
            `http://localhost:3001/api/customer-total-price?customerId=${customerId}`
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

  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearOrder();
    navigate("/");
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
              <p><strong>Total Price: </strong>${totalPrice.toFixed(2)}</p>
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
                    order.drink
                  ].filter(Boolean).join(', ')}
                  price={(order.price).toFixed(2)}
                  handleCardRemove={() => removeOrder(index)}
                  handleEditOrder={() => {
                    editOrder(index);
                    navigate("/food-item");
                  }}
                />
              ))
            )}
          </div>
          <div className="receipt-container">
            <Receipt orders={orders} handlePlaceOrder={handlePlaceOrder} />
          </div>
        </div>
        <div className="nav-btn-container">
          <button onClick={() => navigate("/new-order")}>Back</button>
        </div>
      </div>
      {isModalVisible && (
        <div className="modal-container">
          <CompletedModal onClose={handleCloseModal} orderNumber={orderNumber} />
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;