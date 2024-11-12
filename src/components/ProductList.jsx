import { useState } from 'react'
import panel from '../assets/panel.jpg'
import { Link } from 'react-router-dom'

const products = [
  { id: 1, name: "Solar Panels (Monocrystalline/Polycrystalline)", price: 299.99, image:panel },
  { id: 2, name: "Inverters (Pure Sine Wave and Hybrid)", price: 199.99, image:panel },
  { id: 3, name: "Solar Batteries (Lithium-Ion and Lead-Acid)", price: 499.99, image:panel },
  { id: 4, name: "MPPT Charge Controllers", price: 149.99, image:panel },
  { id: 5, name: "Solar Kits (Home Solar Kits)", price: 999.99, image:panel },
  { id: 6, name: "Portable Solar Generators", price: 399.99, image:panel },
  { id: 7, name: "Solar Water Pumps", price: 249.99, image:panel },
  { id: 8, name: "Solar-Powered Refrigerators", price: 799.99, image:panel },
  { id: 9, name: "LED Solar Lights", price: 39.99, image:panel },
  { id: 10, name: "Solar Power Banks", price: 59.99, image:panel },
  { id: 11, name: "Solar Water Heaters", price: 599.99, image:panel },
  { id: 12, name: "Solar Camping Lanterns", price: 29.99, image:panel },
  { id: 13, name: "Battery Management Systems (BMS)", price: 179.99, image:panel },
  { id: 14, name: "Energy Monitoring Systems", price: 129.99, image:panel },
  { id: 15, name: "Solar Combiner Boxes", price: 89.99, image:panel },
  { id: 16, name: "Backup Generators (Solar Hybrid)", price: 899.99, image:panel },
  { id: 17, name: "Ground Mounting Systems", price: 349.99, image:panel },
  { id: 18, name: "Roof Mounting Kits", price: 199.99, image:panel },
  { id: 19, name: "Solar Charge Meters", price: 69.99, image:panel },
  { id: 20, name: "Smart Solar Devices (Smart Plugs, Wi-Fi Routers)", price: 79.99, image:panel },
]

export default function ProductList() {
  const [hoveredProduct, setHoveredProduct] = useState(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Solar Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
         <Link to={'/productdetails'}><div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
              <p className="text-gray-600 font-bold">${product.price.toFixed(2)}</p>
              <button
                className={`mt-4 w-full py-2 px-4 rounded transition-colors duration-300 ease-in-out ${
                  hoveredProduct === product.id
                    ? 'bg-[#4F7942] text-white'
                    : 'bg-green-400 text-white'
                }`}
              >
                {hoveredProduct === product.id ? 'Add to Cart' : 'View Details'}
              </button>
            </div>
          </div> </Link> 
        ))}
      </div>
    </div>
  )
}