import './FoodItemDetailsModal.css';
import { useOrderContext } from '../../context/OrderContext';

function FoodItemDetailsModal() {
  const { foodItemDetails, closeFoodItemDetailsModal } = useOrderContext();

  function onClose() {
    closeFoodItemDetailsModal();
  }

  return (
    <div className="fooditemdetails-modal-container">
      <div className="fooditemdetails-modal-text-container">
        <h1 className="fooditemdetails-modal-title">
          {foodItemDetails?.name} Details:
        </h1>
        <h3 className="fooditemdetails-modal-text">
          Calories: {foodItemDetails?.calories}
        </h3>
        <h3 className="fooditemdetails-modal-text">
          Gluten Free: {foodItemDetails?.isgf ? 'Yes' : 'No'}
        </h3>
        <h3 className="fooditemdetails-modal-text">
          Premium: {foodItemDetails?.premium ? 'Yes' : 'No'}
        </h3>
        <h3 className="fooditemdetails-modal-text">
          Spicy: {foodItemDetails?.isspicy ? 'Yes' : 'No'}
        </h3>
        <h3 className="fooditemdetails-modal-text">
          Vegetarian: {foodItemDetails?.isvegetarian ? 'Yes' : 'No'}
        </h3>
      </div>
      <div className="fooditemdetails-modal-btn-container">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default FoodItemDetailsModal;
