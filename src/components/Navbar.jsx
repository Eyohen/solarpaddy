import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import logo from '../assets/amarislogo.png'
import { PiShoppingCartSimple } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const {user} = useAuth()


  return (
    <div className='px-4 py-4 bg-white shadow-xl'>
      <div className='max-w-[1500px] mx-auto flex justify-between items-center'>
        {/* Logo */}
        <div className='flex-shrink-0'>
          {/* <img src={logo} alt="Amaris Logo" className='h-12 w-auto' /> */}
         <Link to={'/'}><p className='text-[#4F7942] text-3xl font-semibold'>SolarPaddy</p></Link> 
        </div>

        {/* Navigation Links */}
        <div className='hidden md:flex space-x-8'>
          {/* <Link to='/' className='font-normal text-lg hover:text-[#FDDA0D]'>Home</Link> */}
          <Link to='/about' className='font-normal text-lg hover:text-[#FDDA0D]'>About</Link>
          <Link to='/calculator' className='font-normal text-lg hover:text-[#FDDA0D]'>Calculator</Link>
          <Link to='/blogs' className='font-normal text-lg hover:text-[#FDDA0D]'>Blog</Link>
          <Link to='/products' className='font-normal text-lg hover:text-[#FDDA0D]'>Products</Link>
          <Link to='/contact' className='font-normal text-lg hover:text-[#FDDA0D]'>Contact Us</Link>
        </div>

        {/* Icons */}
        <div className='flex items-center space-x-6'>
          {user && <p className='text-green-500 font-semibold text-lg'>Hello, {user?.fname}</p>}
            <Link to={'/login'}><button className='bg-[#FDDA0D] px-9 py-2 rounded-xl shadow-lg text-lg font-medium'>Sign In</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar