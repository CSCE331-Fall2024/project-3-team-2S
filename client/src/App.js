import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage/StartPage'
import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import FoodItemPage from './pages/FoodItemPage/FoodItemPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import RewardsPage from './pages/RewardsPage/RewardsPage'


import OrderHistoryPage from './pages/manager/OrderHistoryPage/OrderHistoryPage'
import InventoryPage from './pages/manager/InventoryPage/InventoryPage'
import FoodItemsPage from './pages/manager/FoodItemsPage/FoodItemsPage'
import EmployeePage from './pages/manager/EmployeePage/EmployeePage'
import XReportPage from './pages/manager/XReportPage/XReportPage'
import ZReportPage from './pages/manager/ZReportPage/ZReportPage'

import CashierOrderPage from './pages/CashierOrderPage/CashierOrderPage'
import { OrderProvider } from './context/OrderContext'
import { CashierOrderProvider } from './context/CashierOrderContext'
import './App.css'
import CashierPage from './pages/CashierPage/CashierPage'

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
          <Route path="/rewards" element={<RewardsPage />} />


          {/* MANAGER */}
          <Route path="/orderhistory" element={<OrderHistoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/fooditems" element={<FoodItemsPage />} />
          <Route path="/employees" element={<EmployeePage />} />
            {/* REPORTS */}
            <Route path="/reports/xreport" element={<XReportPage />} />
            <Route path="/reports/zreport" element={<ZReportPage />} />

          {/* CASHIER */}
          <Route path="/cashier" element={<CashierPage />} />
          
        </Routes>
      </Router>
    </OrderProvider>
    // <CashierOrderProvider>
    //   <CashierOrderPage />
    // </CashierOrderProvider>
  )
}

export default App;
