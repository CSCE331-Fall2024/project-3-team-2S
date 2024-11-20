import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage/StartPage'
import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import FoodItemPage from './pages/FoodItemPage/FoodItemPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'

import OrderHistoryPage from './pages/manager/OrderHistoryPage/OrderHistoryPage'
import InventoryPage from './pages/manager/InventoryPage/InventoryPage'
import FoodItemsPage from './pages/manager/FoodItemsPage/FoodItemsPage'
import EmployeePage from './pages/manager/EmployeePage/EmployeePage'
<<<<<<< HEAD
import CashierPage from './pages/CashierPage/CashierPage'
=======
import ReportsPage from './pages/manager/ReportsPage/ReportsPage'

>>>>>>> 1c72a45da4252f1a6e9b94f9ae59a60a1d3aa7bc
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
          <Route path="/fooditems" element={<FoodItemsPage />} />
          <Route path="/employees" element={<EmployeePage />} />
<<<<<<< HEAD
          <Route path="/cashier" element={<CashierPage />} />
=======
          <Route path="/reports" element={<ReportsPage />} />
>>>>>>> 1c72a45da4252f1a6e9b94f9ae59a60a1d3aa7bc
        </Routes>
      </Router>
    </OrderProvider>
    // <CashierOrderProvider>
    //   <CashierOrderPage />
    // </CashierOrderProvider>
  )
}

export default App;
