import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";

const AdminNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/orders', label: 'Orders' },
    { path: '/billing', label: 'Billing' },
    { path: '/purchases', label: 'Purchases' },
    { path: '/producttable', label: 'Products' },
    { path: '/enquirytable', label: 'Enquiries' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className='bg-white rounded-xl py-2 shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between'>
          {/* Empty div for flex spacing */}
          <div className='w-10'></div>

          {/* Navigation Links - Centered */}
          <div className='flex gap-x-4 justify-center items-center'>
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
              >
                <p 
                  className={`transition-all duration-200 rounded-2xl py-1 px-2
                    ${isActive(item.path) ? 'bg-black text-white' : 'text-gray-600'}`}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </div>

          {/* Notification Icon - Right aligned */}
          <div className='w-10 flex justify-end'>
            <div className='relative'>
              <IoNotificationsOutline size={23} className='cursor-pointer' />
              <span className='bg-red-600 absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                0
              </span>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;