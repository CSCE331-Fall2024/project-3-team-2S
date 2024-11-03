import './MenuItemBtn.css';

function MenuItemBtn({ name, imgSrc, price, onClick }) {
  return (
    <button 
      className="menu-item-btn"
      onClick={onClick}
    >
      <img src={imgSrc} alt={name} />
      <h2>{name}</h2>
      <h3>${price.toFixed(2)}+</h3>
    </button>
  );
}

export default MenuItemBtn;
