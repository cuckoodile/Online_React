import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Package, CreditCard, MapPin, Calendar } from 'lucide-react';

export default function Shipping() {
  const [orders] = useState([
    {
      id: "ORD-2025-11-28-001",
      date: "November 28, 2025",
      status: "confirmed",
      trackingNumber: "",
      estimatedDelivery: "December 5, 2025",
      items: [
        { id: 1, name: "Premium Denim Jacket", price: 2499, quantity: 1, image: "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg" }
      ],
      shippingAddress: { name: "John Doe", street: "123 Fashion Street", city: "Makati City", postalCode: "1200", country: "Philippines" },
      paymentMethod: "Credit Card",
      subtotal: 2499,
      shipping: 150,
      total: 2649
    },
    {
      id: "ORD-2025-11-27-002",
      date: "November 27, 2025",
      status: "confirmed",
      trackingNumber: "",
      estimatedDelivery: "",
      items: [
        { id: 2, name: "Silk Scarf", price: 799, quantity: 2, image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg" }
      ],
      shippingAddress: { name: "Jane Smith", street: "456 Style Avenue", city: "Quezon City", postalCode: "1100", country: "Philippines" },
      paymentMethod: "PayPal",
      subtotal: 1598,
      shipping: 100,
      total: 1698
    },
    {
      id: "ORD-2025-11-25-003",
      date: "November 25, 2025",
      status: "confirmed",
      trackingNumber: "",
      estimatedDelivery: "December 1, 2025",
      items: [
        { id: 3, name: "Leather Crossbody Bag", price: 1899, quantity: 1, image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg" }
      ],
      shippingAddress: { name: "Alex Johnson", street: "789 Trendy Blvd", city: "Taguig City", postalCode: "1630", country: "Philippines" },
      paymentMethod: "Credit Card",
      subtotal: 1899,
      shipping: 150,
      total: 2049
    },
    {
      id: "ORD-2025-11-22-004",
      date: "November 22, 2025",
      status: "shipped",
      trackingNumber: "PH123456789",
      estimatedDelivery: "November 28, 2025",
      items: [
        { id: 4, name: "Cashmere Sweater", price: 2799, quantity: 1, image: "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg" }
      ],
      shippingAddress: { name: "Maria Garcia", street: "101 Fashion Lane", city: "Pasig City", postalCode: "1600", country: "Philippines" },
      paymentMethod: "Credit Card",
      subtotal: 2799,
      shipping: 150,
      total: 2949
    },
    {
      id: "ORD-2025-11-20-005",
      date: "November 20, 2025",
      status: "shipped",
      trackingNumber: "PH987654321",
      estimatedDelivery: "November 21, 2025",
      items: [
        { id: 5, name: "High-Waisted Jeans", price: 1299, quantity: 1, image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg" }
      ],
      shippingAddress: { name: "Robert Lim", street: "202 Trend Street", city: "Mandaluyong City", postalCode: "1550", country: "Philippines" },
      paymentMethod: "Credit Card",
      subtotal: 1299,
      shipping: 100,
      total: 1399
    },
    {
      id: "ORD-2025-11-18-006",
      date: "November 18, 2025",
      status: "delivered",
      trackingNumber: "PH456789123",
      estimatedDelivery: "November 20, 2025",
      items: [
        { id: 6, name: "Linen Shirt", price: 899, quantity: 2, image: "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg" }
      ],
      shippingAddress: { name: "Sarah Tan", street: "303 Eco Avenue", city: "San Juan City", postalCode: "1500", country: "Philippines" },
      paymentMethod: "PayPal",
      subtotal: 1798,
      shipping: 100,
      total: 1898
    },
    {
      id: "ORD-2025-11-15-007",
      date: "November 15, 2025",
      status: "cancelled",
      trackingNumber: "",
      estimatedDelivery: "",
      items: [
        { id: 7, name: "Wool Coat", price: 3499, quantity: 1, image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg" }
      ],
      shippingAddress: { name: "David Wong", street: "404 Style Road", city: "Manila", postalCode: "1000", country: "Philippines" },
      paymentMethod: "Credit Card",
      subtotal: 3499,
      shipping: 150,
      total: 3649
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-blue-100 text-blue-800", sample: "Waiting for confirmation" },
    { value: "confirmed", label: "Confirmed", color: "bg-purple-100 text-purple-800", sample: "Order confirmed and being prepared" },
    { value: "shipped", label: "Shipped", color: "bg-amber-100 text-amber-800", sample: "Package is on its way to you" },
    { value: "delivered", label: "Delivered", color: "bg-emerald-100 text-emerald-800", sample: "Package successfully delivered" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", sample: "Order has been cancelled" },
    { value: "returned", label: "Returned", color: "bg-gray-100 text-gray-800", sample: "Items have been returned" }
  ];

  const isStepComplete = (step) => {
    const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(orders[selectedOrder].status);
    const stepIndex = statusOrder.indexOf(step);
    if (["cancelled", "returned"].includes(orders[selectedOrder].status)) return stepIndex <= 0;
    return stepIndex <= currentIndex;
  };

  const getStatusIcon = (step) => {
    const isComplete = isStepComplete(step);
    switch (step) {
      case "pending": return isComplete ? <CheckCircle className="h-6 w-6 text-emerald-500" /> : <CreditCard className="h-6 w-6 text-gray-400" />;
      case "confirmed": return isComplete ? <CheckCircle className="h-6 w-6 text-emerald-500" /> : <Package className="h-6 w-6 text-gray-400" />;
      case "shipped": return isComplete ? <CheckCircle className="h-6 w-6 text-emerald-500" /> : <Truck className="h-6 w-6 text-gray-400" />;
      case "delivered": return isComplete ? <CheckCircle className="h-6 w-6 text-emerald-500" /> : <Package className="h-6 w-6 text-gray-400" />;
      default: return <Package className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-emerald-900 mb-8 text-center"
          >
            My Orders
          </motion.h1>

          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <p className="text-sm text-gray-500 mb-3">
              Showing {filterStatus === 'all' ? `all ${orders.length} orders` : `${orders.filter(order => order.status === filterStatus).length} ${filterStatus} orders`}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterStatus === 'all' ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                aria-label="Show all orders"
              >
                All Orders
              </button>
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setFilterStatus(status.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterStatus === status.value ? `${status.color} ring-2 ring-emerald-500` : `${status.color} hover:opacity-80`}`}
                  aria-label={`Filter by ${status.label} orders`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {orders.filter(order => filterStatus === 'all' || order.status === filterStatus).length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm">
                <Package className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-emerald-900 mb-2">No orders found</h3>
                <p className="text-gray-500">No orders match the selected filter.</p>
                <button
                  onClick={() => setFilterStatus('all')}
                  className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
                  aria-label="View all orders"
                >
                  View all orders
                </button>
              </div>
            ) : (
              orders.filter(order => filterStatus === 'all' || order.status === filterStatus).map((order) => (
                <motion.button
                  key={order.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOrder(orders.findIndex(o => o.id === order.id))}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col gap-3 ${selectedOrder === orders.findIndex(o => o.id === order.id) ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-200 hover:border-emerald-300 hover:shadow-sm'}`}
                  aria-label={`Select order ${order.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-emerald-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusOptions.find(opt => opt.value === order.status)?.color}`}>
                      {statusOptions.find(opt => opt.value === order.status)?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={order.items[0].image} alt={order.items[0].name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-emerald-900 truncate">{order.items[0].name}</h4>
                      {order.items.length > 1 && <p className="text-xs text-gray-500">+{order.items.length - 1} more items</p>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="text-sm">
                      <p className="text-gray-600">{order.paymentMethod}</p>
                      <p className="text-gray-500">{order.shippingAddress.city}</p>
                    </div>
                    <p className="text-lg font-bold text-emerald-900">₱{order.total.toLocaleString()}</p>
                  </div>
                </motion.button>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            role="region"
            aria-labelledby="order-details"
          >
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-5">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-white">
                  <h2 id="order-details" className="text-xl md:text-2xl font-semibold mb-2">Order #{orders[selectedOrder].id}</h2>
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    <p className="text-emerald-100">Placed on {orders[selectedOrder].date}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusOptions.find(opt => opt.value === orders[selectedOrder].status)?.color}`}>
                  {statusOptions.find(opt => opt.value === orders[selectedOrder].status)?.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-100">
              {[
                { icon: <Package className="h-6 w-6 text-emerald-600" />, label: "Items", value: `${orders[selectedOrder].items.length} Products` },
                { icon: <MapPin className="h-6 w-6 text-emerald-600" />, label: "Shipping To", value: orders[selectedOrder].shippingAddress.city },
                { icon: <CreditCard className="h-6 w-6 text-emerald-600" />, label: "Payment", value: `₱${orders[selectedOrder].total.toLocaleString()}` }
              ].map((item, i) => (
                <div key={i} className="p-5 flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-4">{item.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-emerald-600">{item.label}</p>
                    <p className="text-lg font-semibold text-emerald-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-emerald-100">
              <h3 className="text-xl font-semibold text-emerald-900 mb-6">Order Progress</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-1 bg-emerald-100 rounded-full"></div>
                {statusOptions.slice(0, 4).map((status) => (
                  <div key={status.value} className="relative pl-14 pb-8" role="listitem">
                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${isStepComplete(status.value) ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-white border-2 border-emerald-100'}`}>
                      {getStatusIcon(status.value)}
                    </div>
                    <div>
                      <span className={`text-base font-medium ${isStepComplete(status.value) ? 'text-emerald-700' : 'text-gray-400'}`}>{status.label}</span>
                      <p className="text-sm text-gray-500 mt-1">{status.sample}</p>
                      {status.value === orders[selectedOrder].status && (
                        <p className="text-sm text-gray-500 mt-1">
                          {orders[selectedOrder].status === 'shipped' && orders[selectedOrder].trackingNumber && `Tracking #: ${orders[selectedOrder].trackingNumber}`}
                          {orders[selectedOrder].status === 'delivered' && orders[selectedOrder].estimatedDelivery && ` | Delivered on ${orders[selectedOrder].estimatedDelivery}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-emerald-100">
              <h3 className="text-xl font-semibold text-emerald-900 mb-6">Order Items</h3>
              <div className="space-y-4">
                {orders[selectedOrder].items.map((item) => (
                  <div key={item.id} className="flex items-center p-4 bg-white rounded-lg border border-emerald-100 hover:shadow-sm transition-shadow">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-emerald-900">{item.name}</h4>
                      <p className="text-sm text-emerald-600">₱{item.price.toLocaleString()} × {item.quantity}</p>
                    </div>
                    <div className="text-lg font-bold text-emerald-900">₱{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-emerald-100 bg-emerald-50">
              <h3 className="text-xl font-semibold text-emerald-900 mb-6">Order Summary</h3>
              <div className="space-y-3">
                {[
                  { label: "Subtotal", value: `₱${orders[selectedOrder].subtotal.toLocaleString()}` },
                  { label: "Shipping", value: `₱${orders[selectedOrder].shipping.toLocaleString()}` },
                  { label: "Total", value: `₱${orders[selectedOrder].total.toLocaleString()}`, bold: true }
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between ${i === 2 ? 'pt-3 border-t borderecção-emerald-100' : ''}`}>
                    <span className={`text-emerald-600 ${item.bold ? 'font-medium' : ''}`}>{item.label}</span>
                    <span className={`text-emerald-900 ${item.bold ? 'font-bold text-lg' : ''}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}