import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiTruck, FiCheck, FiChevronRight, FiDollarSign, FiSmartphone } from 'react-icons/fi';
import { AuthContext } from '@/utils/contexts/AuthContext';
import { useUsers } from '@/utils/hooks/userUsersHooks';
import { useTransactions,useCreateTransaction } from '@/utils/hooks/useTransactionsHooks';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Address fields required by backend
    region: '',
    province: '',
    district: '',
    city_municipality: '',
    barangay: '',
    subdivision_village: '',
    street: '',
    lot_number: '',
    block_number: '',
    zip_code: '',
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
  const buyNowProduct = location.state?.buyNow && location.state?.product;

  const cartItems = React.useMemo(() => {
    if (location.state?.cartItems) {
      return location.state.cartItems.map(item => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: Array.isArray(item.product.product_image)
          ? item.product.product_image[0]
          : (item.product.product_image ? JSON.parse(item.product.product_image)[0] : ''),
      }));
    } else if (buyNowProduct) {
      return [{
        id: buyNowProduct.id,
        name: buyNowProduct.name,
        price: parseFloat(buyNowProduct.price),
        quantity: buyNowProduct.quantity || 1,
        image: Array.isArray(buyNowProduct.product_image)
          ? buyNowProduct.product_image[0]
          : (buyNowProduct.product_image ? JSON.parse(buyNowProduct.product_image)[0] : ''),
      }];
    }
    return [];
  }, [location.state, buyNowProduct]);
  
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
  
  const { user } = useContext(AuthContext);
  const { data: userData, error: userError, isLoading: userLoading } = useUsers(user);
  const createTransaction = useCreateTransaction();
  
  console.log('User Data:', userData.data[user?.id - 1].profile);
  useEffect(() => {
    if (userData && userData.profile) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: userData.data[user?.id -1 ].profile.first_name || '',
        lastName: userData.data[user?.id -1 ].profile.last_name || '',
        email: userData.data[user?.id -1 ].email || '',
        phone: userData.data[user?.id -1 ].profile.contact_number || '',
        region: userData.data[user?.id -1 ].address?.region || '',
        province: userData.data[user?.id -1 ].address?.province || '',
        district: userData.data[user?.id -1 ].address?.district || '',
        city_municipality: userData.data[user?.id -1 ].address?.city_municipality || '',
        barangay: userData.data[user?.id -1 ].address?.barangay || '',
        subdivision_village: userData.data[user?.id -1 ].address?.subdivision_village || '',
        street: userData.data[user?.id -1 ].address?.street || '',
        lot_number: userData.data[user?.id -1 ].address?.lot_number || '',
        block_number: userData.data[user?.id -1 ].address?.block_number || '',
        zip_code: userData.data[user?.id -1 ].address?.zip_code || '',
      }));
    }
  }, [userData]);


  const paymentMethodMap = {
    'credit-card': 1,
    'gcash': 2,
    'cod': 3
  };
  const typeId = 1;
  const statusId = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      const transactionData = {
        payment_method_id: paymentMethodMap[paymentMethod],
        type_id: typeId,
        status_id: statusId,
        region: formData.region,
        province: formData.province,
        district: formData.district,
        city_municipality: formData.city_municipality,
        barangay: formData.barangay,
        subdivision_village: formData.subdivision_village || null,
        street: formData.street || null,
        lot_number: formData.lot_number || null,
        block_number: formData.block_number || null,
        zip_code: formData.zip_code,
      };
      try {
        await createTransaction.mutateAsync({data:transactionData,token:user?.token});
        alert('Order placed successfully!');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
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
                    {/* First Name */}
                    {userData?.data?.[user?.id - 1]?.profile?.first_name ? (
                      <div>
                        <label className="block text-emerald-800 mb-2 text-sm">First Name*</label>
                        <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                          {userData.data[user?.id - 1].profile.first_name}
                        </div>
                      </div>
                    ) : (
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
                    )}
                    {/* Last Name */}
                    {userData?.data?.[user?.id - 1]?.profile?.last_name ? (
                      <div>
                        <label className="block text-emerald-800 mb-2 text-sm">Last Name*</label>
                        <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                          {userData.data[user?.id - 1].profile.last_name}
                        </div>
                      </div>
                    ) : (
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
                    )}
                    {/* Email */}
                    {userData?.data?.[user?.id - 1]?.email ? (
                      <div>
                        <label className="block text-emerald-800 mb-2 text-sm">Email Address*</label>
                        <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                          {userData.data[user?.id - 1].email}
                        </div>
                      </div>
                    ) : (
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
                    )}
                    {/* Phone */}
                    {userData?.data?.[user?.id - 1]?.profile?.contact_number ? (
                      <div>
                        <label className="block text-emerald-800 mb-2 text-sm">Phone Number*</label>
                        <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                          {userData.data[user?.id - 1].profile.contact_number}
                        </div>
                      </div>
                    ) : (
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
                    )}
                    {/* Address fields */}
                    {userData?.data?.[user?.id - 1]?.address ? (
                      <>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Region*</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.region}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Province*</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.province}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">District*</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.district}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">City/Municipality*</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.city_municipality}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Barangay*</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.barangay}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Subdivision/Village</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.subdivision_village}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Street</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.street}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Lot Number</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.lot_number}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Block Number</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.block_number}
                          </div>
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Zip Code*</label>
                          <div className="p-3 border border-emerald-200 rounded-lg bg-gray-50">
                            {userData.data[user?.id - 1].address.zip_code}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Region*</label>
                          <input type="text" name="region" value={formData.region} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Province*</label>
                          <input type="text" name="province" value={formData.province} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">District*</label>
                          <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">City/Municipality*</label>
                          <input type="text" name="city_municipality" value={formData.city_municipality} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Barangay*</label>
                          <input type="text" name="barangay" value={formData.barangay} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Subdivision/Village</label>
                          <input type="text" name="subdivision_village" value={formData.subdivision_village} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Street</label>
                          <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Lot Number</label>
                          <input type="text" name="lot_number" value={formData.lot_number} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Block Number</label>
                          <input type="text" name="block_number" value={formData.block_number} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-emerald-800 mb-2 text-sm">Zip Code*</label>
                          <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                      </>
                    )}
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
