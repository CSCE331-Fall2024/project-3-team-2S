import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartPage from './pages/Customer/StartPage/StartPage'
import NewOrderPage from './pages/Customer/NewOrderPage/NewOrderPage'
import FoodItemPage from './pages/Customer/FoodItemPage/FoodItemPage'
import CheckoutPage from './pages/Customer/CheckoutPage/CheckoutPage'
import InventoryPage from './pages/manager/InventoryPage'
import { OrderProvider } from './context/OrderContext'
import './App.css'

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/new-order" element={<NewOrderPage />} />
          <Route path="/food-item" element={<FoodItemPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </Router>
    </OrderProvider>

  )
}

export default App;
