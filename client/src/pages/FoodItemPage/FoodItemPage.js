import './FoodItemPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodItems } from '../../api/FoodItems';
import { useOrderContext } from '../../context/OrderContext';
import Logo from "../../assets/images/logo.png";
import FoodItemBtn from '../../components/FoodItemBtn/FoodItemBtn';

function FoodItemPage() {
  const navigate = useNavigate();
  const { menuItemType } = useOrderContext();

  const [foodItems, setFoodItems] = useState([]);
  const [selectionStep, setSelectionStep] = useState("Side"); // Tracks current step: "Side" or "Entree"

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const allFoodItems = await getFoodItems();
        
        let filteredItems;
        
        // Logic based on menuItemType
        if (menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") {
          // For Bowl, Plate, Bigger Plate: Show sides first, then entrees
          filteredItems = allFoodItems.filter(item => item.category === selectionStep);
        } else if (menuItemType === "A La Carte") {
          // For A La Carte: Show both sides and entrees
          filteredItems = allFoodItems.filter(item => item.category === "Side" || item.category === "Entree");
          setSelectionStep("Side or Entree");
        } else if (menuItemType === "Appetizer" || menuItemType === "Drink") {
          // For Appetizer and Drink: Show only appetizers
          filteredItems = allFoodItems.filter(item => item.category === "Appetizer");
          setSelectionStep("Appetizer");
        }

        setFoodItems(filteredItems);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };

    fetchFoodItems();
  }, [selectionStep, menuItemType]); // Refetch food items when selectionStep or menuItemType changes

  // Determine how many entrees to select based on menuItemType
  const entreeCount = menuItemType === "Plate" ? 2 : menuItemType === "Bigger Plate" ? 3 : 1;

  // Update the selection step when clicking "Next"
  const handleNext = () => {
    if (selectionStep === "Side" && (menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate")) {
      setSelectionStep("Entree"); // Move to entree selection
    } else {
      console.log("Proceed to the next stage (e.g., summary or checkout)");
      // Add any navigation logic here if needed
    }
  };

  const foodItemElements = foodItems.map(item => (
    <FoodItemBtn 
      key={item.foodid}
      name={item.name}
      imgSrc={item.imagesrc}
    />
  ));

  return (
    <div className="container">
      <div className="top-container">
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>New {menuItemType}</h1>
        </div>
        <div className="progress-bar-container">
          <h2>PLACEHOLDER FOR PROGRESS BAR ARROW</h2>
        </div>
        <div className="food-item-type-container">
          <h3>
            {menuItemType === "A La Carte" || menuItemType === "Appetizer" || menuItemType === "Drink"
              ? `Select ${selectionStep}`
              : selectionStep === "Side"
              ? "Select Side"
              : `Select ${entreeCount} Entree${entreeCount > 1 ? "s" : ""}`}
          </h3>
        </div>
      </div>
      <div className="food-item-container">
        {foodItemElements}
      </div>
      <div className="nav-btn-container">
        <button onClick={() => navigate("/new-order")}>Back</button>
        {(menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") && selectionStep === "Side" && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
}

export default FoodItemPage;
