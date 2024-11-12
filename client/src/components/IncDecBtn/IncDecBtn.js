import './IncDecBtn.css'

function IncDecBtn({ selectionStep, amount, onIncrease, onDecrease }) {

  return (
    <div className="inc-dec-btn-container">
      <button
        className="inc-dec-btn" onClick={onDecrease} disabled={amount === 0}>-</button>
      <h3>{amount}</h3>
      <button className="inc-dec-btn" onClick={onIncrease} disabled={amount >= 1 && selectionStep !== "Entree"}>+</button>
    </div>
  );
}

export default IncDecBtn;
