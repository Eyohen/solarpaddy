import React, { useState } from 'react';
import { RiAddLine, RiSubtractLine, RiDeleteBin6Line, RiSaveLine } from 'react-icons/ri';
import AdminNavbar from '../components/AdminNavbar';

const CreateBill = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    installationRequired: false,
    deliveryCost: 0,
    taxRate: 7.5, // Default tax rate
    items: [
      {
        id: Date.now(),
        panelType: '',
        wattage: '',
        dimensions: '',
        quantity: 1,
        unitPrice: '',
        additionalEquipment: []
      }
    ]
  });

  // Equipment options
  const panelTypes = [
    'Monocrystalline',
    'Polycrystalline',
    'Thin-Film',
    'Bifacial'
  ];

  const additionalEquipmentOptions = [
    { id: 1, name: 'Inverter', price: 500 },
    { id: 2, name: 'Battery', price: 800 },
    { id: 3, name: 'Mounting System', price: 300 },
    { id: 4, name: 'Charge Controller', price: 200 },
    { id: 5, name: 'Solar Cables', price: 150 }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleItemChange = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const addNewItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: Date.now(),
        panelType: '',
        wattage: '',
        dimensions: '',
        quantity: 1,
        unitPrice: '',
        additionalEquipment: []
      }]
    }));
  };

  const removeItem = (itemId) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
    }
  };

  const toggleEquipment = (itemId, equipmentId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const equipment = item.additionalEquipment.includes(equipmentId)
            ? item.additionalEquipment.filter(id => id !== equipmentId)
            : [...item.additionalEquipment, equipmentId];
          return { ...item, additionalEquipment: equipment };
        }
        return item;
      })
    }));
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((total, item) => {
      const panelCost = Number(item.unitPrice) * item.quantity;
      const equipmentCost = item.additionalEquipment.reduce((sum, eqId) => {
        const equipment = additionalEquipmentOptions.find(eq => eq.id === eqId);
        return sum + (equipment ? equipment.price : 0);
      }, 0);
      return total + panelCost + equipmentCost;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * (formData.taxRate / 100);
    return subtotal + tax + Number(formData.deliveryCost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log('Form Data:', formData);
    console.log('Total Amount:', calculateTotal());
  };


  const handleSave = async (e) => {
    e.preventDefault();
    
    // Create the bill object with calculated totals
    const billData = {
      ...formData,
      subtotal: calculateSubtotal(),
      tax: calculateSubtotal() * (formData.taxRate / 100),
      total: calculateTotal(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    try {
      // Add your API call here
      console.log('Saving bill:', billData);
      // Example API call:
      // await axios.post('/api/bills', billData);
      alert('Bill created successfully!');
      // Redirect or clear form based on your needs
    } catch (error) {
      console.error('Error saving bill:', error);
      alert('Error creating bill. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Bill</h1>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RiSaveLine />
          Save Bill
        </button>
      </div>
      
      <form onSubmit={handleSave} className="space-y-6">
        {/* Previous form sections remain the same until Summary section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Solar Panels & Equipment</h2>
          
          {formData.items.map((item, index) => (
            <div 
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Item {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={formData.items.length === 1}
                >
                  <RiDeleteBin6Line className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Panel Type
                  </label>
                  <select
                    value={item.panelType}
                    onChange={(e) => handleItemChange(item.id, 'panelType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    {panelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wattage
                  </label>
                  <input
                    type="number"
                    value={item.wattage}
                    onChange={(e) => handleItemChange(item.id, 'wattage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions (cm)
                  </label>
                  <input
                    type="text"
                    value={item.dimensions}
                    onChange={(e) => handleItemChange(item.id, 'dimensions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 100x165"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleItemChange(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                    >
                      <RiSubtractLine />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() => handleItemChange(item.id, 'quantity', item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                    >
                      <RiAddLine />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price ($)
                  </label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Equipment
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {additionalEquipmentOptions.map(equipment => (
                    <label
                      key={equipment.id}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={item.additionalEquipment.includes(equipment.id)}
                        onChange={() => toggleEquipment(item.id, equipment.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{equipment.name} (${equipment.price})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewItem}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Another Panel Set
          </button>
        </div>

        {/* Additional Costs */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Additional Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Cost ($)
              </label>
              <input
                type="number"
                name="deliveryCost"
                value={formData.deliveryCost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Installation Required
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="installationRequired"
                    checked={formData.installationRequired}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Yes, installation needed</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Bill Summary</h2>
          
          {/* Detailed Breakdown */}
          <div className="space-y-4">
            {/* Items Summary */}
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Items</h3>
              {formData.items.map((item, index) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>
                    {item.panelType || 'Solar Panel'} x{item.quantity}
                    {item.additionalEquipment.length > 0 && ` (+ ${item.additionalEquipment.length} equipment)`}
                  </span>
                  <span>
                    ${((Number(item.unitPrice) * item.quantity) + 
                      item.additionalEquipment.reduce((sum, eqId) => {
                        const equipment = additionalEquipmentOptions.find(eq => eq.id === eqId);
                        return sum + (equipment ? equipment.price : 0);
                      }, 0)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Costs Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Delivery Cost</span>
                <span>${Number(formData.deliveryCost).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax ({formData.taxRate}%)</span>
                <span>${(calculateSubtotal() * (formData.taxRate / 100)).toFixed(2)}</span>
              </div>

              {formData.installationRequired && (
                <div className="flex justify-between text-blue-600">
                  <span>Installation Required</span>
                  <span>To be quoted</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any additional notes or special instructions..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBill;