import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage/StartPage'
import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import FoodItemPage from './pages/FoodItemPage/FoodItemPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'

import OrderHistoryPage from './pages/manager/OrderHistoryPage/OrderHistoryPage'
import InventoryPage from './pages/manager/InventoryPage/InventoryPage'
import ItemsPage from './pages/manager/ItemsPage/ItemsPage'
import EmployeePage from './pages/manager/EmployeePage/EmployeePage'
import ReportsPage from './pages/manager/ReportsPage/ReportsPage'

import CashierOrderPage from './pages/CashierOrderPage/CashierOrderPage'
import { OrderProvider } from './context/OrderContext'
import { CashierOrderProvider } from './context/CashierOrderContext'
import './App.css'

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          {/* CUSTOMER */}
          <Route path="/" element={<StartPage />} />
          <Route path="/new-order" element={<NewOrderPage />} />
          <Route path="/food-item" element={<FoodItemPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* MANAGER */}
          <Route path="/orderhistory" element={<OrderHistoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Router>
    </OrderProvider>
    // <CashierOrderProvider>
    //   <CashierOrderPage />
    // </CashierOrderProvider>
  )
}

export default App;
