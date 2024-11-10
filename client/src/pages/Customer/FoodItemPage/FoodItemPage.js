import './FoodItemPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodItems } from '../../../api/GetFoodItems';
import { useOrderContext } from '../../../context/OrderContext';
import Logo from "../../../assets/images/logo.png";
import FoodItemBtn from '../../../components/FoodItemBtn/FoodItemBtn';

function FoodItemPage() {
  const navigate = useNavigate();
  const { menuItemType, addToOrder, currentEditOrder } = useOrderContext();

  const [foodItems, setFoodItems] = useState([]);
  const [selectionStep, setSelectionStep] = useState("Side");
  const [selection, setSelection] = useState({
    side: null,
    entrees: [],
    appetizer: null,
    alacarte: null,
    drink: null,
  });

  console.log(selection)

  const entreeLimit = menuItemType === "Bowl" ? 1 : menuItemType === "Plate" ? 2 : menuItemType === "Bigger Plate" ? 3 : 0;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const allFoodItems = await getFoodItems();
        let filteredItems;

        if (menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") {
          filteredItems = allFoodItems.filter(item => item.category === selectionStep);
        } else if (menuItemType === "A La Carte") {
          filteredItems = allFoodItems.filter(item => item.category === "Side" || item.category === "Entree");
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
      setSelection({
        side: currentEditOrder.side || null,
        entrees: currentEditOrder.entrees || [],
        appetizer: currentEditOrder.appetizer || null,
        alacarte: currentEditOrder.alacarte || null,
        drink: currentEditOrder.drink || null,
      });
    } else {
      setSelection({
        side: null,
        entrees: [],
        appetizer: null,
        alacarte: null,
        drink: null,
      });
    }
  }, [currentEditOrder, menuItemType]);

  const handleIncrease = (foodid, category) => {
    setSelection(prevSelection => {
      const updatedSelection = { ...prevSelection };
  
      if (menuItemType === "A La Carte" && (category === "Side" || category === "Entree")) {
        if (!updatedSelection.alacarte) {
          updatedSelection.alacarte = foodid;
        }
      } else if (selectionStep === "Side" && ["Bowl", "Plate", "Bigger Plate"].includes(menuItemType) && category === "Side") {
        updatedSelection.side = foodid;
      } else if (menuItemType === "Appetizer" && category === "Appetizer") {
        updatedSelection.appetizer = foodid;
      } else if (menuItemType === "Drink" && category === "Drink") {
        updatedSelection.drink = foodid;
      } else if (selectionStep === "Entree" && category === "Entree") {
        if (updatedSelection.entrees.length < entreeLimit) {
          updatedSelection.entrees = [...updatedSelection.entrees, foodid];
        }
      }
  
      return updatedSelection;
    });
  };  
  

  const handleDecrease = (foodid, category) => {
    setSelection(prevSelection => {
      const updatedSelection = { ...prevSelection };
  
      if (menuItemType === "A La Carte" && (category === "Side" || category === "Entree")) {
        if (updatedSelection.alacarte === foodid) {
          updatedSelection.alacarte = null;
        }
      } else if (selectionStep === "Entree" && category === "Entree") {
        updatedSelection.entrees = updatedSelection.entrees.filter((id, index) => {
          const countOfCurrentItem = prevSelection.entrees.slice(0, index + 1).filter(val => val === foodid).length;
          return countOfCurrentItem > 1 || id !== foodid;
        });
      } else if (selectionStep === "Side" && category === "Side" && prevSelection.side === foodid) {
        updatedSelection.side = null;
      } else if (selectionStep === "Appetizer" && category === "Appetizer" && prevSelection.appetizer === foodid) {
        updatedSelection.appetizer = null;
      } else if (selectionStep === "Drink" && category === "Drink" && prevSelection.drink === foodid) {
        updatedSelection.drink = null;
      }
  
      return updatedSelection;
    });
  };
  

  const handleAddToOrder = () => {
    const price = calculatePrice(menuItemType);
    const orderItem = {
      menuItemType,
      price,
      ...selection,
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
      id={item.foodid}
      name={item.name}
      imgSrc={item.imagesrc}
      isSelected={
        item.foodid === selection.side || 
        item.foodid === selection.appetizer || 
        item.foodid === selection.alacarte || 
        item.foodid === selection.drink ||
        selection.entrees.includes(item.foodid)
      }
      isDisabled={
        (selectionStep === "Side" && selection.side && item.foodid !== selection.side) ||
        (selectionStep === "Appetizer" && selection.appetizer && item.foodid !== selection.appetizer) ||
        (selectionStep === "Side or Entree" && selection.alacarte && item.foodid !== selection.alacarte) ||
        (selectionStep === "Drink" && selection.drink && item.foodid !== selection.drink) ||
        (selectionStep === "Entree" && selection.entrees.length >= entreeLimit && !selection.entrees.includes(item.foodid))
      }
      selection={selection}
      selectionStep={selectionStep}
      onIncrease={() => handleIncrease(item.foodid, item.category)}
      onDecrease={() => handleDecrease(item.foodid, item.category)}
    />
  ));

  return (
    <div className="container">
      <div className="top-container">
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>{currentEditOrder ? "Edit" : "New"} {menuItemType}</h1>
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
          <button onClick={handleAddToOrder}>{currentEditOrder ? "Update Order" : "Add to Order"}</button>
        ) : null}
      </div>
    </div>
  );
}

export default FoodItemPage;