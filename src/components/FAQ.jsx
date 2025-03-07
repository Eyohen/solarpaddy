// import React from 'react'
// import { SlArrowDown } from "react-icons/sl";

// const FAQ = () => {
//   return (
//     <div className='bg-black mt-24 py-12'>
//         <p className='pt-12 text-white font-semibold text-3xl text-center'>Frequently Asked Questions</p>

// <div className='flex justify-center mt-24'>
//         <div className='grid grid-cols-2 gap-12'>

//         <div className='bg-white rounded-xl w-[500px] h-[100px] px-3 py-3'>
//             <div className='flex justify-between'>
//             <p className='w-[400px] text-lg font-medium'>How do i get to know the power rating of my appliances?</p>
//             <SlArrowDown size={25} />
//         </div>
//         </div>


//         <div className='bg-white rounded-xl w-[500px] h-[100px] px-3 py-3'>
//             <div className='flex justify-between'>
//             <p className='w-[400px] text-lg font-medium'>How do i get to know the power rating of my appliances?</p>
//             <SlArrowDown size={25} />
//         </div>
//         </div>
//         <div className='bg-white rounded-xl w-[500px] h-[100px] px-3 py-3'>
//             <div className='flex justify-between'>
//             <p className='w-[400px] text-lg font-medium'>How do i get to know the power rating of my appliances?</p>
//             <SlArrowDown size={25} />
//         </div>
//         </div>
        

//         <div className='bg-white rounded-xl w-[500px] h-[100px] px-3 py-3'>
//             <div className='flex justify-between'>
//             <p className='w-[400px] text-lg font-medium'>How do i get to know the power rating of my appliances?</p>
//             <SlArrowDown size={25} />
//         </div>
//         </div>

//         <div className='bg-white rounded-xl w-[500px] h-[100px] px-3 py-3'>
//             <div className='flex justify-between'>
//             <p className='w-[400px] text-lg font-medium'>How do i get to know the power rating of my appliances?</p>
//             <SlArrowDown size={25} />
//         </div>
//         </div>
        

//         <div className='bg-white rounded-xl w-[500px] h-[100px] px-3 py-3'>
//             <div className='flex justify-between'>
//             <p className='w-[400px] text-lg font-medium'>How do i get to know the power rating of my appliances?</p>
//             <SlArrowDown size={25} />
//         </div>
//         </div>

//         </div>
//         </div>
        
        
        
//         </div>
//   )
// }

// export default FAQ

import React, { useState } from 'react'
import { SlArrowDown } from "react-icons/sl";

const FAQ = () => {
  const faqs = [
    { question: "How do i get to know the power rating of my appliances?" },
    { question: "How do i get to know the power rating of my appliances?" },
    { question: "How do i get to know the power rating of my appliances?" },
    { question: "How do i get to know the power rating of my appliances?" },
    { question: "How do i get to know the power rating of my appliances?" },
    { question: "How do i get to know the power rating of my appliances?" },
  ];

  return (
    <div className='bg-black mt-12 md:mt-24 py-8 md:py-12 px-4 md:px-8'>
      <h2 className='pt-8 md:pt-12 text-white font-semibold text-2xl md:text-3xl text-center'>
        Frequently Asked Questions
      </h2>

      <div className='max-w-7xl mx-auto mt-12 md:mt-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12'>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className='bg-white rounded-xl min-h-[100px] p-4 md:p-6 transition-all hover:shadow-lg'
            >
              <div className='flex justify-between items-start gap-4'>
                <p className='text-base md:text-lg font-medium flex-1'>
                  {faq.question}
                </p>
                <SlArrowDown className='w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;