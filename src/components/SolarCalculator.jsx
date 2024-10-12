// import React, { useState } from "react";
// import { FaTv, FaFan, FaLightbulb, FaBlender, FaLaptop } from "react-icons/fa";

// const appliances = [
//   { id: 1, name: "TV", watt: 100, icon: <FaTv size={40} /> },
//   { id: 2, name: "Fan", watt: 70, icon: <FaFan size={40} /> },
//   { id: 3, name: "Lightbulb", watt: 10, icon: <FaLightbulb size={40} /> },
//   { id: 4, name: "Blender", watt: 400, icon: <FaBlender size={40} /> },
//   { id: 5, name: "Laptop", watt: 60, icon: <FaLaptop size={40} /> },
// ];

// const SolarCalculator = () => {
//   const [selectedAppliances, setSelectedAppliances] = useState(
//     appliances.map((app) => ({ ...app, quantity: 0 }))
//   );
//   const [totalPower, setTotalPower] = useState(0);
//   const [panelEstimate, setPanelEstimate] = useState(null);

//   const handleQuantityChange = (id, quantity) => {
//     setSelectedAppliances((prev) =>
//       prev.map((app) =>
//         app.id === id ? { ...app, quantity: Math.max(0, quantity) } : app
//       )
//     );
//   };

//   const calculatePanels = () => {
//     const totalWatts = selectedAppliances.reduce(
//       (acc, app) => acc + app.watt * app.quantity,
//       0
//     );

//     const panelWattage = 350; // Assuming each solar panel generates 350 watts
//     const costPerPanel = 200; // Assuming cost per panel is $200
//     const numberOfPanels = Math.ceil(totalWatts / panelWattage);

//     setTotalPower(totalWatts);
//     setPanelEstimate({
//       numberOfPanels,
//       panelDimensions: "1.6m x 1m",
//       totalCost: numberOfPanels * costPerPanel,
//     });
//   };

//   return (
//     <div className="p-8 bg-gray-100">
//       <h1 className="text-3xl font-bold text-center mb-6">Solar Calculator</h1>
//       <div className="grid grid-cols-2 gap-6 mb-8">
//         {selectedAppliances.map((app) => (
//           <div key={app.id} className="flex items-center space-x-4 bg-white p-4 rounded shadow">
//             <div>{app.icon}</div>
//             <div className="flex flex-col">
//               <p className="font-semibold">{app.name} - {app.watt}W</p>
//               <div className="flex items-center space-x-2 mt-2">
//                 <input
//                   type="number"
//                   value={app.quantity}
//                   onChange={(e) => handleQuantityChange(app.id, parseInt(e.target.value) || 0)}
//                   className="w-16 p-2 border rounded"
//                 />
//                 <span>Quantity</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={calculatePanels}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Calculate Solar Panels
//       </button>

//       {panelEstimate && (
//         <div className="mt-8 bg-white p-4 rounded shadow">
//           <h2 className="text-2xl font-bold">Calculation Summary</h2>
//           <p>Total Power Usage: {totalPower}W</p>
//           <p>Number of Panels: {panelEstimate.numberOfPanels}</p>
//           <p>Panel Dimensions: {panelEstimate.panelDimensions}</p>
//           <p>Total Cost: ${panelEstimate.totalCost}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SolarCalculator;


import React, { useState } from "react";
import { FaTv, FaFan, FaLightbulb, FaBlender, FaLaptop, FaSolarPanel, FaCalculator } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const appliances = [
  { id: 1, name: "TV", watt: 100, icon: <FaTv size={32} color="#355E3B" /> },
  { id: 2, name: "Fan", watt: 70, icon: <FaFan size={32} color="#355E3B" /> },
  { id: 3, name: "Lightbulb", watt: 10, icon: <FaLightbulb size={32} color="#355E3B" /> },
  { id: 4, name: "Blender", watt: 400, icon: <FaBlender size={32} color="#355E3B" /> },
  { id: 5, name: "Laptop", watt: 60, icon: <FaLaptop size={32} color="#355E3B" /> },
];

const SolarCalculator = () => {
  const [selectedAppliances, setSelectedAppliances] = useState(
    appliances.map((app) => ({ ...app, quantity: 0 }))
  );
  const [totalPower, setTotalPower] = useState(0);
  const [panelEstimate, setPanelEstimate] = useState(null);

  const handleQuantityChange = (id, change) => {
    setSelectedAppliances((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, quantity: Math.max(0, app.quantity + change) } : app
      )
    );
  };

  const calculatePanels = () => {
    const totalWatts = selectedAppliances.reduce(
      (acc, app) => acc + app.watt * app.quantity,
      0
    );

    const panelWattage = 350; // Assuming each solar panel generates 350 watts
    const costPerPanel = 200; // Assuming cost per panel is $200
    const numberOfPanels = Math.ceil(totalWatts / panelWattage);

    setTotalPower(totalWatts);
    setPanelEstimate({
      numberOfPanels,
      panelDimensions: "1.6m x 1m",
      totalCost: numberOfPanels * costPerPanel,
    });
  };

  const handleCheckout = () => {
    if (panelEstimate){
        Navigate('/checkout',{state:{panelEstimate}});
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <FaSolarPanel className="mx-auto h-16 w-16 text-yellow-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Solar Calculator
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Estimate your solar panel needs based on your appliance usage
          </p>
        </motion.div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Select Your Appliances</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selectedAppliances.map((app) => (
                <motion.div
                  key={app.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-50 py-4 px-2 rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 text-blue-500">{app.icon}</div>
                      <div className="">
                        <h3 className="text-lg font-medium text-gray-900">{app.name}</h3>
                        <p className="text-sm text-gray-500 ">{app.watt}WATT</p>
                      </div>
                    </div>
                    {/* <div className="border px-1 py-1"><MdKeyboardArrowDown/></div>
                    <input
                      type="number"
                      value={app.quantity}
                      onChange={(e) => handleQuantityChange(app.id, parseInt(e.target.value) || 0)}
                      className="w-6 p-2 border rounded-md text-center"
                      min="0"
                      aria-label={`Quantity of ${app.name}`}
                    />
                    
                   <div className="border px-1 py-1"><MdKeyboardArrowUp /></div> */}
                   <div className="flex items-center">
                    <button
                            onClick={() => handleQuantityChange(app.id, -1)}
                            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                            aria-label={`Decrease ${app.name} quantity`}
                                        >
                                <MdKeyboardArrowDown size={24} />
                            </button>
                            <span className="mx-2 w-2 text-center">{app.quantity}</span>
                                        <button
                                    onClick={() => handleQuantityChange(app.id, 1)}
                            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                                aria-label={`Increase ${app.name} quantity`}
  >
    <MdKeyboardArrowUp size={24} />
  </button>
</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={calculatePanels}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#FDDA0D] hover:bg-[#FDDA0D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaCalculator className="mr-2" />
                Calculate Solar Panels
              </motion.button>
            </div>
          </div>

          {panelEstimate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 px-4 py-5 sm:p-6 mt-6 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Summary</h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Total Power Usage</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{totalPower}WATT</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Number of Panels</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{panelEstimate.numberOfPanels}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Panel Dimensions</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{panelEstimate.panelDimensions}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">${panelEstimate.totalCost}</dd>
                </div>

                <div className="sm:col-span-1">
                    
                <Link to={'/checkout'}><button className="bg-[#355E3B] text-white px-6 py-3 rounded-md">Proceed to checkout</button></Link>
                </div>

                
              </dl>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;