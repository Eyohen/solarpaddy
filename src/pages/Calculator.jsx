import React, { useState } from "react";
import { Minus, Plus } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import Navbar from "../components/Navbar";

const CATEGORIES = {
  kitchen: {
    title: "Kitchen Appliances",
    data: [
      { id: 'k1', name: "Refrigerator", watt: 150 },
      { id: 'k2', name: "Freezer", watt: 100 },
      { id: 'k4', name: "Microwave", watt: 1000 },
    ]
  },
  laundry: {
    title: "Laundry Appliances",
    data: [
      { id: 'l3', name: "Iron", watt: 1000 }
    ]
  },
  heating: {
    title: "Heating & Cooling",
    data: [
  
      { id: 'h2', name: "Ceiling Fan", watt: 75 },
      { id: 'h3', name: "Water Heater", watt: 4000 }
    ]
  },
  electronics: {
    title: "Electronics",
    data: [
      { id: 'e1', name: "TV", watt: 100 },
      { id: 'e2', name: "Computer", watt: 300 },
      { id: 'e3', name: "Router", watt: 10 },
      { id: 'e4', name: "Phone Charger", watt: 5 }
    ]
  }
};

const QuantityControl = ({ id, quantity, onIncrease, onDecrease }) => (
  <div className="flex rounded-md gap-x-2 border w-[110px] py-2 px-4">
    <button 
      onClick={() => onDecrease(id)} 
      disabled={quantity <= 0}
      className="disabled:opacity-50"
    >
      <Minus />
    </button>
    <span>{quantity}</span>
    <button onClick={() => onIncrease(id)}>
      <Plus />
    </button>
  </div>
);

const CategorySection = ({ title, data, isOpen, onToggle, quantities, onIncrease, onDecrease }) => (
  <div className="bg-gray-100 rounded-lg px-3 py-4 border border-gray-300 mt-4">
    <div className="flex gap-x-2 items-center">
      <button 
        onClick={onToggle} 
        className="border border-gray-300 w-9 px-1 py-1 rounded-md"
      >
        {isOpen ? <Minus /> : <Plus />}
      </button>
      <p className="font-semibold">{title}</p>
    </div>
    
    {isOpen && (
      <div className="bg-white rounded-lg px-3 py-4 border border-gray-300 mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left px-4 py-2">Appliance</th>
              <th className="text-left px-4 py-2">Wattage</th>
              <th className="text-left px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appliance) => (
              <tr key={appliance.id} className="border-t">
                <td className="px-4 py-2">{appliance.name}</td>
                <td className="px-4 py-2">{appliance.watt}W</td>
                <td className="px-4 py-2">
                  <QuantityControl
                    id={appliance.id}
                    quantity={quantities[appliance.id] || 0}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const Calculator = () => {
  const [openSections, setOpenSections] = useState({
    kitchen: true,
    laundry: false,
    heating: false,
    electronics: false
  });

  const [quantities, setQuantities] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const calculateTotalQuantity = () => {
    return Object.values(quantities).reduce((sum, quantity) => sum + (quantity || 0), 0);
  };

  const calculateTotalWattage = () => {
    return Object.entries(CATEGORIES).reduce((total, [_, category]) => {
      return total + category.data.reduce((categoryTotal, appliance) => {
        const quantity = quantities[appliance.id] || 0;
        return categoryTotal + (appliance.watt * quantity);
      }, 0);
    }, 0);
  };

  const getSelectedAppliances = () => {
    const selected = [];
    Object.entries(CATEGORIES).forEach(([category, { data }]) => {
      data.forEach(appliance => {
        const quantity = quantities[appliance.id] || 0;
        if (quantity > 0) {
          selected.push({
            category,
            name: appliance.name,
            watt: appliance.watt,
            quantity
          });
        }
      });
    });
    return selected;
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.email || !formData.phone) {
      setError('Please fill in all contact information');
      return;
    }

    if (calculateTotalQuantity() === 0) {
      setError('Please select at least one appliance');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const calculationData = {
        firstName: formData.firstName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        appliances: getSelectedAppliances(),
        totalWattage: calculateTotalWattage(),
        totalAppliances: calculateTotalQuantity()
      };

      const response = await axios.post(`${URL}/api/calculator/create`, calculationData);

      if (response.status === 200) {
        setSuccess('Your calculation request has been submitted! We will contact you soon with the estimation.');
        // Clear form
        setQuantities({});
        setFormData({
          firstName: '',
          email: '',
          phone: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting calculation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Solar System Calculator</h1>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Appliances Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Your Appliances</h2>
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

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div>
                <p>Total Appliances: {calculateTotalQuantity()}</p>
                <p>Total Wattage: {calculateTotalWattage()}W</p>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  bg-blue-600 text-white px-8 py-3 rounded
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                `}
              >
                {isSubmitting ? 'Submitting...' : 'Get Solar Estimation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;