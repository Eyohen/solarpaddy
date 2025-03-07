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


const Purchases = () => {
  // Sample data - replace with your API data
  const [bills, setBills] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      billNumber: 'BILL-2024-001',
      createdAt: '2024-01-15',
      total: 12500,
      status: 'paid',
      email: 'john@example.com'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      billNumber: 'BILL-2024-002',
      createdAt: '2024-01-18',
      total: 8750,
      status: 'pending',
      email: 'jane@example.com'
    },
    {
      id: 3,
      customerName: 'Robert Johnson',
      billNumber: 'BILL-2024-003',
      createdAt: '2024-01-20',
      total: 15000,
      status: 'overdue',
      email: 'robert@example.com'
    },
    // Add more sample data as needed
  ]);

  // State for filters and search
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);
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
      setSelectedBills(bills.map(bill => bill.id));
    } else {
      setSelectedBills([]);
    }
  };

  const handleSelectBill = (billId) => {
    setSelectedBills(prev => 
      prev.includes(billId)
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  // Action handlers
  const handleResendBill = (billId) => {
    console.log('Resending bill:', billId);
    setActionMenuOpen(null);
  };

  const handleEditBill = (billId) => {
    console.log('Editing bill:', billId);
    setActionMenuOpen(null);
  };

  const handleDeleteBill = (billId) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      console.log('Deleting bill:', billId);
      setActionMenuOpen(null);
    }
  };

  // Filter bills based on current filters
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = 
      filters.status === 'all' || bill.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const res = await axios.get(`${URL}/api/purchases`)
    console.log(res.data)
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  },[])



  return (
    <div className="bg-violet-50 min-h-[100vh] px-12 py-9">
        <AdminNavbar />
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-2xl font-bold">Purchases</h1>
        {/* <Link
          to="/createbill"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RiAddLine />
          Create New Bill
        </Link> */}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bills by customer name or bill number..."
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

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBills.length === bills.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bill Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Transaction Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedBills.includes(bill.id)}
                      onChange={() => handleSelectBill(bill.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {bill.id.slice(0, 7)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {bill.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(bill.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  ₦{bill.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className='bg-green-200 px-3 text-green-600 rounded-lg w-[105px]'>{bill.status}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === bill.id ? null : bill.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <RiMoreLine className="text-gray-500" />
                      </button>
                      
                      {actionMenuOpen === bill.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <button
                              onClick={() => handleEditBill(bill.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <RiEditLine />
                              Edit Purchase
                            </button>
                            {/* <button
                              onClick={() => handleResendBill(bill.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <RiMailSendLine />
                              Resend Bill
                            </button> */}
                            <Link
                              to={`/viewpurchase/${bill.id}`}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <RiEyeLine />
                              View Purchase
                            </Link>
                            <button
                              onClick={() => handleDeleteBill(bill.id)}
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
              <span className="font-medium">{bills.length}</span> results
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

export default Purchases;