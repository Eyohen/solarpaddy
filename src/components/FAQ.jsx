// import React, { useState } from 'react'
// import { SlArrowDown } from "react-icons/sl";

// const FAQ = () => {
//   const faqs = [
//     { question: "How do i get to know the power rating of my appliances?" },
//     { question: "How do i get to know the power rating of my appliances?" },
//     { question: "How do i get to know the power rating of my appliances?" },
//     { question: "How do i get to know the power rating of my appliances?" },
//     { question: "How do i get to know the power rating of my appliances?" },
//     { question: "How do i get to know the power rating of my appliances?" },
//   ];

//   return (
//     <div className='bg-black mt-12 md:mt-24 py-8 md:py-12 px-4 md:px-8'>
//       <h2 className='pt-8 md:pt-12 text-white font-semibold text-2xl md:text-3xl text-center'>
//         Frequently Asked Questions
//       </h2>

//       <div className='max-w-7xl mx-auto mt-12 md:mt-24'>
//         <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12'>
//           {faqs.map((faq, index) => (
//             <div 
//               key={index} 
//               className='bg-white rounded-xl min-h-[100px] p-4 md:p-6 transition-all hover:shadow-lg'
//             >
//               <div className='flex justify-between items-start gap-4'>
//                 <p className='text-base md:text-lg font-medium flex-1'>
//                   {faq.question}
//                 </p>
//                 <SlArrowDown className='w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1' />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FAQ;








import React, { useState } from "react";
import { TbCircleMinus, TbCirclePlus } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQ = () => {
  // Use an array of objects for FAQ items
  const [faqItems, setFaqItems] = useState([
    {
      id: 1,
      question: "What products do you sell?",
      answer: "We offer a range of solar power equipment, including solar panels, inverters, batteries, charge controllers, mounting systems, and complete solar kits for residential and commercial use.",
      isOpen: false
    },
    {
      id: 2,
      question: "Do you provide installation services?",
      answer: "Yes, we offer professional installation services in select locations. If installation is not available in your area, we can recommend certified installers.",
      isOpen: false
    },
    {
      id: 3,
      question: "How do I choose the right solar system for my needs?",
      answer: "You can use our solar calculator or contact our support team to determine the best solar solution based on your energy consumption and budget.",
      isOpen: false
    },
    {
      id: 4,
      question: "Do you offer warranties on your products?",
      answer: "Yes, all our products come with manufacturer warranties. Warranty periods vary by product, typically ranging from 1 to 2 years.",
      isOpen: false
    },
    {
      id: 5,
      question: "How do I place an order?",
      answer: "You can place an order directly on our website by selecting the products you need and proceeding to checkout. For bulk orders, contact our sales team.",
      isOpen: false
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept payments via credit/debit cards, bank transfers, PayPal, and mobile money (where applicable).",
      isOpen: false
    },
    
  ]);

  const toggleFAQ = (id) => {
    setFaqItems(faqItems.map(item => 
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 xl:px-[300px] py-12 max-w-[1920px] mx-auto">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
        Frequently asked questions
      </h2>

      <p className='text-center text-xl text-gray-500 mt-4 mb-8'>Everything you need to get started and make the most of our platform.</p>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.id} className="border rounded-lg hover:shadow-md transition-shadow">
            <button
              onClick={() => toggleFAQ(item.id)}
              className="w-full text-left p-6 focus:outline-none"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-medium pr-8">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 mt-1">
                  {item.isOpen ? (
                    <IoIosArrowUp className="w-6 h-6 text-gray-500" />
                  ) : (
                    <IoIosArrowDown className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              </div>
              {item.isOpen && (
                <p className="mt-4 text-gray-600 text-base sm:text-lg">
                  {item.answer}
                </p>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ items data
const faqData = [
  {
    id: 1,
    question: "How can Pigeonhire help my business grow?",
    answer: "Pigeonhire connects your business with targeted communities and professionals across the globe, enabling you to expand your reach, engage with key audiences, and foster strategic partnerships. Whether you're looking to increase brand awareness, drive sales, or build relationships, our platform provides the tools and access necessary to achieve your goals."
  },
  {
    id: 2,
    question: "What makes Pigeonhire different from other community engagement platforms?",
    answer: "Unlike other platforms, Pigeonhire offers a unique combination of local and global community access, precise targeting capabilities, and flexible pricing options. Our focus on creating meaningful connections and providing detailed analytics sets us apart, ensuring that your engagement efforts are effective and measurable."
  },
  // ... Add all other FAQ items here
];

export default FAQ;