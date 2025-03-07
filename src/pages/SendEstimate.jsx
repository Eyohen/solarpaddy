// import React, { useEffect, useState } from "react";
// import { URL } from '../url';
// import axios from 'axios';
// import { Link, useNavigate,useParams } from 'react-router-dom';
// import { RiUpload2Line, RiPriceTag3Line, RiText } from 'react-icons/ri';

// const SendEstimate = () => {
//     const { id:enquiryId } = useParams();
//   const navigate = useNavigate();
//   const [enquiry, setEnquiry] = useState(null);
//   const [formData, setFormData] = useState({
//     email: "",
//     phone: "",
//     estimationNotes: "",

//   });
//   const [isLoading, setIsLoading] = useState(false);


//   useEffect(() => {
//     const fetchEnquiry = async () => {
//       try {
//         const res = await axios.get(`${URL}/api/calculator/${enquiryId}`);
//         console.log('enquiry', res.data)
//         setEnquiry(res.data);

//         // set email and phone from enquiry data
//         setFormData(prev => ({
//             ...prev,
//             email: res.data.email,
//             phone: res.data.phone,
//             estimationNotes: '' 
//         }))
//       } catch (error) {
//         console.error('Error fetching enquiry:', error);
//       } 
//     };

//     fetchEnquiry();
//   }, [enquiryId]);


  
//   const handleChange = (e) => {
//     const {name, value} = e.target;
//     setFormData(prev => ({
//         ...prev,
//         [name]:value 
//     }));
//   };


//   const createEstimate = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await axios.post(`${URL}/api/estimate/create`, formData)
//         if(res.status === 200){
//             navigate('/enquirytable')
//         }

//     } catch (error){
//         console.log('Error sending estimate')
//     }
//   }



  

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-lg shadow-xl overflow-hidden">
//           <div className="px-6 py-8">
//             <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
//               Send Estimate 
//             </h2>

//             <form onSubmit={createEstimate} className="space-y-6">
                 

//               {/* Form Fields */}
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

//               <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="text"
//                     name="email"
//                     value={formData?.email}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Product Title"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
        
//                     <input
//                       type="number"
//                       name="phone"
//                       value={formData?.phone}
//                       onChange={handleChange}
//                       className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="0.00"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Estimation Note
//                   </label>
//                   <textarea
//                     name="estimationNotes"
//                     value={formData.estimationNotes}
//                     onChange={handleChange}
//                     rows={3}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Estimation notes"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/producttable')}
//                   className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                   {isLoading ? 'Sending...' : 'Send Estimate'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEstimate;



import React, { useEffect, useState } from "react";
import { URL } from '../url';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RiUpload2Line, RiPriceTag3Line, RiText } from 'react-icons/ri';

const SendEstimate = () => {
  const { id: enquiryId } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    estimationNotes: "",
    equipment: "",
    cost: "",
    totalWattage: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const res = await axios.get(`${URL}/api/calculator/${enquiryId}`);
        const enquiryData = res.data;
        setEnquiry(enquiryData);
        
        // Format the equipment data as a string
        const equipmentString = JSON.stringify(enquiryData.appliances.map(app => ({
          name: app.name,
          watt: app.watt,
          quantity: app.quantity
        })));

        setFormData(prev => ({
          ...prev,
          firstName: enquiryData.firstName,
          email: enquiryData.email,
          phone: enquiryData.phone,
          equipment: equipmentString,
          totalWattage: enquiryData.totalWattage
        }));
      } catch (error) {
        console.error('Error fetching enquiry:', error);
      }
    };

    fetchEnquiry();
  }, [enquiryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createEstimate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ensure all necessary fields are included
      const estimateData = {
        ...formData,
        totalWattage: parseFloat(formData.totalWattage),
        cost: formData.cost.toString() // Ensure cost is sent as string per model
      };

      const res = await axios.post(`${URL}/api/estimate/create`, estimateData);
      if (res.status === 200) {
        navigate('/enquirytable');
      }
    } catch (error) {
      console.error('Error sending estimate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Send Estimate
            </h2>

            <form onSubmit={createEstimate} className="space-y-8">
              {/* Client Details */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Wattage
                  </label>
                  <input
                    type="number"
                    name="totalWattage"
                    value={formData.totalWattage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Cost (₦)
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter total cost"
                    required
                  />
                </div>
              </div>

              {/* Appliances List */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment List</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 mb-2 font-medium text-sm text-gray-600">
                    <div>Equipment</div>
                    <div>Wattage</div>
                    <div>Quantity</div>
                  </div>
                  {enquiry?.appliances.map((appliance, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 py-2 border-t border-gray-200">
                      <div className="text-sm">{appliance.name}</div>
                      <div className="text-sm">{appliance.watt}W</div>
                      <div className="text-sm">{appliance.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimation Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimation Notes
                </label>
                <textarea
                  name="estimationNotes"
                  value={formData.estimationNotes}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add detailed notes about the estimation, including any specific requirements, recommendations, or additional information..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/enquirytable')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Estimate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEstimate;