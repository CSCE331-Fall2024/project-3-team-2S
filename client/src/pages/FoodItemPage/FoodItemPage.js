import './FoodItemPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodItems } from '../../api/GetFoodItems';
import { useOrderContext } from '../../context/OrderContext';
import Logo from "../../assets/images/logo.png";
import FoodItemBtn from '../../components/FoodItemBtn/FoodItemBtn';
import Chevron from '../../components/Chevron/Chevron';

function FoodItemPage() {

  const [currentStep, setCurrentStep] = useState(1); // State to hold current step
  const totalSteps = 2;
  // const imageUrls = ['url1', 'url2', 'url3', 'url4', 'url5'];

  const navigate = useNavigate();
  const { menuItemType, addToOrder, currentEditOrder } = useOrderContext();

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
    if (currentEditOrder) {
      setSideSelected(currentEditOrder.side || null);
      setEntreesSelected(currentEditOrder.entrees || []);
      setAppetizerSelected(currentEditOrder.appetizer || null);
      setAlacarteSelected(currentEditOrder.alacarte || null);
      setDrinkSelected(currentEditOrder.drink || null);
    } else {
      setSideSelected(null);
      setEntreesSelected([]);
      setAppetizerSelected(null);
      setAlacarteSelected(null);
      setDrinkSelected(null);
    }
  }, [currentEditOrder, menuItemType]);

  const updateStep = (newStep) => {
    console.log("Setting step to " + newStep);
    if (newStep >= 1 && newStep <= totalSteps) {
      setCurrentStep(newStep); // Update the current step
    }
  };

  const handleSelect = (foodid, category) => {
    console.log("Handling select");
    updateStep((currentStep + 1))
    if (menuItemType === "A La Carte" && (category === "Side" || category === "Entree")) {
      setAlacarteSelected(alacarteSelected === foodid ? null : foodid);
    } else if (selectionStep === "Side" && ["Bowl", "Plate", "Bigger Plate"].includes(menuItemType) && category === "Side") {
      setSideSelected(sideSelected === foodid ? null : foodid);
    } else if (menuItemType === "Appetizer" && category === "Appetizer") {
      setAppetizerSelected(appetizerSelected === foodid ? null : foodid);
    } else if (menuItemType === "Drink" && category === "Drink") {
      setDrinkSelected(drinkSelected === foodid ? null : foodid);
    } else if (selectionStep === "Entree" && category === "Entree") {
      if (!entreesSelected.includes(foodid) && entreesSelected.length < entreeLimit) {
        setEntreesSelected([...entreesSelected, foodid]);
      } else if (entreesSelected.includes(foodid)) {
        setEntreesSelected(entreesSelected.filter(id => id !== foodid));
      }
    }
  };

  const handleAddToOrder = () => {
    const price = calculatePrice(menuItemType);
    const orderItem = {
      menuItemType,
      price,
      side: sideSelected,
      entrees: entreesSelected,
      appetizer: appetizerSelected,
      alacarte: alacarteSelected,
      drink: drinkSelected,
    };
    currentEditOrder ? navigate("/checkout") : navigate("/new-order");
    addToOrder(orderItem);
  };

  function calculatePrice(menuItemType) {
    switch (menuItemType) {
      case "Bowl":
        return 8.30;
      case "Plate":
        return 9.80;
      case "Bigger Plate":
        return 11.30;
      case "Appetizer":
        return 2.00;
      case "A La Carte":
        return 4.00;
      case "Drink":
        return 1.00;
      default:
        return 0.00;
    }
  }

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

  const imageUrls = [
    "https://olo-images-live.imgix.net/72/7288570f72a54140a41afdcfbd0e8980.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=5c543defe38946e36a8694d0b149fda4"
  ];

  console.log(sideSelected, entreesSelected, appetizerSelected, alacarteSelected, drinkSelected);

  return (
    <div className="container">
      <div className="top-container">
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>{currentEditOrder ? "Edit" : "New"} {menuItemType}</h1>
          <div className="chevron-tier"> {/* Add the chevron-tier div */}
            <Chevron
              totalSteps={totalSteps}
              currentStep={currentStep}
              updateStep={updateStep} // Pass the updateStep function
              imageUrls={imageUrls} 
            />
          </div>
        </div>

        {/* <div className="order-chevron-div">
        </div> */}
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
          <button onClick={handleAddToOrder}>{currentEditOrder ? "Update Order" : "Add to Order"}</button>
        ) : null}
      </div>
    </div>
  );
}

export default FoodItemPage;