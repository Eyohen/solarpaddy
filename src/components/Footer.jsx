import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";



const Footer = () => {
  return (
    <div className='bg-[#023020] py-16 px-24'>

        <div className='flex justify-between'>

<div>
        <p className='text-white font-semibold text-5xl'>SolarPaddy</p>

        <div className='flex items-center gap-x-2 mt-9'>
        <CiLocationOn color='white' size={23} />
        <p className='text-white'>7 Ibiyinka
        Olorunbe, VI, Lagos.</p>
        </div>

        <div className='flex items-center gap-x-2 mt-9'>
        <IoCallOutline color='white' size={23} />
        <p className='text-white'>08033621415</p>
        </div>


        <div className='flex items-center gap-x-2 mt-9'>
        <CiMail color='white' size={23} />
        <p className='text-white'>powerup@solarpaddy.com</p>
        </div>


        </div>

<div className='flex gap-x-36'>
        <div><p className='text-white font-semibold text-xl'>About Us</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        </div>
        <div> <p className='text-white font-semibold text-xl'>Information</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        </div>
        <div> <p className='text-white font-semibold text-xl'>Useful Links</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        <p className='text-white mt-4 text-lg'>Link Item</p>
        </div>
        </div>


</div>

        </div>
  )
}

export default Footer