import './FoodItemBtn.css';

function FoodItemBtn({ name, imgSrc, isSelected, isDisabled, onClick }) {
  return (
    <button 
      className={`food-item-btn ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <img src={imgSrc} alt={name} />
      <h2>{name}</h2>
    </button>
  );
}

export default FoodItemBtn;
