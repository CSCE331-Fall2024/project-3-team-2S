import IncDecBtn from '../IncDecBtn/IncDecBtn';
import './FoodItemBtn.css';

function FoodItemBtn({ foodID, name, imgSrc, isSelected, isDisabled, selectionStep, amount, onIncrease, onDecrease, handleInfoClick, details = true }) {
  return (
    <div className="food-item-btn-container">
      <button 
        className={`food-item-btn ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
        disabled={isDisabled}
        onClick={handleInfoClick}
      >
        <h2>{name}</h2>
        {details && <img src={imgSrc} alt={name} />}
      </button>
      <div className="food-item-btn-add-dec-btn-container">
        <IncDecBtn
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          selectionStep={selectionStep}
          amount={amount}
        />
      </div>
    </div>
  );
}

export default FoodItemBtn;