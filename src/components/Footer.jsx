import React from 'react'
import { CiLocationOn, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='bg-[#2C5530] py-8 md:py-16 px-4 md:px-8 lg:px-24'>
      <div className='flex flex-col lg:flex-row gap-12 lg:gap-0 lg:justify-between'>
        <div className='space-y-6 md:space-y-9'>
          <p className='text-white font-semibold text-3xl md:text-5xl'>SolarPaddy</p>

          <div className='space-y-4 md:space-y-9'>
            <div className='flex items-center gap-x-2'>
              <CiLocationOn color='white' size={23} />
              <p className='text-white'>7 Ibiyinka Olorunbe, VI, Lagos.</p>
            </div>

            <div className='flex items-center gap-x-2'>
              <IoCallOutline color='white' size={23} />
              <p className='text-white'>08033621415</p>
            </div>

            <div className='flex items-center gap-x-2'>
              <CiMail color='white' size={23} />
              <p className='text-white'>powerup@solarpaddy.com</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-36'>
          <div>
            <p className='text-white font-semibold text-xl mb-4'>About Us</p>
            <div className='space-y-4'>
              {[...Array(4)].map((_, i) => (
                <p key={i} className='text-white text-lg'>Link Item</p>
              ))}
            </div>
          </div>

          <div>
            <p className='text-white font-semibold text-xl mb-4'>Information</p>
            <div className='space-y-4'>
              {[...Array(4)].map((_, i) => (
                <p key={i} className='text-white text-lg'>Link Item</p>
              ))}
            </div>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <p className='text-white font-semibold text-xl mb-4'>Useful Links</p>
            <div className='space-y-4'>
              {[...Array(4)].map((_, i) => (
                <p key={i} className='text-white text-lg'>Link Item</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer