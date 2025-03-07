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
import { CreateTown } from './pages/CreateTown'
import CreateProduct from './pages/CreateProduct'
import CreateCategory from './pages/CreateCategory'
import Cart from './pages/Cart'
import Purchases from './pages/Purchases'
import ViewPurchase from './pages/ViewPurchase'
import ProductTable from './pages/ProductTable'
import EditProduct from './pages/EditProduct'
import { CreateBrand } from './pages/CreateBrand'
import EnquiryTable from './pages/EnquiryTable'
import ViewEnquiry from './pages/ViewEnquiry'
import SendEstimate from './pages/SendEstimate'
import TermsAndConditions from './pages/TermsAndConditions'


const App = () => {
  return (
<Routes>
<Route exact path="/" element={<Home/>}/>
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/login" element={<Login/>}/>
<Route exact path="/admin" element={<Admin/>}/>
<Route exact path="/calculator" element={<Calculator/>}/>
<Route exact path="/products" element={<Products/>}/>
<Route exact path="/productdetails/:id" element={<ProductDetails/>}/>
<Route exact path="/cart" element={<Cart/>}/>
<Route exact path="/checkout" element={<SolarCheckout/>}/>
<Route exact path="/dashboard" element={<Dashboard/>}/>
<Route exact path="/orders" element={<Order/>}/>
<Route exact path="/billing" element={<Billing/>}/>
<Route exact path="/createbill" element={<CreateBill/>}/>
<Route exact path="/purchases" element={<Purchases/>}/>
<Route exact path="/viewpurchase/:id" element={<ViewPurchase/>}/>
<Route exact path="/viewenquiry/:id" element={<ViewEnquiry/>}/>
<Route exact path="/producttable" element={<ProductTable/>}/>
<Route exact path="/enquirytable" element={<EnquiryTable/>}/>
<Route exact path="/createproduct" element={<CreateProduct />}/>
<Route exact path="/createtown" element={<CreateTown/>}/>
<Route exact path="/createproduct" element={<CreateProduct/>}/>
<Route exact path="/sendestimate/:id" element={<SendEstimate/>}/>
<Route exact path="/editproduct/:id" element={<EditProduct />}/>
<Route exact path="/createcategory" element={<CreateCategory/>}/>
<Route exact path="/createbrand" element={<CreateBrand/>}/>
<Route exact path="/terms" element={<TermsAndConditions/>}/>
</Routes>
  )
}

export default App