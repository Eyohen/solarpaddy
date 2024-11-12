// import React, { useState } from "react";
// import { FaTv, FaFan, FaLightbulb, FaBlender, FaLaptop } from "react-icons/fa";
// import { Minus, Plus } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';


// const CATEGORIES = {
//   kitchen: {
//     title: "Kitchen Appliances",
//     data: [
//       { id: 'k1', name: "Refrigerator", watt: 100 },
//       { id: 'k2', name: "Freezer", watt: 70 },
//       { id: 'k3', name: "Electric Oven", watt: 10 },
//       { id: 'k4', name: "Microwave", watt: 400, icon: <FaBlender size={32} color="#355E3B" /> },
//       { id: 'k5', name: "Dishwasher", watt: 60, icon: <FaLaptop size={32} color="#355E3B" /> },
//       { id: 'k6', name: "Cooktop", watt: 100, icon: <FaTv size={32} color="#355E3B" /> },
//       { id: 'k7', name: "Blender", watt: 70, icon: <FaFan size={32} color="#355E3B" /> },
//       { id: 'k8', name: "Food Processor", watt: 10, icon: <FaLightbulb size={32} color="#355E3B" /> },
//       { id: 'k9', name: "Coffee Maker", watt: 400, icon: <FaBlender size={32} color="#355E3B" /> },
//       { id: 'k10', name: "Electric Kettle", watt: 70, icon: <FaFan size={32} color="#355E3B" /> },
//       { id: 'k11', name: "Toasters", watt: 10, icon: <FaLightbulb size={32} color="#355E3B" /> },
//     ]
//   },
//   laundry: {
//     title: "Laundry Appliances",
//     data: [
//       { id: 'l1', name: "Washing Machine", watt: 100 },
//       { id: 'l2', name: "Dryer", watt: 70 },
//       { id: 'l3', name: "Iron", watt: 10 },
//     ]
//   },
//   heating: {
//     title: "Heating & Cooling Appliances",
//     data: [
//       { id: 'h1', name: "Air Conditioner", watt: 100 },
//       { id: 'h2', name: "Ceiling/Standing Fan", watt: 70 },
//       { id: 'h3', name: "Humidifier", watt: 10 },
//       { id: 'h4', name: "Water Heater", watt: 400 },
//     ]
//   }
// };

// const QuantityControl = ({ id, quantity, onIncrease, onDecrease }) => (
//   <div className="flex rounded-md gap-x-2 border py-2 px-4">
//     <button 
//       onClick={() => onDecrease(id)} 
//       disabled={quantity <= 0}
//       className="disabled:opacity-50"
//     >
//       <Minus />
//     </button>
//     <p className="border-r border-gray-400"></p>
//     <span>{quantity}</span>
//     <p className="border-r border-gray-400"></p>
//     <button onClick={() => onIncrease(id)}>
//       <Plus />
//     </button>
//   </div>
// );

// const ApplianceTable = ({ data, quantities, onIncrease, onDecrease }) => (
//   <table className="">
//     <thead className='text-gray-400 rounded-md text-left'>
//       <tr>
//         <th scope="col" className="py-4 px-11">Name</th>
//         <th scope="col" className="py-4 px-11">Wattage</th>
//         <th scope="col" className="py-4 px-11">Quantity</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((p) => (
//         <tr key={p.id} className='border-b border-gray-300'>
//           <td className="py-4 px-11 text-lg">{p.name}</td>
//           <td className="py-4 px-11 text-lg">{p.watt}</td>
//           <td className="py-4 px-11 text-lg">
//             <QuantityControl
//               id={p.id}
//               quantity={quantities[p.id] || 0}
//               onIncrease={onIncrease}
//               onDecrease={onDecrease}
//             />
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// const CategorySection = ({ title, data, isOpen, onToggle, quantities, onIncrease, onDecrease }) => (
//   <div className="bg-gray-100 rounded-lg px-3 py-4 border border-gray-300 mt-4">
//     <div className="flex gap-x-2 items-center">
//       <button 
//         onClick={onToggle} 
//         className="border border-gray-300 w-9 px-1 py-1 rounded-md"
//       >
//         {isOpen ? <Minus className="w-6"/> : <Plus className="w-6"/>}
//       </button>
//       <p className="font-semibold">{title}</p>
//     </div>
    
//     {isOpen && (
//       <div className="bg-white rounded-lg px-3 py-4 border border-gray-300 mt-4">
//         <div className="flex justify-between border border-gray-100 mt-3 px-4 py-4">
//           <ApplianceTable 
//             data={data} 
//             quantities={quantities}
//             onIncrease={onIncrease}
//             onDecrease={onDecrease}
//           />
//         </div>
//       </div>
//     )}
//   </div>
// );

