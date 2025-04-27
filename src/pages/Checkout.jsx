import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiTruck, FiCheck, FiChevronRight, FiDollarSign, FiSmartphone } from 'react-icons/fi';

export default function Checkout() {
  const [step, setStep] = useState(1); // Now starting with shipping as step 1
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    // Payment information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    // GCash
    gcashNumber: '',
    // Cash on Delivery
    notes: '',
  });
  
  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Natural Face Serum",
      price: 1299,
      quantity: 1,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
    },
    {
      id: 2,
      name: "Organic Shampoo Bar",
      price: 349,
      quantity: 2,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
    }
  ];
  
  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 150;
  const total = subtotal + shipping;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Move to next step or submit order
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Submit order logic would go here
      alert('Order placed successfully!');
    }
  };
  
  return (
    <div className="min-h-screen bg-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-emerald-900 text-center mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center max-w-2xl w-full">
            <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-emerald-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                <FiTruck />
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-200 relative">
              {step >= 2 && <div className="absolute inset-0 bg-emerald-600"></div>}
            </div>
            
            <div className={`flex-1 flex flex-col items-center ${step >= 2 ? 'text-emerald-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                <FiCreditCard />
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {step === 1 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold text-emerald-900 mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-emerald-800 mb-2 text-sm">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-800 mb-2 text-sm">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-800 mb-2 text-sm">Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-800 mb-2 text-sm">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-emerald-800 mb-2 text-sm">Address*</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-800 mb-2 text-sm">City*</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-800 mb-2 text-sm">Postal Code*</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                      rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                      transition-all duration-300 flex items-center gap-2"
                    >
                      Continue to Payment <FiChevronRight />
                    </motion.button>
                  </div>
                </form>
              )}
              
              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold text-emerald-900 mb-4">Payment Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === 'credit-card' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-emerald-200 hover:border-emerald-300'
                        }`}
                        onClick={() => setPaymentMethod('credit-card')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                            paymentMethod === 'credit-card' ? 'border-emerald-500' : 'border-emerald-300'
                          }`}>
                            {paymentMethod === 'credit-card' && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                          </div>
                          <span className="font-medium text-emerald-900">Credit Card</span>
                        </div>
                        <div className="flex justify-center text-emerald-600">
                          <FiCreditCard size={24} />
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === 'gcash' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-emerald-200 hover:border-emerald-300'
                        }`}
                        onClick={() => setPaymentMethod('gcash')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                            paymentMethod === 'gcash' ? 'border-emerald-500' : 'border-emerald-300'
                          }`}>
                            {paymentMethod === 'gcash' && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                          </div>
                          <span className="font-medium text-emerald-900">GCash</span>
                        </div>
                        <div className="flex justify-center text-emerald-600">
                          <FiSmartphone size={24} />
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === 'cod' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-emerald-200 hover:border-emerald-300'
                        }`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                            paymentMethod === 'cod' ? 'border-emerald-500' : 'border-emerald-300'
                          }`}>
                            {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                          </div>
                          <span className="font-medium text-emerald-900">Cash on Delivery</span>
                        </div>
                        <div className="flex justify-center text-emerald-600">
                          <FiDollarSign size={24} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Credit Card Form */}
                    {paymentMethod === 'credit-card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Name on Card*</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required={paymentMethod === 'credit-card'}
                          />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Card Number*</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required={paymentMethod === 'credit-card'}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-emerald-800 mb-2 text-sm">Expiry Date*</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              required={paymentMethod === 'credit-card'}
                            />
                          </div>
                          <div>
                            <label className="block text-emerald-800 mb-2 text-sm">CVV*</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="XXX"
                              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              required={paymentMethod === 'credit-card'}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* GCash Form */}
                    {paymentMethod === 'gcash' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">GCash Number*</label>
                          <input
                            type="tel"
                            name="gcashNumber"
                            value={formData.gcashNumber}
                            onChange={handleChange}
                            placeholder="09XX XXX XXXX"
                            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required={paymentMethod === 'gcash'}
                          />
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-700">
                            After placing your order, you will receive payment instructions via email to complete your GCash payment.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Cash on Delivery Form */}
                    {paymentMethod === 'cod' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Delivery Notes (Optional)</label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any special instructions for delivery"
                            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            rows="3"
                          ></textarea>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <p className="text-sm text-amber-700">
                            Please prepare the exact amount for a smoother transaction. Our delivery personnel will contact you before arrival.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-emerald-200 text-emerald-600 rounded-lg hover:bg-emerald-50"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                      rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                      transition-all duration-300 flex items-center gap-2"
                    >
                      Place Order <FiCheck />
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Order Summary</h2>
              
              {/* Cart Items Summary */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-2">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-900">{item.name}</p>
                      <p className="text-xs text-emerald-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-900">₱{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-emerald-600">Subtotal</span>
                  <span className="font-medium text-emerald-900">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Shipping</span>
                  <span className="font-medium text-emerald-900">₱{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t border-emerald-100 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-emerald-900">Total</span>
                    <span className="font-bold text-emerald-900">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <FiTruck className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-emerald-900 mb-1">Free shipping on orders over ₱2,000</h3>
                    <p className="text-sm text-emerald-600">Your order qualifies for free shipping!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
