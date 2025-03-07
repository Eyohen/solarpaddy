// import { useState, useEffect } from 'react';
// import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
// import { URL } from '../url';
// import axios from 'axios';
// import { useNavigate, useParams,Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { PaystackButton } from 'react-paystack';
// import Navbar from '../components/Navbar';

// export default function Cart() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { id: cartId } = useParams();
  
//   // State Management
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [hoveredProduct, setHoveredProduct] = useState(null)
//   const [lgarea, setLGArea] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deliveryChargeLoading, setDeliveryChargeLoading] = useState(true);
//   const [deliveryChargeError, setDeliveryChargeError] = useState(null);

//   const [cartTotals, setCartTotals] = useState({
//     subtotal: 0,
//     vat: 0,
//     deliveryCharge: 0,
//     totalAmount: 0
//   });

//   // User Information
//   const email = user?.email;
//   const fname = user?.fname;
//   const location = user?.lga;
//   const userId = user?.id;
//   const address = user?.address;

//   // Fetch Delivery Rates
//   const fetchLGA = async () => {
//     try {
//       setDeliveryChargeLoading(true);
//       const res = await axios.get(`${URL}/api/deliveryrates`);
//       setLGArea(res.data);
      
//       // Calculate initial delivery charge
//       const initialDeliveryCharge = getDeliveryCharge(location);
//       setCartTotals(prev => ({
//         ...prev,
//         deliveryCharge: initialDeliveryCharge
//       }));
//     } catch (error) {
//       console.error('Error fetching delivery rates:', error);
//       setDeliveryChargeError(error);
//     } finally {
//       setDeliveryChargeLoading(false);
//     }
//   };

//   // Get Delivery Charge
//   const getDeliveryCharge = (userLga) => {
//     if (!userLga || !lgarea?.length) return 0;
    
//     const deliveryArea = lgarea.find(area => 
//       area?.lga?.toLowerCase() === userLga?.toLowerCase()
//     );
    
//     return deliveryArea?.deliveryCharge || 0;
//   };

//   // Fetch Cart Items
//   const fetchCartItems = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${URL}/api/cart/user/${userId}`);
//       console.log("view cart items", res.data)
//       setCartItems(res.data.cartItems);
//     } catch (err) {
//       console.error('Error fetching cart items:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial Data Loading
//   useEffect(() => {
//     if (userId) {
//       fetchCartItems();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (user?.lga) {
//       fetchLGA();
//     }
//   }, [user]);

//   // Update delivery charge when location or LGA data changes
//   useEffect(() => {
//     if (!deliveryChargeLoading && location && lgarea.length > 0) {
//       const deliveryCharge = getDeliveryCharge(location);
//       setCartTotals(prev => ({
//         ...prev,
//         deliveryCharge
//       }));
//     }
//   }, [location, lgarea, deliveryChargeLoading]);

//   // Calculate totals when cart items or delivery charge changes
//   useEffect(() => {
//     if (!deliveryChargeLoading) {
//       const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
//       const vat = subtotal * 0.075;
//       const totalAmount = subtotal + vat + (cartTotals.deliveryCharge || 0);

//       setCartTotals(prev => ({
//         ...prev,
//         subtotal,
//         vat,
//         totalAmount
//       }));
//     }
//   }, [cartItems, cartTotals.deliveryCharge, deliveryChargeLoading]);

//   // Cart Item Operations
//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     setCartItems(cartItems.map(item => {
//       if (item.id === itemId) {
//         const price = item.discount || item.price;
//         return {
//           ...item,
//           quantity: newQuantity,
//           totalPrice: price * newQuantity
//         };
//       }
//       return item;
//     }));
//   };

//   const handleDelete = async (itemId) => {
//     try {
//       await axios.delete(`${URL}/api/cart/${itemId}`);
//       setCartItems((prevData) => prevData.filter(item => item.id !== itemId));
//     } catch (err) {
//       console.error('Error deleting cart item:', err);
//     }
//   };

