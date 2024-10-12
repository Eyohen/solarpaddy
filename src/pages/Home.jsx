import React from 'react'
import Navbar from '../components/Navbar';
import hero from '../assets/hero.jpg';
import about from '../assets/about.jpg'
import medium from '../assets/medium.jpg'
import airbnb from '../assets/airbnb.jpg';
import coinbase from '../assets/coinbase.jpg'
import hellosign from '../assets/hellosign.jpg';
import upwork from '../assets/upwork.jpg'
import zapier from '../assets/zapier.jpg'
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import selectappliance from '../assets/selectappliances.jpg'
import calculateload from '../assets/calculateload.jpg'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div>
           <div className='w-full h-[600px]'>
   <div className='relative'>
    <img src={hero} className='object-cover w-full h-[600px]'/>
    <p className='absolute text-6xl font-semibold text-white z-50 top-[220px] px-24'>Powering Access to</p>
    <p className='absolute text-6xl font-semibold text-white z-50 top-[300px] px-24'>Brighter Lives Through</p>
    <p className='absolute text-6xl font-semibold text-white z-50 top-[380px] px-24'>Off-Grid Solar</p>
    <div className='px-24'><button className='absolute z-50 bg-[#FDDA0D] top-[470px] px-6 py-2 rounded-xl shadow-lg'>Read More</button></div>
    </div>
</div>

{/* our partners */}
<div>

<p className='text-center font-semibold text-4xl pt-12'>Our Partners</p>

<div className='flex justify-center gap-x-4 items-center'>

    <img src={medium} />
    <img src={airbnb}  />
    <img src={coinbase} className='w-[250px]' />
    <img src={hellosign} />
    <img src={upwork} />
    <img src={zapier} />


</div>



</div>





{/* about us */}
<div className='bg-black'>
<div className='flex justify-between items-center mt-12'>
    <img src={about} className='w-[900px] h-[500px]' />
    <div className='mr-52'>
        <p className='text-white text-2xl'>About Us</p>
        <p className='text-white text-4xl font-semibold w-[650px] mt-4'>We are bringing alternative power to your doorstep</p>
        <p className='text-white text-lg w-[650px] mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className='mt-2'><button className='bg-[#FDDA0D] px-6 py-2 rounded-xl shadow-lg'>See More</button></div>
    </div>
    
</div>
</div>

{/* get started */}
<div>
    <p className='text-4xl font-semibold text-center mt-16'>Get Started in 4 Easy Steps</p>

    <div className='flex gap-x-16 mt-16 justify-center items-center'>

    <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
        <img src={selectappliance} className='w-[200px] h-[130px] mx-auto'/>
        <p className='text-xl font-medium text-center mt-4'>Select your appliances</p>
    </div>

    <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
        <img src={calculateload} className='w-[200px] h-[130px] mx-auto'/>
        <p className='text-xl font-medium text-center mt-4'>Calculate your load</p>
    </div>

    <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
        <img src={selectappliance} className='w-[200px] h-[130px] mx-auto'/>
        <p className='text-xl font-medium text-center mt-4'>Buy your products</p>
    </div>

    <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
        <img src={calculateload} className='w-[200px] h-[130px] mx-auto'/>
        <p className='text-xl font-medium text-center mt-4'>Installer picks up your order
        </p>
    </div>

    </div>


</div>


{/* faqs */}
<FAQ/>
        
<div className='mb-24'></div>
        <Footer/>
        </div>
    </>
  )
}

export default Home