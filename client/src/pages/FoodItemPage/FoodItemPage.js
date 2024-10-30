import './FoodItemPage.css'
import Logo from "../../assets/images/logo.png"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getFoodItems } from '../../api/foodItems';
import FoodItemBtn from '../../components/FoodItemBtn/FoodItemBtn';

function FoodItemPage() {

  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const allFoodItems = await getFoodItems();
        const sideItems = allFoodItems.filter(item => item.category === 'Entree');
        setFoodItems(sideItems);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    }
    
    fetchFoodItems();
  }, [])

  const foodItemElements = foodItems.map(item => (
    <FoodItemBtn 
      key={item.foodid}
      name={item.name}
      imgSrc={item.imagesrc}
    />
  ))

  return (
    <div className="container">
      <div className="top-container">
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>New MENUITEM</h1>
        </div>
        <div className="progress-bar-container">
          <h2>PLACEHOLDER FOR PROGRESS BAR ARROW</h2>
        </div>
        <div className="food-item-type-container">
          <h3>Select CATEGORY</h3>
        </div>
      </div>
      <div className="food-item-container">
        {foodItemElements}
      </div>
      <div className="nav-btn-container">
        <button onClick={() => navigate("/new-order")}>Back</button>
      </div>
    </div>
  )
}

export default FoodItemPage;
