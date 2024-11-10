import './IncDecBtn.css'

function IncDecBtn({ id, onIncrease, onDecrease, selection, selectionStep }) {

  function getCountBasedOnSelection() {
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

  return (
    <div className="inc-dec-btn-container">
      <button className="inc-dec-btn" onClick={onDecrease} disabled={getCountBasedOnSelection() === 0}>-</button>
      <h3>{getCountBasedOnSelection()}</h3>
      <button className="inc-dec-btn" onClick={onIncrease} disabled={getCountBasedOnSelection() >= 1 && selectionStep !== "Entree"}>+</button>
    </div>
  );
}

export default IncDecBtn;
