import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import SolarCheckout from './pages/SolarCheckout'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Dashboard from './pages/Dashboard'
import Order from './pages/Order'
import CreateBill from './pages/CreateBill'
import Billing from './pages/Billing'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'

const App = () => {
  return (
<Routes>
<Route exact path="/" element={<Home/>}/>
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/login" element={<Login/>}/>
<Route exact path="/admin" element={<Admin/>}/>
<Route exact path="/calculator" element={<Calculator/>}/>
<Route exact path="/products" element={<Products/>}/>
<Route exact path="/productdetails" element={<ProductDetails/>}/>
<Route exact path="/checkout" element={<SolarCheckout/>}/>
<Route exact path="/dashboard" element={<Dashboard/>}/>
<Route exact path="/orders" element={<Order/>}/>
<Route exact path="/billing" element={<Billing/>}/>
<Route exact path="/createbill" element={<CreateBill/>}/>
</Routes>
  )
}

export default App