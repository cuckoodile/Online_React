import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiFilter } from 'react-icons/fi';

export default function Wishlist() {
  const initialWishlistItems = [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 399,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Household Essentials"
    },
    {
      id: 2,
      name: "Natural Clay Face Mask",
      price: 799,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics"
    },
    {
      id: 3,
      name: "Eco Pet Toy Bundle",
      price: 649,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Pet Products"
    },
    {
      id: 4,
      name: "Organic Bath Bombs",
      price: 499,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics"
    },
    {
      id: 5,
      name: "Biodegradable Pet Wipes",
      price: 299,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Pet Products"
    },
    {
      id: 6,
      name: "Zero Waste Cleaning Kit",
      price: 899,
      image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Household Essentials"
    }
  ];

  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
  };

  const handleMoveToCart = (productId) => {
    console.log(`Moved product ${productId} to cart`);
    // Add logic to move item to cart 
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId)); //remove from wishlist after move to cart.
  };

  const handleFilterChange = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== category));
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  const filteredItems = selectedFilters.length > 0
    ? wishlistItems.filter((item) => selectedFilters.includes(item.category))
    : wishlistItems;

  return (
    <div className="min-h-0 bg-emerald-50">
      <div className="sticky top-0 bg-emerald-50 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900">Your Wishlist</h1>
          <p className="text-emerald-700 text-lg">
            {filteredItems.length} items in your wishlist
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 flex">
        <div className="w-64 pr-8 hidden lg:block">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              <FiFilter /> Filters
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-emerald-700 mb-2">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-emerald-600">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.includes('Household Essentials')}
                      onChange={() => handleFilterChange('Household Essentials')}
                    />
                    Household Essentials
                  </label>
                  <label className="flex items-center gap-2 text-sm text-emerald-600">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.includes('Cosmetics')}
                      onChange={() => handleFilterChange('Cosmetics')}
                    />
                    Cosmetics
                  </label>
                  <label className="flex items-center gap-2 text-sm text-emerald-600">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.includes('Pet Products')}
                      onChange={() => handleFilterChange('Pet Products')}
                    />
                    Pet Products
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100
                      transition-opacity flex items-center justify-center gap-4">
                    <button
                      aria-label="Move to cart"
                      onClick={() => handleMoveToCart(product.id)}
                      className="p-2 bg-white rounded-full text-emerald-600 hover:bg-emerald-50"
                    >
                      <FiShoppingCart size={20} />
                    </button>
                    <button
                      aria-label="Remove from wishlist"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="p-2 bg-white rounded-full text-emerald-600 hover:bg-emerald-50"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-emerald-600 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-emerald-900 text-sm mb-2">{product.name}</h3>
                  <p className="text-emerald-700 font-medium text-sm">₱{product.price.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <p className="text-center">No items match the selected filters.</p>
          )}
          {wishlistItems.length === 0 && (
            <p className="text-center">Your Wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}