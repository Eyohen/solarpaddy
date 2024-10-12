import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaLock } from 'react-icons/fa';

const SolarCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order placed successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* <FaShoppingCart className="mx-auto h-16 w-16 text-indigo-600" /> */}
          <h1 className=" text-4xl font-bold text-yellow-500 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Checkout
          </h1>
        </motion.div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <section className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      autoComplete="family-name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Nigeria
                    </label>
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
            
                    { id: 'paystack', name: 'Paystack', icon: <FaPaypal /> },
                    { id: 'paypal', name: 'Flutterwave', icon: <FaPaypal /> },
           
                  ].map((method) => (
                    <motion.label
                      key={method.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === method.id ? 'bg-indigo-50 border-indigo-500' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only"
                      />
                      <span className="flex items-center">
                        {method.icon}
                        <span className="ml-2">{method.name}</span>
                      </span>
                    </motion.label>
                  ))}
                </div>

             
              </section>

              {/* Order Summary */}
              <section className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>$99.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$9.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>$119.98</span>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#355E3B] hover:bg-[#355E3B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <FaLock className="mr-2" />
                 Make Payment
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCheckout;