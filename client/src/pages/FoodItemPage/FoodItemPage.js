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
      imgSrc="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png" // Replace with dynamic image URL if available
    />
  ))

  return (
    <div>
      <div class="header-container">
        <img src={Logo} />
        <h1>New MENUITEM</h1>
      </div>
      <div class="progress-bar-container">
        <h2>PLACEHOLDER FOR PROGRESS BAR ARROW</h2>
      </div>
      <div class="food-item-type-container">
        Select FOODITEM TYPE
      </div>
      <div class="food-item-container">
        {foodItemElements}
      </div>
      <div class="nav-btn-container">
        {/* Will eventually use logic to decide which page to route to because not always the same*/}
        <button onClick={() => navigate("/new-order")}>Back</button>
      </div>
    </div>
  )
}

export default FoodItemPage