// const SolarCalculator = () => {
//   const navigate = useNavigate();
//   const {user} = useAuth();


//   const [openSections, setOpenSections] = useState({
//     kitchen: false,
//     laundry: false,
//     heating: false
//   });

  

//   // Store quantities for all appliances in a single object
//   const [quantities, setQuantities] = useState({});

//   const toggleSection = (section) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const increaseQuantity = (applianceId) => {
//     setQuantities(prev => ({
//       ...prev,
//       [applianceId]: (prev[applianceId] || 0) + 1
//     }));
//   };

//   const decreaseQuantity = (applianceId) => {
//     setQuantities(prev => ({
//       ...prev,
//       [applianceId]: Math.max(0, (prev[applianceId] || 0) - 1)
//     }));
//   };

//   // Calculate total wattage
//   const calculateTotalWattage = () => {
//     return Object.entries(CATEGORIES).reduce((total, [_, category]) => {
//       return total + category.data.reduce((categoryTotal, appliance) => {
//         const quantity = quantities[appliance.id] || 0;
//         return categoryTotal + (appliance.watt * quantity);
//       }, 0);
//     }, 0);
//   };

//   const handleSubmit = async () => {
//     const res = await axios.post(`${URL}/api/calculator`, {
//       name,
//       fname: user?.fname,
//       email: user?.email,
//       phone: user?.phone,
//       totalQuantity,
//       totalWatt
//     })

//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white px-4 py-4">
//         <p className="text-xl font-semibold mb-4">Select Your Appliances</p>
        
//         {Object.entries(CATEGORIES).map(([key, { title, data }]) => (
//           <CategorySection
//             key={key}
//             title={title}
//             data={data}
//             isOpen={openSections[key]}
//             onToggle={() => toggleSection(key)}
//             quantities={quantities}
//             onIncrease={increaseQuantity}
//             onDecrease={decreaseQuantity}
//           />
//         ))}

//         <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//           <p className="text-lg font-semibold">
//             Total Wattage: {calculateTotalWattage()} watts
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SolarCalculator;

import React, { useState } from "react";
import { FaTv, FaFan, FaLightbulb, FaBlender, FaLaptop } from "react-icons/fa";
import { Minus, Plus } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const CATEGORIES = {
  kitchen: {
    title: "Kitchen Appliances",
    data: [
      { id: 'k1', name: "Refrigerator", watt: 100 },
      { id: 'k2', name: "Freezer", watt: 70 },
      { id: 'k3', name: "Electric Oven", watt: 10 },
      { id: 'k4', name: "Microwave", watt: 400, icon: <FaBlender size={32} color="#355E3B" /> },
      { id: 'k5', name: "Dishwasher", watt: 60, icon: <FaLaptop size={32} color="#355E3B" /> },
      { id: 'k6', name: "Cooktop", watt: 100, icon: <FaTv size={32} color="#355E3B" /> },
      { id: 'k7', name: "Blender", watt: 70, icon: <FaFan size={32} color="#355E3B" /> },
      { id: 'k8', name: "Food Processor", watt: 10, icon: <FaLightbulb size={32} color="#355E3B" /> },
      { id: 'k9', name: "Coffee Maker", watt: 400, icon: <FaBlender size={32} color="#355E3B" /> },
      { id: 'k10', name: "Electric Kettle", watt: 70, icon: <FaFan size={32} color="#355E3B" /> },
      { id: 'k11', name: "Toasters", watt: 10, icon: <FaLightbulb size={32} color="#355E3B" /> },
    ]
  },
  laundry: {
    title: "Laundry Appliances",
    data: [
      { id: 'l1', name: "Washing Machine", watt: 100 },
      { id: 'l2', name: "Dryer", watt: 70 },
      { id: 'l3', name: "Iron", watt: 10 },
    ]
  },
  heating: {
    title: "Heating & Cooling Appliances",
    data: [
      { id: 'h1', name: "Air Conditioner", watt: 100 },
      { id: 'h2', name: "Ceiling/Standing Fan", watt: 70 },
      { id: 'h3', name: "Humidifier", watt: 10 },
      { id: 'h4', name: "Water Heater", watt: 400 },
    ]
  }
};

const QuantityControl = ({ id, quantity, onIncrease, onDecrease }) => (
  <div className="flex rounded-md gap-x-2 border py-2 px-4">
    <button 
      onClick={() => onDecrease(id)} 
      disabled={quantity <= 0}
      className="disabled:opacity-50"
    >
      <Minus />
    </button>
    <p className="border-r border-gray-400"></p>
    <span>{quantity}</span>
    <p className="border-r border-gray-400"></p>
    <button onClick={() => onIncrease(id)}>
      <Plus />
    </button>
  </div>
);

