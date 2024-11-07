import './FoodItemPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodItems } from '../../api/GetFoodItems';
import { useOrderContext } from '../../context/OrderContext';
import Logo from "../../assets/images/logo.png";
import FoodItemBtn from '../../components/FoodItemBtn/FoodItemBtn';

function FoodItemPage() {
  const navigate = useNavigate();

  const { menuItemType, addToOrder } = useOrderContext();

  const [foodItems, setFoodItems] = useState([]);
  const [selectionStep, setSelectionStep] = useState("Side");

  const [sideSelected, setSideSelected] = useState(null);
  const [entreesSelected, setEntreesSelected] = useState([]);
  const [appetizerSelected, setAppetizerSelected] = useState(null);
  const [alacarteSelected, setAlacarteSelected] = useState(null);
  const [drinkSelected, setDrinkSelected] = useState(null);

  const entreeLimit = menuItemType === "Bowl" ? 1 : menuItemType === "Plate" ? 2 : menuItemType === "Bigger Plate" ? 3 : 0;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const allFoodItems = await getFoodItems();
        let filteredItems;
        
        // Logic based on menuItemType
        if (menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") {
          filteredItems = allFoodItems.filter(item => item.category === selectionStep);
        } else if (menuItemType === "A La Carte") {
          filteredItems = allFoodItems.filter(item => item.category === "Side");
          filteredItems.push(...allFoodItems.filter(item => item.category === "Entree"));
          setSelectionStep("Side or Entree");
        } else if (menuItemType === "Appetizer") {
          filteredItems = allFoodItems.filter(item => item.category === "Appetizer");
          setSelectionStep("Appetizer");
        } else if (menuItemType === "Drink") {
          filteredItems = allFoodItems.filter(item => item.category === "Drink");
          setSelectionStep("Drink");
        }

        setFoodItems(filteredItems);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };

    fetchFoodItems();
  }, [selectionStep, menuItemType]); 

  useEffect(() => {
    setSideSelected(null);
    setEntreesSelected([]);
    setAppetizerSelected(null);
    setAlacarteSelected(null);
    setDrinkSelected(null);
    setSelectionStep("Side");
  }, [menuItemType]); 

  const handleSelect = (foodid, category) => {
    if (menuItemType === "A La Carte" && (category === "Side" || category === "Entree")) {
      !alacarteSelected ? setAlacarteSelected(foodid) : setAlacarteSelected(null);
    } else if (selectionStep === "Side" && (menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") && category === "Side") {
      // Only select side once for these menu types
      !sideSelected ? setSideSelected(foodid) : setSideSelected(null);
    } else if (menuItemType === "Appetizer" && category === "Appetizer") {
      !appetizerSelected ? setAppetizerSelected(foodid) : setAppetizerSelected(null);
    } else if (menuItemType === "Drink" && category === "Drink") {
      !drinkSelected ? setDrinkSelected(foodid) : setDrinkSelected(null);
    } else if (selectionStep === "Entree" && category === "Entree") {
      // Handle entree selection based on entree limit
      if (!entreesSelected.includes(foodid) && entreesSelected.length < entreeLimit) {
        setEntreesSelected([...entreesSelected, foodid]);
      } else if (entreesSelected.includes(foodid)) {
        setEntreesSelected(entreesSelected.filter(id => id !== foodid));
      }
    }
  };

  const handleAddToOrder = () => {
    const orderItem = {
      menuItemType,
      side: sideSelected,
      entrees: entreesSelected,
      appetizer: appetizerSelected,
      alacarte: alacarteSelected,
      drink: drinkSelected,
    };
    addToOrder(orderItem);
    navigate("/new-order");
  };

  const foodItemElements = foodItems.map(item => (
    <FoodItemBtn 
      key={item.foodid}
      name={item.name}
      imgSrc={item.imagesrc}
      isSelected={
        item.foodid === sideSelected || 
        item.foodid === appetizerSelected || 
        item.foodid === alacarteSelected || 
        item.foodid === drinkSelected ||
        entreesSelected.includes(item.foodid)
      }
      isDisabled={
        (selectionStep === "Side" && sideSelected && item.foodid !== sideSelected) ||
        (selectionStep === "Appetizer" && appetizerSelected && item.foodid !== appetizerSelected) ||
        (selectionStep === "Side or Entree" && alacarteSelected && item.foodid !== alacarteSelected) ||
        (selectionStep === "Drink" && drinkSelected && item.foodid !== drinkSelected) ||
        (selectionStep === "Entree" && entreesSelected.length >= entreeLimit && !entreesSelected.includes(item.foodid))
      }
      onClick={() => handleSelect(item.foodid, item.category)}
    />
  ));

  console.log(sideSelected, entreesSelected, appetizerSelected, alacarteSelected, drinkSelected);

  return (
    <div className="container">
      <div className="top-container">
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>New {menuItemType}</h1>
        </div>
        <div className="food-item-type-container">
          <h3>
            {menuItemType === "A La Carte" || menuItemType === "Appetizer" || menuItemType === "Drink"
              ? `Select ${selectionStep}`
              : selectionStep === "Side"
              ? "Select Side"
              : `Select ${entreeLimit} Entree${entreeLimit > 1 ? "s" : ""}`}
          </h3>
        </div>
      </div>
      <div className="food-item-container">
        {foodItemElements}
      </div>
      <div className="nav-btn-container">
        <button onClick={() => navigate("/new-order")}>Back</button>

        {(menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") && selectionStep === "Side" && (
          <button onClick={() => setSelectionStep("Entree")}>Next</button>
        )}
        
        {((menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") && selectionStep === "Entree") ||
          (menuItemType !== "Bowl" && menuItemType !== "Plate" && menuItemType !== "Bigger Plate") ? (
          <button onClick={handleAddToOrder}>Add to Order</button>
        ) : null}
      </div>
    </div>
  );
}

export default FoodItemPage;
