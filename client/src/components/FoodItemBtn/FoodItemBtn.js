import IncDecBtn from '../IncDecBtn/IncDecBtn';
import './FoodItemBtn.css';

function FoodItemBtn({ id, name, imgSrc, isSelected, isDisabled, selection, selectionStep, onIncrease, onDecrease }) {
  return (
    <div className="food-item-btn-container">
      <button 
        className={`food-item-btn ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
        disabled={isDisabled}
      >
        <h2>{name}</h2>
        <img src={imgSrc} alt={name} />
      </button>
      <div className="food-item-btn-add-dec-btn-container">
        <IncDecBtn
          id={id}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          selection={selection}
          selectionStep={selectionStep}
        />
      </div>
    </div>
  );
}

export default FoodItemBtn;
