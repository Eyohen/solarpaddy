// import React from 'react'
// import Navbar from '../components/Navbar';
// import hero from '../assets/hero.jpg';
// import about from '../assets/about.jpg'
// import medium from '../assets/medium.jpg'
// import airbnb from '../assets/airbnb.jpg';
// import coinbase from '../assets/coinbase.jpg'
// import hellosign from '../assets/hellosign.jpg';
// import upwork from '../assets/upwork.jpg'
// import zapier from '../assets/zapier.jpg'
// import FAQ from '../components/FAQ';
// import Footer from '../components/Footer';
// import selectappliance from '../assets/selectappliances.jpg'
// import calculateload from '../assets/calculateload.jpg'

// const Home = () => {
//   return (
//     <>
//     <Navbar/>
//     <div>
//            <div className='w-full h-[600px]'>
//    <div className='relative'>
//     <img src={hero} className='object-cover w-full h-[600px]'/>
//     <p className='absolute text-7xl font-semibold text-white z-50 top-[220px] px-24'>Welcome to Solar Paddy</p>
//     <p className='absolute text-3xl font-medium text-white z-50 top-[300px] px-24'>Your gateway to a brighter, more reliable
//     </p>
//     <p className='absolute text-3xl font-medium text-white z-50 top-[350px] px-24'>and cost-effective energy solution.
//     </p>
   
//     <div className='px-24'><button className='absolute z-50 bg-[#FDDA0D] top-[420px] px-6 py-2 rounded-xl shadow-lg'>Read More</button></div>
//     </div>
// </div>

// {/* our partners */}
// <div>

// <p className='text-center font-semibold text-4xl pt-12'>Trusted By</p>

// <div className='flex justify-center gap-x-4 items-center'>

//     <img src={medium} />
//     <img src={airbnb}  />
//     <img src={coinbase} className='w-[250px]' />
//     <img src={hellosign} />
//     <img src={upwork} />
//     <img src={zapier} />


// </div>



// </div>





// {/* about us */}
// <div className='bg-black'>
// <div className='flex justify-between items-center mt-12'>
//     <img src={about} className='w-[900px] h-[500px]' />
//     <div className='mr-52'>
//         <p className='text-white text-2xl'>About Us</p>
//         <p className='text-white text-4xl font-semibold w-[650px] mt-4'>We are bringing alternative power to your doorstep</p>
//         <p className='text-white text-lg w-[650px] mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//         <div className='mt-2'><button className='bg-[#FDDA0D] px-6 py-2 rounded-xl shadow-lg'>See More</button></div>
//     </div>
    
// </div>
// </div>

// {/* get started */}
// <div>
//     <p className='text-4xl font-semibold text-center mt-16'>Get Started in 4 Easy Steps</p>

//     <div className='flex gap-x-16 mt-16 justify-center items-center'>

//     <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
//         <img src={selectappliance} className='w-[200px] h-[130px] mx-auto'/>
//         <p className='text-xl font-medium text-center mt-4'>Select your appliances</p>
//     </div>

//     <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
//         <img src={calculateload} className='w-[200px] h-[130px] mx-auto'/>
//         <p className='text-xl font-medium text-center mt-4'>Calculate your load</p>
//     </div>

//     <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
//         <img src={selectappliance} className='w-[200px] h-[130px] mx-auto'/>
//         <p className='text-xl font-medium text-center mt-4'>Buy your products</p>
//     </div>

//     <div className='bg-white shadow-lg px-6 w-[320px] py-9 rounded-xl'>
//         <img src={calculateload} className='w-[200px] h-[130px] mx-auto'/>
//         <p className='text-xl font-medium text-center mt-4'>Installer picks up your order
//         </p>
//     </div>

//     </div>


// </div>


// {/* faqs */}
// <FAQ/>
        
// <div className='mb-24'></div>
//         <Footer/>
//         </div>
//     </>
//   )
// }

// export default Home

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
        {/* Hero Section */}
        <div className='w-full h-[400px] md:h-[500px] lg:h-[600px] relative'>
          <img src={hero} className='object-cover w-full h-full'/>
          <div className='absolute inset-0 bg-black/50 z-10'></div>
          <div className='absolute z-20 top-1/2 transform -translate-y-1/2 px-4 md:px-12 lg:px-24'>
            <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold text-white mb-4'>
              Welcome to Solar Paddy
            </h1>
            <p className='text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2'>
              Your gateway to a brighter, more reliable
            </p>
            <p className='text-xl md:text-2xl lg:text-3xl font-medium text-white mb-6'>
              and cost-effective energy solution.
            </p>
            <button className='bg-[#FDDA0D] px-6 py-2 rounded-xl shadow-lg hover:bg-[#e5c40c] transition-colors'>
              Read More
            </button>
          </div>
        </div>

        {/* Partners Section */}
        <div className='py-12'>
          <p className='text-center font-semibold text-2xl md:text-3xl lg:text-4xl mb-8'>
            Trusted By
          </p>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center px-4 md:px-8 lg:px-12'>
            <img src={medium} className='mx-auto' />
            <img src={airbnb} className='mx-auto' />
            <img src={coinbase} className='w-[250px] mx-auto' />
            <img src={hellosign} className='mx-auto' />
            <img src={upwork} className='mx-auto' />
            <img src={zapier} className='mx-auto' />
          </div>
        </div>

        {/* About Section */}
        <div className='bg-black py-12'>
          <div className='flex flex-col lg:flex-row items-center gap-8 px-4 md:px-8 lg:px-12'>
            <img src={about} className='w-full lg:w-1/2 h-auto rounded-lg' />
            <div className='lg:w-1/2 px-4 lg:pr-12'>
              <p className='text-white text-xl md:text-2xl mb-4'>About Us</p>
              <p className='text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-4'>
                We are bringing alternative power to your doorstep
              </p>
              <p className='text-white text-base lg:text-lg mb-6'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <button className='bg-[#FDDA0D] px-6 py-2 rounded-xl shadow-lg hover:bg-[#e5c40c] transition-colors'>
                See More
              </button>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className='py-16 px-4 md:px-8 lg:px-12'>
          <p className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-12'>
            Get Started in 4 Easy Steps
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              { img: selectappliance, title: "Select your appliances" },
              { img: calculateload, title: "Calculate your load" },
              { img: selectappliance, title: "Buy your products" },
              { img: calculateload, title: "Installer picks up your order" }
            ].map((step, index) => (
              <div key={index} className='bg-white shadow-lg px-6 py-9 rounded-xl'>
                <img src={step.img} className='w-[200px] h-[130px] mx-auto object-cover' />
                <p className='text-lg md:text-xl font-medium text-center mt-4'>{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <FAQ/>
        <div className='mb-24'></div>
        <Footer/>
      </div>
    </>
  )
}

export default Home