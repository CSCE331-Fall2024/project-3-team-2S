import './FoodItemPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodItems } from '../../api/GetFoodItems';
import { useOrderContext } from '../../context/OrderContext';
import Logo from "../../assets/images/logo.png";
import FoodItemBtn from '../../components/FoodItemBtn/FoodItemBtn';
import Chevron from '../../components/Chevron/Chevron';
import { getFoodItemFromID } from '../../api/GetFoodItemFromID';
import FoodItemDetailsModal from '../../components/FoodItemDetailsModal/FoodItemDetailsModal';

function FoodItemPage() {
  // Used for chevron
  const [totalSteps, setTotalSteps] = useState(0);
  const [imageUrls, setImageUrls] = useState([ ]);

  const navigate = useNavigate();
  const { menuItemType, addToOrder, currentEditOrder, setFoodItemDetailsInContext, isFoodItemDetailsModalVisible, openFoodItemDetailsModal, exitEditOrder } = useOrderContext();

  const [foodItems, setFoodItems] = useState([]);
  const [selectionStep, setSelectionStep] = useState("Side");
  const [selection, setSelection] = useState({
    side: null,
    entrees: [],
    appetizer: null,
    alacarte: null,
    drink: null,
  });

  const entreeLimit = menuItemType === "Bowl" ? 1 : menuItemType === "Plate" ? 2 : menuItemType === "Bigger Plate" ? 3 : 0;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const allFoodItems = await getFoodItems();
        let filteredItems;

        if(menuItemType === "Bowl") setTotalSteps(2);
        if(menuItemType === "Plate") setTotalSteps(3);
        if(menuItemType === "Bigger Plate") setTotalSteps(4);

        if (menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") {
          filteredItems = allFoodItems.filter(item => item.category === selectionStep);
        } else if (menuItemType === "A La Carte") {
          filteredItems = allFoodItems.filter(item => item.category === "Side");
          filteredItems.push(...allFoodItems.filter(item => item.category === "Entree"));
          setSelectionStep("Side or Entree");
          setTotalSteps(1);
        } else if (menuItemType === "Appetizer") {
          filteredItems = allFoodItems.filter(item => item.category === "Appetizer");
          setSelectionStep("Appetizer");
          setTotalSteps(1);
        } else if (menuItemType === "Drink") {
          filteredItems = allFoodItems.filter(item => item.category === "Drink");
          setSelectionStep("Drink");
          setTotalSteps(1);
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
      // Update selection
      setSelection({
        side: currentEditOrder.side || null,
        entrees: currentEditOrder.entrees || [],
        appetizer: currentEditOrder.appetizer || null,
        alacarte: currentEditOrder.alacarte || null,
        drink: currentEditOrder.drink || null,
      });
  
      // Update imageUrls for the chevron based on the currentEditOrder
      const updateImageUrls = async () => {
        const allFoodItems = await getFoodItems();
        const urls = [];
        if (currentEditOrder.side) {
          const sideItem = allFoodItems.find(item => item.foodid === currentEditOrder.side);
          if (sideItem) urls.push(sideItem.imagesrc);
        }
        if (currentEditOrder.entrees && currentEditOrder.entrees.length > 0) {
          currentEditOrder.entrees.forEach(entreeId => {
            const entreeItem = allFoodItems.find(item => item.foodid === entreeId);
            if (entreeItem) urls.push(entreeItem.imagesrc);
          });
        }
        if (currentEditOrder.appetizer) {
          const appetizerItem = allFoodItems.find(item => item.foodid === currentEditOrder.appetizer);
          if (appetizerItem) urls.push(appetizerItem.imagesrc);
        }
        if (currentEditOrder.alacarte) {
          const alacarteItem = allFoodItems.find(item => item.foodid === currentEditOrder.alacarte);
          if (alacarteItem) urls.push(alacarteItem.imagesrc);
        }
        if (currentEditOrder.drink) {
          const drinkItem = allFoodItems.find(item => item.foodid === currentEditOrder.drink);
          if (drinkItem) urls.push(drinkItem.imagesrc);
        }
        setImageUrls(urls);
      };
  
      updateImageUrls();
    }
  }, [currentEditOrder]);
  

  const handleIncrease = (foodid, category, newUrl) => {
    setSelection(prevSelection => {
      const updatedSelection = { ...prevSelection };
  
      if (menuItemType === "A La Carte" && (category === "Side" || category === "Entree")) {
        if (!updatedSelection.alacarte) {
          updatedSelection.alacarte = foodid;
          setImageUrls((prevUrls) => [...prevUrls, newUrl]);
        }
      } else if (selectionStep === "Side" && ["Bowl", "Plate", "Bigger Plate"].includes(menuItemType) && category === "Side") {
        updatedSelection.side = foodid;
        setImageUrls((prevUrls) => [...prevUrls, newUrl]);
      } else if (menuItemType === "Appetizer" && category === "Appetizer") {
        updatedSelection.appetizer = foodid;
        setImageUrls((prevUrls) => [...prevUrls, newUrl]);
      } else if (menuItemType === "Drink" && category === "Drink") {
        updatedSelection.drink = foodid;
        setImageUrls((prevUrls) => [...prevUrls, newUrl]);
      } else if (selectionStep === "Entree" && category === "Entree") {
        if (updatedSelection.entrees.length < entreeLimit) {
          updatedSelection.entrees = [...updatedSelection.entrees, foodid];
          setImageUrls((prevUrls) => [...prevUrls, newUrl]);
        }
      }
  
      return updatedSelection;
    });
  };  
  

  const handleDecrease = (foodid, category, removeUrl) => {
    setImageUrls((prevUrls) => {
      const index = prevUrls.findIndex((url) => url === removeUrl);
      if (index === -1) return prevUrls; // If not found, return the original array
      return [...prevUrls.slice(0, index), ...prevUrls.slice(index + 1)];
    });

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

  const handleInfoClick = async (foodid) => {
    try {
      const foodDetails = await getFoodItemFromID(foodid); // Fetch food details
      setFoodItemDetailsInContext(foodDetails); // Set the fetched details in context
      openFoodItemDetailsModal();
    } catch (error) {
      console.error("Failed to fetch food item details:", error);
    }
  };

  function getCountBasedOnSelection(id) {
    switch (selectionStep) {
      case "Entree":
        return selection.entrees.filter(foodid => foodid === id).length;
      case "Side":
        return selection.side === id ? 1 : 0;
      case "Appetizer":
        return selection.appetizer === id ? 1 : 0;
      case "Side or Entree":
        return selection.alacarte === id ? 1 : 0;
      case "Drink":
        return selection.drink === id ? 1 : 0;
      default:
        return 0;
    }
  }

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
      foodID={item.foodid}
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
      selectionStep={selectionStep}
      amount={getCountBasedOnSelection(item.foodid)}
      onIncrease={() => handleIncrease(item.foodid, item.category, item.imagesrc)}
      onDecrease={() => handleDecrease(item.foodid, item.category, item.imagesrc)}
      handleInfoClick={() => handleInfoClick(item.foodid)}
    />
  ));

  return (
    <div className="container">
      {isFoodItemDetailsModalVisible && (
        <div className="overlay"></div> // Add the overlay conditionally
      )}
      <div className="top-container">
        <div className="header-container">
          <img src={Logo} alt="Logo" />
          <h1>{currentEditOrder ? "Edit" : "New"} {menuItemType}</h1>
          <div className="chevron-tier"> {/* Add the chevron-tier div */}
            <Chevron
              totalSteps={totalSteps}
              imageUrls={imageUrls} 
            />
          </div>
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
      <div className={`food-item-container ${isFoodItemDetailsModalVisible ? "blurred" : ""}`}>
        {foodItemElements}
      </div>
      <div className="nav-btn-container">
          <button onClick={() => {
          if (selectionStep === "Entree") {
            setSelectionStep("Side");
          } else if (currentEditOrder) {
            exitEditOrder();
            navigate("/checkout");
          } else {
            navigate("/new-order");
          }
        }}>
          Back
        </button>

        {(menuItemType === "Bowl" || menuItemType === "Plate" || menuItemType === "Bigger Plate") && selectionStep === "Side" && selection.side !== null && (
          <button onClick={() => setSelectionStep("Entree")}>Next</button>
        )}
        
        {
        totalSteps === imageUrls.length &&
          (
            (["Bowl", "Plate", "Bigger Plate"].includes(menuItemType) && selectionStep === "Entree") ||
            (!["Bowl", "Plate", "Bigger Plate"].includes(menuItemType))
          ) && (
            <button onClick={handleAddToOrder}>
              {currentEditOrder ? "Update Order" : "Add to Order"}
            </button>
          )
        }
      </div>
      {isFoodItemDetailsModalVisible && <FoodItemDetailsModal />}
    </div>
  );
}

export default FoodItemPage;