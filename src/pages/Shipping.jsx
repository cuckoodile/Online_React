import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Package, Clock, ShoppingBag, AlertTriangle, FileText, CreditCard, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shipping() {
  // Order state with sample data
  const [order, setOrder] = useState({
    id: "ORD-2025-11-28-001",
    date: "November 28, 2025",
    status: "shipped", // Can be "pending", "processing", "packed", "shipped", "out_for_delivery", "delivered", "delayed"
    trackingNumber: "PH123456789",
    estimatedDelivery: "December 2, 2025",
    items: [
      {
        id: 1,
        name: "Natural Face Serum",
        price: 1299,
        quantity: 1,
        image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
      },
      {
        id: 2,
        name: "Bamboo Toothbrush Set",
        price: 249,
        quantity: 3,
        image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
      },
      {
        id: 3,
        name: "Reusable Cotton Pads",
        price: 199,
        quantity: 2,
        image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
      }
    ],
    shippingAddress: {
      name: "kopal si bogart",
      street: "123 Eco Street",
      city: "Makati City",
      postalCode: "1200",
      country: "Philippines"
    },
    paymentMethod: "Credit Card",
    subtotal: 2444,
    shipping: 150,
    total: 2594
  });

  // Status options
  const statusOptions = [
    { value: "pending", label: "Payment Pending", color: "bg-blue-100 text-blue-800" },
    { value: "processing", label: "Processing", color: "bg-purple-100 text-purple-800" },
    { value: "packed", label: "Packed", color: "bg-indigo-100 text-indigo-800" },
    { value: "shipped", label: "Shipped", color: "bg-amber-100 text-amber-800" },
    { value: "out_for_delivery", label: "Out for Delivery", color: "bg-orange-100 text-orange-800" },
    { value: "delivered", label: "Delivered", color: "bg-emerald-100 text-emerald-800" },
    { value: "delayed", label: "Delayed", color: "bg-red-100 text-red-800" }
  ];

  // Helper function to determine status step completion
  const isStepComplete = (step) => {
    const statusOrder = ["pending", "processing", "packed", "shipped", "out_for_delivery", "delivered"];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(step);
    
    // If status is delayed, only mark steps as complete up to processing
    if (order.status === "delayed") {
      return stepIndex <= 1; // Only "pending" and "processing" are complete
    }
    
    return stepIndex <= currentIndex;
  };

  // Get status icon based on completion
  const getStatusIcon = (step) => {
    const isComplete = isStepComplete(step);
    
    if (order.status === "delayed" && step !== "pending" && step !== "processing") {
      return <AlertTriangle className="h-8 w-8 text-amber-500" />;
    }
    
    switch(step) {
      case "pending":
        return isComplete ? 
          <CheckCircle className="h-8 w-8 text-emerald-500" /> : 
          <CreditCard className="h-8 w-8 text-gray-400" />;
      case "processing":
        return isComplete ? 
          <CheckCircle className="h-8 w-8 text-emerald-500" /> : 
          <Clock className="h-8 w-8 text-gray-400" />;
      case "packed":
        return isComplete ? 
          <CheckCircle className="h-8 w-8 text-emerald-500" /> : 
          <Package className="h-8 w-8 text-gray-400" />;
      case "shipped":
        return isComplete ? 
          <CheckCircle className="h-8 w-8 text-emerald-500" /> : 
          <Truck className="h-8 w-8 text-gray-400" />;
      case "out_for_delivery":
        return isComplete ? 
          <CheckCircle className="h-8 w-8 text-emerald-500" /> : 
          <Truck className="h-8 w-8 text-gray-400" />;
      case "delivered":
        return isComplete ? 
          <CheckCircle className="h-8 w-8 text-emerald-500" /> : 
          <Package className="h-8 w-8 text-gray-400" />;
      default:
        return <Clock className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-emerald-900 mb-8 text-center"
          >
            Order Status Tracker
          </motion.h1>
          
          {/* Order Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-white">
                  <h2 className="text-xl font-semibold mb-1">Order #{order.id}</h2>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <p>Placed on {order.date}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-100">
              <div className="p-4 flex items-start">
                <div className="bg-emerald-100 p-2 rounded-full mr-3">
                  <Package className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600">Items</p>
                  <p className="font-medium text-emerald-900">{order.items.length} Products</p>
                </div>
              </div>
              <div className="p-4 flex items-start">
                <div className="bg-emerald-100 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600">Shipping To</p>
                  <p className="font-medium text-emerald-900">{order.shippingAddress.city}</p>
                </div>
              </div>
              <div className="p-4 flex items-start">
                <div className="bg-emerald-100 p-2 rounded-full mr-3">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600">Payment</p>
                  <p className="font-medium text-emerald-900">₱{order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Status Display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Current Status</h3>
            <div className="flex items-center">
              {order.status === "delayed" ? (
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
              ) : (
                <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
              )}
              <p className="text-lg font-medium">
                {statusOptions.find(opt => opt.value === order.status)?.label || "Unknown"}
              </p>
            </div>
            <p className="mt-3 text-gray-600">
              {order.status === "shipped" && `Your package is on its way! Tracking number: ${order.trackingNumber}`}
              {order.status === "delivered" && "Your package has been delivered. Thank you for shopping with us!"}
              {order.status === "delayed" && "We apologize for the delay. Our team is working to resolve this issue."}
              {order.status === "processing" && "We're preparing your order for shipment."}
              {order.status === "packed" && "Your order has been packed and is ready for shipping."}
              {order.status === "out_for_delivery" && "Your package is out for delivery and will arrive today!"}
              {order.status === "pending" && "We're waiting for your payment to be confirmed."}
            </p>
            <p className="mt-2 text-sm text-emerald-600">
              {order.status === "shipped" && `Estimated delivery: ${order.estimatedDelivery}`}
            </p>
          </motion.div>
          
          {/* Order Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900">Order Details</h3>
            </div>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center py-3 border-b border-emerald-100">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 bg-emerald-50 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-emerald-900">{item.name}</h4>
                    <p className="text-emerald-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-900">₱{item.price.toLocaleString()}</p>
                    <p className="text-emerald-600 text-sm">₱{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
              
            {/* Order Summary */}
            <div className="bg-emerald-50 p-4 rounded-lg mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-600">Subtotal</span>
                  <span className="font-medium text-emerald-900">₱{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Shipping</span>
                  <span className="font-medium text-emerald-900">₱{order.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-emerald-200">
                  <span className="font-medium text-emerald-900">Total</span>
                  <span className="font-bold text-emerald-900">₱{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
              
            {/* Shipping Address */}
            <div className="mb-6">
              <h4 className="font-medium text-emerald-900 mb-2 flex items-center">
                <MapPin size={16} className="mr-1" />
                Shipping Address
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-emerald-900">{order.shippingAddress.name}</p>
                <p className="text-emerald-600">{order.shippingAddress.street}</p>
                <p className="text-emerald-600">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p className="text-emerald-600">{order.shippingAddress.country}</p>
              </div>
            </div>
              
            {/* Payment Method */}
            <div>
              <h4 className="font-medium text-emerald-900 mb-2 flex items-center">
                <CreditCard size={16} className="mr-1" />
                Payment Method
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="text-emerald-600">{order.paymentMethod}</p>
                <p className="text-emerald-600 mt-1">**** **** **** 4242</p>
              </div>
            </div>
          </motion.div>  

          {/* Main Content Grid */}
          {/* Status Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-emerald-900 mb-6 pb-2 border-b border-emerald-100">
              Shipping Status
            </h3>
              
            {/* Status Steps */}
            <div className="relative z-10">
              {/* Payment Pending Step */}
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon("pending")}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-900">Payment Confirmed</h4>
                  <p className="text-emerald-600">
                    {isStepComplete("pending") 
                      ? "Your payment has been confirmed and your order is now being processed." 
                      : "Waiting for payment confirmation."}
                  </p>
                </div>
              </div>
                
              {/* Processing Step */}
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon("processing")}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-900">Order Processing</h4>
                  <p className="text-emerald-600">
                    {isStepComplete("processing") 
                      ? "Your order has been processed and is being prepared for packing." 
                      : "Your order will be processed soon."}
                  </p>
                </div>
              </div>
                
              {/* Packed Step */}
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon("packed")}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-900">Order Packed</h4>
                  <p className="text-emerald-600">
                    {order.status === "delayed" && isStepComplete("processing") 
                      ? "Your order packing has been delayed. We're working to resolve this as soon as possible." 
                      : isStepComplete("packed") 
                        ? "Your order has been carefully packed and is ready for shipping." 
                        : "Your order will be packed soon."}
                  </p>
                </div>
              </div>
                
              {/* Shipped Step */}
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon("shipped")}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-900">Order Shipped</h4>
                  {isStepComplete("shipped") ? (
                    <div>
                      <p className="text-emerald-600 mb-1">
                        Your order is on its way to you!
                      </p>
                      <p className="text-emerald-600 mb-1">
                        <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                      </p>
                      <p className="text-emerald-600">
                        <span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}
                      </p>
                    </div>
                  ) : (
                    <p className="text-emerald-600">
                      {order.status === "delayed" && isStepComplete("processing") 
                        ? "Shipping has been delayed due to unforeseen circumstances." 
                        : "Your order will be shipped soon."}
                    </p>
                  )}
                </div>
              </div>
                
              {/* Out for Delivery Step */}
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon("out_for_delivery")}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-900">Out for Delivery</h4>
                  <p className="text-emerald-600">
                    {isStepComplete("out_for_delivery") 
                      ? "Your order is out for delivery and will arrive today!" 
                      : "Your order will be out for delivery soon."}
                  </p>
                </div>
              </div>
                
              {/* Delivered Step */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon("delivered")}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-900">Order Delivered</h4>
                  <p className="text-emerald-600">
                    {isStepComplete("delivered") 
                      ? "Your order has been delivered. Enjoy your eco-friendly products!" 
                      : "Your order will be delivered soon."}
                  </p>
                  {isStepComplete("delivered") && (
                    <div className="mt-2">
                      <button className="text-emerald-600 text-sm font-medium underline hover:text-emerald-700">
                        Leave a Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
              
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-8 pt-6 border-t border-emerald-100">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold 
                  hover:from-emerald-500 hover:to-teal-500 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Continue Shopping
                </motion.button>
              </Link>
                
              {(order.status === "shipped" || order.status === "out_for_delivery") && (
                <motion.a
                  href={`https://tracking.example.com/${order.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg font-semibold 
                  hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Truck size={18} />
                  Track Order
                </motion.a>
              )}
                
              {order.status === "delivered" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg font-semibold 
                  hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  Download Receipt
                </motion.button>
              )}
                
              {order.status === "delayed" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-amber-600 text-amber-600 rounded-lg font-semibold 
                  hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={18} />
                  Contact Support
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
