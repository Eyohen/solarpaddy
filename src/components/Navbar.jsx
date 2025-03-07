import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { URL } from '../url';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {user} = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userId = user?.id;


  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${URL}/api/cart/count/${userId}`);
      console.log("count",res.data.count)
      setCartCount(res.data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      return 0;
    }
  };

  console.log("cartCount",cartCount)

  useEffect(() => {
      fetchCartCount()
  }, [])



  return (
    <div className='px-4 py-4 bg-white shadow-xl relative'>
      <div className='max-w-[1500px] mx-auto flex justify-between items-center'>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Link to={'/'}>
            <p className='text-[#4F7942] text-3xl font-semibold'>SolarPaddy</p>
          </Link> 
        </div>

        {/* Mobile Menu Button */}
        <button 
          className='md:hidden text-gray-500 hover:text-gray-700'
          onClick={toggleMenu}
        >
          {isOpen ? (
            <IoCloseOutline size={28} />
          ) : (
            <IoMenuOutline size={28} />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className='hidden md:flex space-x-8'>
          <Link to='/about' className='font-normal text-lg hover:text-[#FDDA0D]'>About</Link>
          <Link to='/calculator' className='font-normal text-lg hover:text-[#FDDA0D]'>Calculator</Link>
          {/* <Link to='/blogs' className='font-normal text-lg hover:text-[#FDDA0D]'>Blog</Link> */}
          <Link to='/products' className='font-normal text-lg hover:text-[#FDDA0D]'>Products</Link>
          <Link to='/contact' className='font-normal text-lg hover:text-[#FDDA0D]'>Contact Us</Link>
          <Link to='/cart' className='font-normal text-lg hover:text-[#FDDA0D]'>Cart<span className='bg-red-500 text-white px-2 rounded-lg'>{cartCount}</span></Link>
        </div>

        {/* Desktop Sign In */}
        <div className='hidden md:flex items-center space-x-6'>
          {user && <p className='text-green-500 font-semibold text-lg'>Hello, {user?.fname}</p>}
          <Link to={'/login'}>
            <button className='bg-[#FDDA0D] px-9 py-2 rounded-xl shadow-lg text-lg font-medium'>
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`${
          isOpen ? 'flex' : 'hidden'
        } absolute top-full left-0 right-0 flex-col bg-white shadow-lg md:hidden z-50`}>
          <div className='flex flex-col p-4 space-y-4'>
            <Link 
              to='/about' 
              className='font-normal text-lg hover:text-[#FDDA0D] py-2'
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to='/calculator' 
              className='font-normal text-lg hover:text-[#FDDA0D] py-2'
              onClick={() => setIsOpen(false)}
            >
              Calculator
            </Link>
            {/* <Link 
              to='/blogs' 
              className='font-normal text-lg hover:text-[#FDDA0D] py-2'
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link> */}
            <Link 
              to='/products' 
              className='font-normal text-lg hover:text-[#FDDA0D] py-2'
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              to='/contact' 
              className='font-normal text-lg hover:text-[#FDDA0D] py-2'
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link to='/cart' className='font-normal text-lg hover:text-[#FDDA0D]'>Cart<span className='bg-red-500 text-white px-2 rounded-lg'>{cartCount}</span></Link>

            
            <div className='pt-4 border-t'>
              {user && (
                <p className='text-green-500 font-semibold text-lg mb-4'>
                  Hello, {user?.fname}
                </p>
              )}
              <Link 
                to={'/login'}
                onClick={() => setIsOpen(false)}
              >
                <button className='w-full bg-[#FDDA0D] px-9 py-2 rounded-xl shadow-lg text-lg font-medium'>
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;