import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, User, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';

const ViewEnquiry = () => {
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id:enquiryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(`${URL}/api/calculator/${enquiryId}`);
        console.log('enquiry', res.data)
        setEnquiry(res.data);
      } catch (error) {
        console.error('Error fetching enquiry:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [enquiryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to enquiries
          </button>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Enquiry #{enquiry?.id.slice(0, 8)}
          </h1>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Request Status</h2>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {enquiry?.status || 'Completed'}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(enquiry?.createdAt)}
            <Clock className="w-4 h-4 ml-4 mr-2" />
            {formatTime(enquiry?.createdAt)}
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">Customer Name</span>
              </div>
              <p className="font-medium">{enquiry?.firstName}</p>
           
            </div>
            <div>
              <div className="flex items-center mb-2">
   
                <span className="text-sm text-gray-600">Customer contact</span>
              </div>
              <p className="font-medium">{enquiry?.email}</p>
              <p className="text-gray-600">{enquiry?.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="divide-y divide-gray-200">
            {enquiry?.appliances?.map((item, index) => (
              <div key={index} className="py-4 flex items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-full h-full p-4 text-gray-400" />
                  )}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>Quantity: {item.quantity}</span>
                    <span className="mx-2">•</span>
                    <span>Category: {item.category}</span>
                    {item.color && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Color: {item.color}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-sm font-medium text-gray-900">
                  {(item.watt * item.quantity).toFixed(2)}
                  </p>
              
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h2>
          <div className="space-y-3">
            {/* <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₦{enquiry?.totalAmount ? (enquiry.totalAmount * 0.85).toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT (15%)</span>
              <span>₦{enquiry?.totalAmount ? (enquiry.totalAmount * 0.15).toFixed(2) : '0.00'}</span>
            </div> */}
            <div className="border-t pt-3 flex justify-between font-medium text-gray-900">
              <span>Total Appliances</span>
              <span>{enquiry?.totalAppliances || '0'}</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ViewEnquiry;