//   const handleDeleteAfterPurchase = async () => {
//     try {
//       await axios.delete(`${URL}/api/cart/user/${userId}`);
//     } catch (err) {
//       console.error('Error clearing cart after purchase:', err);
//     }
//   };

//   // Checkout Operations
//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const purchaseData = {
//         email,
//         fname,
//         address,
//         userId,
//         totalAmount: cartTotals.totalAmount,
//         items: cartItems.map(item => ({
//           cartId: item.id,
//           title: item.title,
//           description: item.description || '',
//           price: item.discount || item.price,
//           discount: item.discount || null,
//           color: item.color || '',
//           size: item.size || '',
//           quantity: item.quantity,
//           totalPrice: item.totalPrice,
//         }))
//       };

//       const res = await axios.post(`${URL}/api/purchases/create`, purchaseData);
//       if (res.status === 200) {
//         await handleDeleteAfterPurchase();
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Error creating purchase:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Page loading state
//   const isPageLoading = isLoading || deliveryChargeLoading;


//   const fetchProducts = async () => {
//     const res = await axios.get(`${URL}/api/products`)
//     console.log(res.data)
//     setProducts(res.data)
//   }

//   useEffect(() => {
//       fetchProducts();
//   },[])

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
//             <ShoppingCart className="w-6 h-6" />
//             Shopping Cart
//           </h1>

//           {isPageLoading ? (
//             <div className="flex justify-center items-center min-h-[200px]">
//               <span className="text-gray-500">Loading cart details...</span>
//             </div>
//           ) : (
//             <div className="flex flex-col lg:flex-row gap-8">
//               {/* Cart Items Section */}
//               <div className="lg:w-2/3">
//                 {cartItems.length === 0 ? (
//                   <div className="bg-white rounded-lg p-8 text-center">
//                     <p className="text-gray-500">Your cart is empty</p>
//                   </div>
//                 ) : (
//                   <div className="bg-white rounded-lg shadow-md">
//                     {cartItems?.map(item => (
//                       <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
//                         <img
//                           src={item.imageUrl}
//                           alt={item.title}
//                           className="w-20 h-20 object-cover rounded"
//                         />
//                         <div className="flex-1 ml-4">
//                           <h2 className="font-semibold text-lg">{item.title}</h2>
//                           <p className="text-gray-600 text-sm">
//                             {item.color} | Size: {item.size}
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <span className="font-semibold">
//                               ${(item.discount || item.price).toFixed(2)}
//                             </span>
//                             {item.discount && (
//                               <span className="ml-2 text-sm text-gray-500 line-through">
//                                 ${item.price.toFixed(2)}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center border rounded">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="p-2 hover:bg-gray-100"
//                             >
//                               <Minus className="w-4 h-4" />
//                             </button>
//                             <span className="px-4 py-2">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="p-2 hover:bg-gray-100"
//                             >
//                               <Plus className="w-4 h-4" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => handleDelete(item.id)}
//                             className="p-2 text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Order Summary Section */}
//               <div className="lg:w-1/3">
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                   <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Subtotal</span>
//                       <span>₦{cartTotals.subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">VAT (7.5%)</span>
//                       <span>₦{cartTotals.vat.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Delivery Charge</span>
//                       {deliveryChargeLoading ? (
//                         <span className="text-gray-400">Loading...</span>
//                       ) : deliveryChargeError ? (
//                         <span className="text-red-500">Error loading delivery charge</span>
//                       ) : (
//                         <span>₦{cartTotals.deliveryCharge.toFixed(2)}</span>
//                       )}
//                     </div>
//                     <div className="border-t pt-4">
//                       <div className="flex justify-between font-semibold">
//                         <span>Total</span>
//                         <span>₦{cartTotals.totalAmount.toFixed(2)}</span>
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleCheckout}
//                       disabled={loading || deliveryChargeLoading || cartItems.length === 0}
//                       className={`w-full py-3 rounded-lg transition-colors mt-6 ${
//                         loading || deliveryChargeLoading || cartItems.length === 0
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-blue-600 hover:bg-blue-700 text-white'
//                       }`}
//                     >
//                       {loading ? "Processing..." : "Proceed to Checkout"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className='px-4 md:px-32 py-6'>
//   <div className='font-semibold text-2xl mb-4'>Continue Shopping</div>
//   <div className="relative">
//     <button 
//       onClick={() => {
//         const container = document.getElementById('product-scroll');
//         container.scrollLeft -= container.offsetWidth;
//       }}
//       className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 shadow-lg hover:bg-white flex items-center justify-center w-10 h-10"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//       </svg>
//     </button>

//     <div 
//       id="product-scroll"
//       className="flex overflow-x-auto scroll-smooth gap-6 pb-4 scrollbar-hide"
//       style={{ scrollBehavior: 'smooth' }}
//     >
//       {products.map((product) => (
//         <Link 
//           to={`/productdetails/${product.id}`}
//           key={product.id}
//           className="flex-none w-[calc(33.333%-16px)]" // This makes each card take up exactly 1/3 of the container width minus the gap
//         >
//           <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 h-full">
//             <img
//               src={product.imageUrl}
//               alt={product.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
//               <p className="text-gray-600 font-bold">₦{product.price.toFixed(2)}</p>
//               <button
//                 className={`mt-4 w-full py-2 px-4 rounded transition-colors duration-300 ease-in-out ${
//                   hoveredProduct === product.id
//                     ? 'bg-[#4F7942] text-white'
//                     : 'bg-green-400 text-white'
//                 }`}
//               >
//                 {hoveredProduct === product.id ? 'Add to Cart' : 'View Details'}
//               </button>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>

//     <button 
//       onClick={() => {
//         const container = document.getElementById('product-scroll');
//         container.scrollLeft += container.offsetWidth;
//       }}
//       className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2  shadow-lg hover:bg-white flex items-center justify-center w-10 h-10"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//       </svg>
//     </button>
//   </div>
// </div>




//       </div>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PaystackButton } from 'react-paystack';
import Navbar from '../components/Navbar';

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id: cartId } = useParams();
  
  // State Management
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [lgarea, setLGArea] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [loading, setLoading] = useState(false);
  const [deliveryChargeLoading, setDeliveryChargeLoading] = useState(true);
  const [deliveryChargeError, setDeliveryChargeError] = useState(null);

  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    vat: 0,
    deliveryCharge: 0,
    totalAmount: 0
  });

  // User Information
  const email = user?.email;
  const fname = user?.fname;
  const location = user?.lga;
  const userId = user?.id;
  const address = user?.address;

  // Fetch Delivery Rates
  const fetchLGA = async () => {
    try {
      setDeliveryChargeLoading(true);
      const res = await axios.get(`${URL}/api/deliveryrates`);
      setLGArea(res.data);
      
      const initialDeliveryCharge = getDeliveryCharge(location);
      setCartTotals(prev => ({
        ...prev,
        deliveryCharge: initialDeliveryCharge
      }));
    } catch (error) {
      console.error('Error fetching delivery rates:', error);
      setDeliveryChargeError(error);
    } finally {
      setDeliveryChargeLoading(false);
    }
  };

  // Get Delivery Charge
  const getDeliveryCharge = (userLga) => {
    if (!userLga || !lgarea?.length) return 0;
    
    const deliveryArea = lgarea.find(area => 
      area?.lga?.toLowerCase() === userLga?.toLowerCase()
    );
    
    return deliveryArea?.deliveryCharge || 0;
  };

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`${URL}/api/cart/user/${userId}`);
      setCartItems(res.data.cartItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Data Loading
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    } else {
      setIsLoading(false); // Set loading to false if there's no userId
    }
  }, [userId]);

  useEffect(() => {
    if (user?.lga) {
      fetchLGA();
    }
  }, [user]);

  // Update delivery charge when location or LGA data changes
  useEffect(() => {
    if (!deliveryChargeLoading && location && lgarea.length > 0) {
      const deliveryCharge = getDeliveryCharge(location);
      setCartTotals(prev => ({
        ...prev,
        deliveryCharge
      }));
    }
  }, [location, lgarea, deliveryChargeLoading]);

  // Calculate totals when cart items or delivery charge changes
  useEffect(() => {
    if (!deliveryChargeLoading) {
      const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const vat = subtotal * 0.075;
      const totalAmount = subtotal + vat + (cartTotals.deliveryCharge || 0);

      setCartTotals(prev => ({
        ...prev,
        subtotal,
        vat,
        totalAmount
      }));
    }
  }, [cartItems, cartTotals.deliveryCharge, deliveryChargeLoading]);

  // Cart Item Operations
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const price = item.discount || item.price;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: price * newQuantity
        };
      }
      return item;
    }));
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${URL}/api/cart/${itemId}`);
      setCartItems((prevData) => prevData.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  };

  const handleDeleteAfterPurchase = async () => {
    try {
      await axios.delete(`${URL}/api/cart/user/${userId}`);
    } catch (err) {
      console.error('Error clearing cart after purchase:', err);
    }
  };

  // Checkout Operations
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const purchaseData = {
        email,
        fname,
        address,
        userId,
        totalAmount: cartTotals.totalAmount,
        items: cartItems.map(item => ({
          cartId: item.id,
          title: item.title,
          description: item.description || '',
          price: item.discount || item.price,
          discount: item.discount || null,
          color: item.color || '',
          size: item.size || '',
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }))
      };

      const res = await axios.post(`${URL}/api/purchases/create`, purchaseData);
      if (res.status === 200) {
        await handleDeleteAfterPurchase();
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating purchase:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${URL}/api/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Shopping Cart
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <span className="text-gray-500">Loading cart details...</span>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items Section */}
              <div className="lg:w-2/3">
                {cartItems.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md">
                    {cartItems?.map(item => (
                      <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 ml-4">
                          <h2 className="font-semibold text-lg">{item.title}</h2>
                          <p className="text-gray-600 text-sm">
                            {item.color} | Size: {item.size}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="font-semibold">
                              ${(item.discount || item.price).toFixed(2)}
                            </span>
                            {item.discount && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary Section */}
              {cartItems.length > 0 && (
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₦{cartTotals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT (7.5%)</span>
                        <span>₦{cartTotals.vat.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Charge</span>
                        {deliveryChargeLoading ? (
                          <span className="text-gray-400">Loading...</span>
                        ) : deliveryChargeError ? (
                          <span className="text-red-500">Error loading delivery charge</span>
                        ) : (
                          <span>₦{cartTotals.deliveryCharge.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₦{cartTotals.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleCheckout}
                        disabled={loading || deliveryChargeLoading || cartItems.length === 0}
                        className={`w-full py-3 rounded-lg transition-colors mt-6 ${
                          loading || deliveryChargeLoading || cartItems.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {loading ? "Processing..." : "Proceed to Checkout"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Continue Shopping Section */}
        <div className='px-4 md:px-32 py-6'>
          <div className='font-semibold text-2xl mb-4'>Continue Shopping</div>
          <div className="relative">
            <button 
              onClick={() => {
                const container = document.getElementById('product-scroll');
                container.scrollLeft -= container.offsetWidth;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 shadow-lg hover:bg-white flex items-center justify-center w-10 h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div 
              id="product-scroll"
              className="flex overflow-x-auto scroll-smooth gap-6 pb-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {products.map((product) => (
                <Link 
                  to={`/productdetails/${product.id}`}
                  key={product.id}
                  className="flex-none w-[calc(33.333%-16px)]"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 h-full">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
                      <p className="text-gray-600 font-bold">₦{product.price.toFixed(2)}</p>
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
                  </div>
                </Link>
              ))}
            </div>

                <button 
              onClick={() => {
                const container = document.getElementById('product-scroll');
                container.scrollLeft += container.offsetWidth;
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 shadow-lg hover:bg-white flex items-center justify-center w-10 h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}