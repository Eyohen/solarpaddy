import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import SolarCheckout from './pages/SolarCheckout'

const App = () => {
  return (
<Routes>
<Route exact path="/" element={<Home/>}/>
<Route exact path="/calculator" element={<Calculator/>}/>
<Route exact path="/checkout" element={<SolarCheckout/>}/>
</Routes>
  )
}

export default App