import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data with more detailed order information
const orderData = [
  { month: 'Jan', orders: 220, growth: 0 },
  { month: 'Feb', orders: 280, growth: 27.3 },
  { month: 'Mar', orders: 250, growth: -10.7 },
  { month: 'Apr', orders: 320, growth: 28.0 },
  { month: 'May', orders: 290, growth: -9.4 },
  { month: 'Jun', orders: 350, growth: 20.7 },
  { month: 'Jul', orders: 380, growth: 8.6 },
  { month: 'Aug', orders: 360, growth: -5.3 },
  { month: 'Sep', orders: 400, growth: 11.1 },
  { month: 'Oct', orders: 420, growth: 5.0 },
  { month: 'Nov', orders: 450, growth: 7.1 },
  { month: 'Dec', orders: 480, growth: 6.7 }
].map(item => ({
  ...item,
  growth: Number(item.growth.toFixed(1))
}));

const OrdersAnalysis = () => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [timeframe, setTimeframe] = useState('year');

  // Calculate statistics
  const totalOrders = orderData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrders = Math.round(totalOrders / orderData.length);
  const maxOrders = Math.max(...orderData.map(item => item.orders));
  const bestMonth = orderData.find(item => item.orders === maxOrders);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <p className="text-purple-600 font-medium">
            Orders: {data.orders.toLocaleString()}
          </p>
          <p className={`text-sm ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Growth: {data.growth >= 0 ? '+' : ''}{data.growth}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Orders Analysis</h2>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="year">Yearly</option>
            <option value="quarter">Quarterly</option>
            <option value="month">Monthly</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-purple-800">
            {totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">Average Monthly Orders</p>
          <p className="text-2xl font-bold text-blue-800">
            {averageOrders.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-600 mb-1">Best Month</p>
          <p className="text-2xl font-bold text-green-800">
            {bestMonth.month} ({bestMonth.orders})
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={orderData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
              onMouseMove={(state) => {
                if (state?.activeTooltipIndex !== undefined) {
                  setSelectedBar(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setSelectedBar(null)}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#666' }}
                tickLine={{ stroke: '#666' }}
              />
              <YAxis
                tick={{ fill: '#666' }}
                tickLine={{ stroke: '#666' }}
                axisLine={{ stroke: '#666' }}
                label={{ 
                  value: 'Number of Orders', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#666' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="orders"
                fill="#9333EA"
                radius={[4, 4, 0, 0]}
                className="transition-all duration-200"
              >
                {orderData.map((entry, index) => (
                  <rect
                    key={`bar-${index}`}
                    fill={selectedBar === index ? '#7E22CE' : '#9333EA'}
                    className="transition-all duration-200 cursor-pointer hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Growth Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderData.map((item, index) => (
              <tr 
                key={item.month}
                className={selectedBar === index ? 'bg-purple-50' : 'hover:bg-gray-50'}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.orders}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.growth >= 0 ? '+' : ''}{item.growth}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAnalysis;