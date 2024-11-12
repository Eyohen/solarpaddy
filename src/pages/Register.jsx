import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiUserLine, 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiErrorWarningLine
} from 'react-icons/ri';
import axios from 'axios';
import { URL } from '../url';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        state: '',
        country: '',
      });
    
      const [errors, setErrors] = useState({});
      const [showPassword, setShowPassword] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: ''
          }));
        }
      };
    
      const validateForm = () => {
        const newErrors = {};
    
        // First Name validation
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
    
        // Last Name validation
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
    
        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
    
        // Password validation
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
    
        // Location validations
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    

      const navigate = useNavigate()


      const handleSubmit = async (e) => {
        e.preventDefault();
        
        // if (!validateForm()) return;
    
        setIsLoading(true);
        try {
          
         const res = await axios.post(`${URL}/api/auth/register`, formData);
          console.log('Form submitted:', formData);
          
          if (res.status === 200){
          // Handle successful registration
          alert('Registration successful!');
          navigate('/login')
          }
        } catch (error) {
          console.error('Registration error:', error);
          setErrors(prev => ({
            ...prev,
            submit: 'Registration failed. Please try again.'
          }));
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               {/* First Name */}
               <div>
                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                   First Name
                 </label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                     <RiUserLine className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     name="firstName"
                     id="firstName"
                     autoComplete="given-name"
                     value={formData.firstName}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-2 border ${
                       errors.firstName ? 'border-red-300' : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />
                 </div>
                 {errors.firstName && (
                   <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                 )}
               </div>

               {/* Last Name */}
               <div>
                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                   Last Name
                 </label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                     <RiUserLine className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     name="lastName"
                     id="lastName"
                     autoComplete="family-name"
                     value={formData.lastName}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-2 border ${
                       errors.lastName ? 'border-red-300' : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />
                 </div>
                 {errors.lastName && (
                   <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                 )}
               </div>
             </div>

             {/* Email */}
             <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                 Email address
               </label>
               <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                   <RiMailLine className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                   type="email"
                   name="email"
                   id="email"
                   autoComplete="email"
                   value={formData.email}
                   onChange={handleChange}
                   className={`block w-full pl-10 pr-3 py-2 border ${
                     errors.email ? 'border-red-300' : 'border-gray-300'
                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
               </div>
               {errors.email && (
                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
               )}
             </div>

             {/* Phone */}
             <div>
               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                 Phone number
               </label>
               <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                   <RiPhoneLine className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                   type="tel"
                   name="phone"
                   id="phone"
                   autoComplete="tel"
                   value={formData.phone}
                   onChange={handleChange}
                   className={`block w-full pl-10 pr-3 py-2 border ${
                     errors.phone ? 'border-red-300' : 'border-gray-300'
                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
               </div>
               {errors.phone && (
                 <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
               )}
             </div>

             {/* Password */}
             <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                 Password
               </label>
               <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                   <RiLockLine className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                   type={showPassword ? "text" : "password"}
                   name="password"
                   id="password"
                   value={formData.password}
                   onChange={handleChange}
                   className={`block w-full pl-10 pr-10 py-2 border ${
                     errors.password ? 'border-red-300' : 'border-gray-300'
                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 <button
                   type="button"
                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   {showPassword ? (
                     <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                   ) : (
                     <RiEyeLine className="h-5 w-5 text-gray-400" />
                   )}
                 </button>
               </div>
               {errors.password && (
                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
               )}
             </div>

             {/* Location Fields */}
             <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
               {/* City */}
               <div>
                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                   City
                 </label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                     <RiMapPinLine className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     name="city"
                     id="city"
                     value={formData.city}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-2 border ${
                       errors.city ? 'border-red-300' : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />
                 </div>
                 {errors.city && (
                   <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                 )}
               </div>

               {/* State */}
               <div>
                 <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                   State
                 </label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                     <RiMapPinLine className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     name="state"
                     id="state"
                     value={formData.state}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-2 border ${
                       errors.state ? 'border-red-300' : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />
                 </div>
                 {errors.state && (
                   <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                 )}
               </div>

               {/* Country */}
               <div>
                 <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                   Country
                 </label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                     <RiMapPinLine className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     name="country"
                     id="country"
                     value={formData.country}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-2 border ${
                       errors.country ? 'border-red-300' : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />
                 </div>
                 {errors.country && (
                   <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                 )}
               </div>
             </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-[#4F7942] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            {/* General Error Message */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <RiErrorWarningLine className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {errors.submit}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Privacy Policy */}
            <div className="text-sm text-center text-gray-600">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </div>
          </form>

       

          {/* Help Section */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Need help?{' '}
              <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 sm:px-10">
          <p className="text-xs text-gray-500">
            Password must contain:
          </p>
          <ul className="mt-1 text-xs text-gray-500 list-disc list-inside">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;