const ApplianceTable = ({ data, quantities, onIncrease, onDecrease }) => (
  <table className="">
    <thead className='text-gray-400 rounded-md text-left'>
      <tr>
        <th scope="col" className="py-4 px-11">Name</th>
        <th scope="col" className="py-4 px-11">Wattage</th>
        <th scope="col" className="py-4 px-11">Quantity</th>
      </tr>
    </thead>
    <tbody>
      {data.map((p) => (
        <tr key={p.id} className='border-b border-gray-300'>
          <td className="py-4 px-11 text-lg">{p.name}</td>
          <td className="py-4 px-11 text-lg">{p.watt}</td>
          <td className="py-4 px-11 text-lg">
            <QuantityControl
              id={p.id}
              quantity={quantities[p.id] || 0}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const CategorySection = ({ title, data, isOpen, onToggle, quantities, onIncrease, onDecrease }) => (
  <div className="bg-gray-100 rounded-lg px-3 py-4 border border-gray-300 mt-4">
    <div className="flex gap-x-2 items-center">
      <button 
        onClick={onToggle} 
        className="border border-gray-300 w-9 px-1 py-1 rounded-md"
      >
        {isOpen ? <Minus className="w-6"/> : <Plus className="w-6"/>}
      </button>
      <p className="font-semibold">{title}</p>
    </div>
    
    {isOpen && (
      <div className="bg-white rounded-lg px-3 py-4 border border-gray-300 mt-4">
        <div className="flex justify-between border border-gray-100 mt-3 px-4 py-4">
          <ApplianceTable 
            data={data} 
            quantities={quantities}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    )}
  </div>
);

const SolarCalculator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [openSections, setOpenSections] = useState({
    kitchen: false,
    laundry: false,
    heating: false
  });

  const [quantities, setQuantities] = useState({});
  const [name, setName] = useState(''); // For the calculation name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 // Store quantities for all appliances in a single object
  // const [quantities, setQuantities] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const increaseQuantity = (applianceId) => {
    setQuantities(prev => ({
      ...prev,
      [applianceId]: (prev[applianceId] || 0) + 1
    }));
  };

  const decreaseQuantity = (applianceId) => {
    setQuantities(prev => ({
      ...prev,
      [applianceId]: Math.max(0, (prev[applianceId] || 0) - 1)
    }));
  };


  // Calculate total quantity
  const calculateTotalQuantity = () => {
    return Object.values(quantities).reduce((sum, quantity) => sum + (quantity || 0), 0);
  };

  // Calculate total wattage
  const calculateTotalWattage = () => {
    return Object.entries(CATEGORIES).reduce((total, [_, category]) => {
      return total + category.data.reduce((categoryTotal, appliance) => {
        const quantity = quantities[appliance.id] || 0;
        return categoryTotal + (appliance.watt * quantity);
      }, 0);
    }, 0);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!name.trim()) {
      setError('Please provide a name for this calculation');
      return;
    }

    if (calculateTotalQuantity() === 0) {
      setError('Please select at least one appliance');
      return;
    }

    if (!user) {
      setError('Please log in to save your calculation');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const calculationData = {
        name: name.trim(),
        fname: user?.fname,
        email: user?.email,
        phone: user?.phone,
        totalQuantity: calculateTotalQuantity(),
        totalWatt: calculateTotalWattage()
      };

      const response = await axios.post(`${URL}/api/calculator/create`, calculationData);

      if (response.status === 201 || response.status === 200) {
        setSuccess('Calculation saved successfully!');
        // Optional: Clear form or redirect
        // navigate('/calculations');
      }
    } catch (err) {
      console.error('Error saving calculation:', err);
      setError(err.response?.data?.message || 'Error saving calculation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold mb-6">Solar Calculator</h1>

          {/* Calculation Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Calculation Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Home Appliances Setup"
            />
          </div>

          {/* User Info Display */}
          {user && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-medium text-gray-700 mb-2">User Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p>Name: {user.fname}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
              </div>
            </div>
          )}

          {/* Categories Section */}
          <div className="space-y-4">
            {Object.entries(CATEGORIES).map(([key, { title, data }]) => (
              <CategorySection
                key={key}
                title={title}
                data={data}
                isOpen={openSections[key]}
                onToggle={() => toggleSection(key)}
                quantities={quantities}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Calculation Summary</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Total Appliances:</span>
                <span className="font-medium">{calculateTotalQuantity()}</span>
              </p>
              <p className="flex justify-between">
                <span>Total Wattage:</span>
                <span className="font-medium">{calculateTotalWattage()} watts</span>
              </p>
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                px-6 py-2 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? 'Saving...' : 'Save Calculation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;