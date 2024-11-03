import './NewOrderPage.css'
import Logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom'
import { useOrderContext } from '../../context/OrderContext'
import MenuItemBtn from '../../components/MenuItemBtn/MenuItemBtn'

function NewOrderPage() {

  const navigate = useNavigate();
  const { setMenuItemType } = useOrderContext();
  
  const handleMenuItemSelection = (menuItemType) => {
    setMenuItemType(menuItemType);
    navigate("/food-item");
  }

  return (
    <div class="container">
      <div class="header-container">
        <img src={Logo} />
        <h1>New Order</h1>
      </div>
      <div class="menu-item-container">
        <MenuItemBtn
          name="Bowl"
          imgSrc="https://olo-images-live.imgix.net/72/7288570f72a54140a41afdcfbd0e8980.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=5c543defe38946e36a8694d0b149fda4"
          price={8.30}
          onClick={() => handleMenuItemSelection("Bowl")}
        />
        <MenuItemBtn
          name="Plate"
          imgSrc="https://olo-images-live.imgix.net/dd/dd91fc53f7124f86ae7833eede4a802f.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=b08d9fd5cc269c84f2b223298752819d"
          price={9.80}
          onClick={() => handleMenuItemSelection("Plate")}
        />
        <MenuItemBtn
          name="Bigger Plate"
          imgSrc="https://olo-images-live.imgix.net/39/39cf53c131764ddbb70efaedaaf60201.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=c60acecc206a1ae26f7ce8c6cef07399"
          price={11.30}
          onClick={() => handleMenuItemSelection("Bigger Plate")}
        />
        <MenuItemBtn
          name="Appetizer"
          imgSrc="https://olo-images-live.imgix.net/27/2781a499f8014ee3b46b90643666f757.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=00aa9e5c14013749a287e8a33876e609"
          price={2.00}
          onClick={() => handleMenuItemSelection("Appetizer")}
        />
        <MenuItemBtn
          name="A La Carte"
          imgSrc="https://olo-images-live.imgix.net/27/272ad84a8af2494ba7cb2eecbe0c2b7e.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=fb32dcae532d307a7bbc5d7cfd83278a"
          price={4.00}
          onClick={() => handleMenuItemSelection("A La Carte")}
        />
        <MenuItemBtn
          name="Drink"
          imgSrc="https://olo-images-live.imgix.net/05/0543dea3f26343c197194e1102d44d25.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=716&h=474&fit=crop&fm=png32&s=875daff9982b3bafd3f9d890f31f50cb"
          price={1.00}
          onClick={() => handleMenuItemSelection("Drink")}
        />
      </div>
      <div class="nav-btn-container">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  )
}

export default NewOrderPage
