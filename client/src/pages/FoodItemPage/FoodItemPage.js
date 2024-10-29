import './FoodItemPage.css'
import Logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom'
import FoodItemBtn from '../../components/FoodItemBtn/FoodItemBtn';

function FoodItemPage() {

  const navigate = useNavigate();

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
        {/* Hard-coded buttons for now, will eventually call API and create buttons based on results */}
        <FoodItemBtn
          name="Orange Chicken"
          imgSrc="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png"
        />
        <button>Fried Rice</button>
        <button>Chow Mein</button>
        <button>Super Greens</button>
      </div>
      <div class="nav-btn-container">
        {/* Will eventually use logic to decide which page to route to because not always the same*/}
        <button onClick={() => navigate("/new-order")}>Back</button>
      </div>
    </div>
  )
}

export default FoodItemPage