import React, { useState, useEffect } from 'react'
import { FaChartLine, FaBox, FaTag, FaWarehouse, FaShoppingCart, FaChartBar, FaUser, FaNewspaper, FaCog, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [currentMonth, setCurrentMonth] = useState('Jul 2023')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [notifications, setNotifications] = useState(3)
  const navigate = useNavigate()
  
  // Sample data - in a real app, this would come from an API
  const dashboardData = {
    totalRevenue: 4132500, 
    revenueGrowth: 11,
    totalOrders: 1645,
    orderGrowth: 11,
    totalCustomers: 1462,
    customerGrowth: -17,
    salesAnalytics: {
      income: 1163100.00, 
      expenses: 556750.00, 
      balance: 2406750.00 
    },
    salesTargets: {
      daily: 32500, 
      monthly: 725000 
    },
    topProducts: [
      { id: 1, name: 'Air Jordan 8', sales: 752, image: 'https://via.placeholder.com/100' },
      { id: 2, name: 'Air Jordan 5', sales: 752, image: 'https://via.placeholder.com/100' },
      { id: 3, name: 'Air Jordan 13', sales: 752, image: 'https://via.placeholder.com/100' },
      { id: 4, name: 'Nike Air Max', sales: 752, image: 'https://via.placeholder.com/100' },
      { id: 5, name: 'Nike Air Force', sales: 752, image: 'https://via.placeholder.com/100' }
    ],
    recentOrders: [
      { id: '#ORD-001', customer: 'Zanjoe Gonzales', date: '2023-07-28', status: 'Delivered', amount: 245.99 },
      { id: '#ORD-002', customer: 'Ian Sube', date: '2023-07-27', status: 'Processing', amount: 189.50 },
      { id: '#ORD-003', customer: 'Jason De Guzman', date: '2023-07-26', status: 'Shipped', amount: 312.75 },
      { id: '#ORD-004', customer: 'Ryan Delos Santos', date: '2023-07-25', status: 'Delivered', amount: 178.25 },
    ]
  }

  // Chart data
  const chartData = [
    { name: '22 Jul', value: 2400 },
    { name: '23 Jul', value: 3600 },
    { name: '24 Jul', value: 2800 },
    { name: '25 Jul', value: 4200 },
    { name: '26 Jul', value: 3800 },
    { name: '27 Jul', value: 4800 },
    { name: '28 Jul', value: 4000 },
    { name: '29 Jul', value: 3600 },
  ]

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Navigate to Product Management page
  const goToProductManagement = () => {
    navigate('/controller')
  }

  return (
    <div className="flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content - This is the only scrollable container */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
              <p className="text-gray-500">Welcome back, Admin! Here's what's happening today.</p>
            </div>
            <button 
              onClick={goToProductManagement}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <FaBox />
              Product Management
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Revenue" 
              value={`₱${dashboardData.totalRevenue.toLocaleString()}`} 
              period="Last 30 days"
              change={dashboardData.revenueGrowth}
              icon="💰"
              color="bg-blue-50"
              iconColor="bg-blue-100"
            />
            <StatCard 
              title="Total Orders" 
              value={dashboardData.totalOrders.toLocaleString()} 
              period="Last 30 days"
              change={dashboardData.orderGrowth}
              icon="🛒"
              color="bg-purple-50"
              iconColor="bg-purple-100"
            />
            <StatCard 
              title="Total Customers" 
              value={dashboardData.totalCustomers.toLocaleString()} 
              period="Last 30 days"
              change={dashboardData.customerGrowth}
              icon="👤"
              color="bg-green-50"
              iconColor="bg-green-100"
            />
            <StatCard 
              title="Pending Orders" 
              value="11" 
              period="Last 30 days"
              change={0}
              icon="⏳"
              color="bg-amber-50"
              iconColor="bg-amber-100"
            />
          </div>
          
          {/* Analytics and Targets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Sales Analytics</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500">Sort by</span>
                  <select className="border rounded px-3 py-1.5 text-black focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>{currentMonth}</option>
                    <option>Jun 2025</option>
                    <option>May 2025</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="text-gray-500 mb-1">Income</p>
                  <p className="text-2xl font-bold text-gray-800">₱{dashboardData.salesAnalytics.income.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">+20%</span>
                </div>
                <div className="p-4 rounded-lg bg-orange-50">
                  <p className="text-gray-500 mb-1">Expenses</p>
                  <p className="text-2xl font-bold text-gray-800">₱{dashboardData.salesAnalytics.expenses.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">+15%</span>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <p className="text-gray-500 mb-1">Balance</p>
                  <p className="text-2xl font-bold text-gray-800">₱{dashboardData.salesAnalytics.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">+30%</span>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#10B981" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Target</h2>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 flex items-center">
                    <span className="w-3 h-3 bg-gray-300 rounded-full inline-block mr-2"></span>
                    Daily Target
                  </p>
                </div>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.salesTargets.daily}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 flex items-center">
                    <span className="w-3 h-3 bg-teal-500 rounded-full inline-block mr-2"></span>
                    Monthly Target
                  </p>
                </div>
                <p className="text-2xl font-bold text-gray-800">₱{dashboardData.salesTargets.monthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <div className="w-full bg-teal-100 rounded-full h-2.5 mt-2">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-gray-800 mb-4">Current Offers</h3>
                <div className="bg-gray-100 p-3 rounded-lg mb-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">40% Discount</p>
                    <p className="text-sm text-gray-500">Ends in 2 days</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-800">View</button>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Summer Sale</p>
                    <p className="text-sm text-gray-500">Ends in 5 days</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-800">View</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Selling Products and Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Selling Products */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Top Selling Products</h2>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-teal-600 transition-colors">←</button>
                  <button className="text-gray-500 hover:text-teal-600 transition-colors">→</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dashboardData.topProducts.slice(0, 3).map(product => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-500 text-sm">{product.sales} Pcs</p>
                        <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">Top Seller</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-teal-600 hover:text-teal-800 font-medium">View All Products</button>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button className="text-teal-600 hover:text-teal-800 font-medium">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₱{(order.amount * 50).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* New Section: Business Insights and Customer Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Customer Demographics */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Demographics</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Age 18-24</span>
                    <span className="text-gray-600">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Age 25-34</span>
                    <span className="text-gray-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Age 35-44</span>
                    <span className="text-gray-600">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Age 45+</span>
                    <span className="text-gray-600">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-800 mb-4">Gender Distribution</h3>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <div className="flex items-center mb-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full inline-block mr-2"></span>
                      <span className="text-gray-600">Male</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">42%</div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center mb-2">
                      <span className="w-3 h-3 bg-pink-500 rounded-full inline-block mr-2"></span>
                      <span className="text-gray-600">Female</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">58%</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Inventory Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Inventory Status</h2>
                <button className="text-teal-600 hover:text-teal-800 font-medium">Manage</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">
                    <FaWarehouse />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Low Stock Alert</p>
                    <p className="text-sm text-gray-500">5 products below threshold</p>
                  </div>
                  <button className="ml-auto text-red-600 hover:text-red-800">View</button>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
                    <FaBox />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Well Stocked</p>
                    <p className="text-sm text-gray-500">42 products at optimal levels</p>
                  </div>
                  <button className="ml-auto text-green-600 hover:text-green-800">View</button>
                </div>
                
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-3">
                    <FaTag />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Pending Restocks</p>
                    <p className="text-sm text-gray-500">8 orders awaiting delivery</p>
                  </div>
                  <button className="ml-auto text-yellow-600 hover:text-yellow-800">View</button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-800 mb-4">Storage Capacity</h3>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-600">Current Usage</span>
                  <span className="text-gray-600">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">32% storage space available</p>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <FaUser className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-gray-800">New Customer Registration</p>
                  <p className="text-sm text-gray-500">Maria Santos created an account</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
                
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <FaShoppingCart className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-gray-800">New Order Placed</p>
                  <p className="text-sm text-gray-500">Order #ORD-005 for ₱4,250.00</p>
                  <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                </div>
                
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                    <FaTag className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-gray-800">Price Update</p>
                  <p className="text-sm text-gray-500">Air Jordan 8 price updated to ₱8,995.00</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                    <FaNewspaper className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-gray-800">New Review</p>
                  <p className="text-sm text-gray-500">Ryan Delos Santos left a 5-star review</p>
                  <p className="text-xs text-gray-400 mt-1">8 hours ago</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-teal-600 hover:text-teal-800 font-medium">View All Activities</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function SidebarItem({ icon, text, active, onClick }) {
  return (
    <div 
      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
        active ? 'bg-teal-100 text-teal-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{text}</span>
      {active && <span className="ml-auto">›</span>}
    </div>
  )
}

function StatCard({ title, value, period, change, icon, color, iconColor }) {
  const isPositive = change >= 0
  
  return (
    <div className={`${color} p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-sm text-gray-400">{period}</p>
        </div>
        <div className={`w-10 h-10 rounded-full ${iconColor} flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-2 text-gray-800">{value}</h3>
      
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <span>{isPositive ? '↑' : '↓'} {Math.abs(change)}%</span>
        <span className="text-gray-400 text-sm ml-2">vs. previous period</span>
      </div>
    </div>
  );
}

