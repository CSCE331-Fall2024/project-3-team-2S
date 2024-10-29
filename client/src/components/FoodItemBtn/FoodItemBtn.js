import './FoodItemBtn.css'

function FoodItemBtn({ name, imgSrc }) {
  return (
    <button>
      <img src={imgSrc} />
      <h2>{name}</h2>
    </button>
  )
}

export default FoodItemBtn
