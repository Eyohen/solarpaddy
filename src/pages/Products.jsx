import Navbar from "../components/Navbar"
import ProductList from "../components/ProductList"

export default function Products() {
  return (
    <>
    <Navbar/>
 
    <div className="min-h-screen bg-gray-100">
     
      <main>
        <ProductList />
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Solar Solutions Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  )
}