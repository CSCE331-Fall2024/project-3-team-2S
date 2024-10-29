import './StartPage.css'
import Logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

function StartPage() {

  const navigate = useNavigate();
  
  return (
    <div className="start-page">
      <img src={Logo} alt="Panda Express Logo" />
      <button onClick={() => navigate("/new-order")}>New Order</button>
      <button onClick={() => {console.log("Redirect to customer id page.")}}>Enter Customer ID</button>
    </div>
  )
}

export default StartPage
