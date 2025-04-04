import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cartpage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Natural Face Serum",
      price: 1299,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      quantity: 1,
      category: "Cosmetics"
    },
    {
      id: 2,
      name: "Organic Pet Shampoo",
      price: 449,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      quantity: 2,
      category: "Pet Products"
    },
    {
      id: 3,
      name: "Bamboo Cleaning Set",
      price: 899,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      quantity: 1,
      category: "Household Essentials"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 150;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm mb-4 p-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-emerald-900">{item.name}</h3>
                  <p className="text-sm text-emerald-600">{item.category}</p>
                  <p className="text-emerald-700 font-medium mt-1">₱{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-emerald-100 rounded-full"
                  >
                    <Minus className="h-4 w-4 text-emerald-600" />
                  </button>
                  <span className="w-8 text-center text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-emerald-100 rounded-full"
                  >
                    <Plus className="h-4 w-4 text-emerald-600" />
                  </button>
                </div>
                <p className="text-lg font-semibold text-emerald-900 w-24 text-right">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-red-100 rounded-full text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-emerald-800">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-800">
                  <span>Shipping</span>
                  <span>₱{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-emerald-900">
                    <span>Total</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                transition-all duration-300 shadow-md"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Recommended Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Recommended Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[  
              {
                id: 4,
                name: "Natural Lip Balm Set",
                price: 299,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Cosmetics"
              },
              {
                id: 5,
                name: "Pet Bamboo Bowl",
                price: 599,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Pet Products"
              },
              {
                id: 6,
                name: "Eco Laundry Detergent",
                price: 449,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Household Essentials"
              },
              {
                id: 7,
                name: "Organic Face Mask",
                price: 399,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Cosmetics"
              },
              {
                id: 8,
                name: "Bamboo Pet Brush",
                price: 349,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Pet Products"
              },
              {
                id: 9,
                name: "Natural Hand Cream",
                price: 499,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Cosmetics"
              },
              {
                id: 10,
                name: "Eco-Friendly Dish Soap",
                price: 279,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Household Essentials"
              },
              {
                id: 11,
                name: "Pet Dental Care Kit",
                price: 799,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Pet Products"
              },
              {
                id: 12,
                name: "Organic Shampoo Bar",
                price: 349,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Cosmetics"
              },
              {
                id: 13,
                name: "Bamboo Dish Brush",
                price: 199,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Household Essentials"
              },
              {
                id: 14,
                name: "Pet Training Treats",
                price: 299,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Pet Products"
              },
              {
                id: 15,
                name: "Natural Sunscreen",
                price: 699,
                image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
                category: "Cosmetics"
              }
            ].map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100
                    transition-opacity flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white text-emerald-900 rounded-lg font-medium"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-emerald-600 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-emerald-900 mb-2">{product.name}</h3>
                  <p className="text-emerald-700 font-medium">₱{product.price.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
