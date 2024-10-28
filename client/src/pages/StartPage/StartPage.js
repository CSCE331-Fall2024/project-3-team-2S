import './StartPage.css'
import Logo from '../../assets/images/logo.png'

function StartPage() {
  return (
    <div className="start-page">
      <img src={Logo} alt="Panda Express Logo" />
      <button
        onClick={() => {
          console.log("Redirect to new order page.")
        }}
      >
        New Order
      </button>
      <button
        onClick={() => {
          console.log("Redirect to customer id page.")
        }}
      >
        Enter Customer ID
      </button>
    </div>
  )
}

export default StartPage
