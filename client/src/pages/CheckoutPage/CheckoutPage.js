import './CheckoutPage.css';
import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import { getFoodItemFromID } from '../../api/GetFoodItemFromID';
import CheckoutCard from '../../components/CheckoutCard/CheckoutCard';

function CheckoutPage() {
  const navigate = useNavigate();
  const { orders, removeOrder } = useOrderContext();

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const details = await Promise.all(
        orders.map(async (order) => {
          const sideName = order.side ? await getFoodItemFromID(order.side) : null;
          const entreeNames = order.entrees && order.entrees.length > 0
            ? await Promise.all(order.entrees.map(entreeId => getFoodItemFromID(entreeId)))
            : null;
          const appetizerName = order.appetizer ? await getFoodItemFromID(order.appetizer) : null;
          const alacarteName = order.alacarte ? await getFoodItemFromID(order.alacarte) : null;
          const drinkName = order.drink ? await getFoodItemFromID(order.drink) : null;
          
          return {
            menuItemType: order.menuItemType,
            side: sideName,
            entrees: entreeNames,
            appetizer: appetizerName,
            alacarte: alacarteName,
            drink: drinkName
          };
        })
      );
      setOrderDetails(details);
    };

    if (orders.length > 0) {
      fetchOrderDetails();
    }
  }, [orders]);

  function handleCardRemove(index) {
    removeOrder(index);
  }

  console.log(orders)
  console.log("Details", orderDetails)

  return (
    <div>
      <div className="header-container">
        <img src={Logo} alt="Logo" />
        <h1>Checkout</h1>
      </div>
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
              price="69.00"
              handleCardRemove={() => handleCardRemove(index)}
            />
          ))
        )}   
      </div>
      <div className="nav-btn-container">
        <button onClick={() => navigate("/new-order")}>Back</button>
        <button>Tendered</button>
      </div>
    </div>
  );
}

export default CheckoutPage;
