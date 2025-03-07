import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiAddLine, 
  RiSearchLine, 
  RiFilterLine, 
  RiMoreLine,
  RiEditLine,
  RiMailSendLine,
  RiDeleteBin6Line,
  RiEyeLine
} from 'react-icons/ri';
import AdminNavbar from '../components/AdminNavbar';
import { URL } from '../url';
import axios from 'axios';


const EnquiryTable = () => {
 
  // State for filters and search
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  const [enquiries, setEnquiry] = useState([])
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEnquiries, setSelectedEnquiries] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Filter options
  const statusOptions = ['all', 'pending', 'paid', 'overdue'];
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Amount' },
    { value: 'lowest', label: 'Lowest Amount' }
  ];

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEnquiries(enquiries.map(b => b.id));
    } else {
      setSelectedEnquiries([]);
    }
  };

  const handleSelectEnquiry = (bId) => {
    setSelectedEnquiries(prev => 
      prev.includes(bId)
        ? prev.filter(id => id !== bId)
        : [...prev, bId]
    );
  };

  // Action handlers
  const handleResendb = (bId) => {
    console.log('Resending b:', bId);
    setActionMenuOpen(null);
  };

  const handleEditb = (bId) => {
    console.log('Editing b:', bId);
    setActionMenuOpen(null);
  };

  const handleDelete = async (bId) => {
    if (window.confirm('Are you sure you want to delete this b?')) {
        const res = await axios.delete(`${URL}/api/calculator`)
      console.log('Deleting b:', bId);
      setActionMenuOpen(null);
    }
  };

  // Filter bs based on current filters
//   const filteredEquiries = enquiries.filter(b => {
//     const matchesSearch = 
//       b.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
//       b.phone.toLowerCase().includes(filters.search.toLowerCase());
    
//     const matchesStatus = 
//       filters.status === 'all' || b.status === filters.status;

//     return matchesSearch && matchesStatus;
//   });


  const fetchEnquiries = async () => {
    const res = await axios.get(`${URL}/api/calculator`)
    console.log("enquiry",res.data.records)
    setEnquiry(res.data.records)
  }

  useEffect(() => {
    fetchEnquiries()
  },[])



  return (
    <div className="bg-violet-50 min-h-[100vh] px-12 py-9">
        <AdminNavbar />
      {/* Header */}

        <h1 className="text-2xl font-bold mt-4">Enquiries</h1>
      



      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bs by customer name or b number..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RiFilterLine />
            Filters
          </button>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* bs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEnquiries.length === enquiries.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Enquiry Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total Appliances</th>
                {/*   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th> */}
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date Created</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {enquiries?.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                    //   checked={selectedbs.includes(b.id)}
                    //   onChange={() => handleSelectb(b.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {b.id.slice(0, 7)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {b.email?.slice(0, 12) + "..."}
                  </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {b?.totalAppliances}
                  </td>
                 {/*    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {b.Brand?.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {b.Category?.name}
                  </td> */}
                  <td className="px-4 py-3">
                   {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === b.id ? null : b.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <RiMoreLine className="text-gray-500" />
                      </button>
                      
                      {actionMenuOpen === b.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <Link to={`/sendestimate/${b.id}`}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <RiEditLine />
                              Send Estimate
                            </Link>
  
                            <Link
                              to={`/viewenquiry/${b.id}`}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <RiEyeLine />
                              View Enquiry
                            </Link>
                            <button
                              onClick={() => handleDeleteb(b.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <RiDeleteBin6Line />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">{enquiries.length}</span> results
            </span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryTable;