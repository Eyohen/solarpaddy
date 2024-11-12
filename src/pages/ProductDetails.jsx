import React, { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
import panel from '../assets/panel.jpg'

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={panel}
            alt="Solar Panel"
            className="w-[400px] rounded-lg shadow-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={panel}
                alt={'jhjfdhfj'}
                className="w-full h-auto rounded-md shadow cursor-pointer hover:opacity-75 transition-opacity"
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">High-Efficiency Monocrystalline Solar Panel</h1>
          <p className="text-xl font-semibold text-green-600">$299.99</p>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-gray-600">(4.8 out of 5, 120 reviews)</span>
          </div>
          <p className="text-gray-600">Brand: SolarTech Solutions</p>
          <p className="text-gray-700">
            Our high-efficiency monocrystalline solar panel is designed to maximize energy production
            in both residential and commercial settings. With advanced cell technology and robust
            construction, this panel offers superior performance and durability in all weather conditions.
          </p>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                className="h-10 px-2 rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="h-10 px-2 rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p><span className="font-semibold">Weight:</span> 18.5 kg (40.8 lbs)</p>
          <button className="w-full bg-black text-white font-semibold py-2 rounded-md">
        Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <div key={review} className="border-b pb-4">
              <div className="flex items-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <p className="font-semibold">Great product, highly recommend!</p>
              <p className="text-gray-600">
                These solar panels have been a game-changer for our home energy needs. The efficiency is impressive,
                and the customer support from SolarTech Solutions has been excellent.
              </p>
              <p className="text-sm text-gray-500 mt-2">John D. - Verified Purchaser</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Review Title
              </label>
              <input className='border px-3 py-2 rounded-md w-full text-gray-800' placeholder="Summarize your experience" />
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea className='border px-3 py-2 rounded-md w-full text-gray-800' placeholder="Tell us about your experience with this product" rows={4} />
            </div>
            <button type="submit" className='bg-black rounded-md text-white px-6 py-2'>Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  )
}