import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';

const products = [
  {
    id: 1,
    name: "Natural Face Serum",
    price: 1299,
    image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
    category: "Cosmetics"
  },
  {
    id: 2,
    name: "Organic Pet Shampoo",
    price: 449,
    image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
    category: "Pet Products"
  },
  {
    id: 3,
    name: "Bamboo Cleaning Set",
    price: 899,
    image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
    category: "Household Essentials"
  },
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
  }
];

const categories = ['All', 'Cosmetics', 'Pet Products', 'Household Essentials'];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₱300', value: '0-300' },
    { label: '₱300 - ₱500', value: '300-500' },
    { label: '₱500 - ₱1000', value: '500-1000' },
    { label: 'Over ₱1000', value: '1000+' }
  ];

export default function Allproducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  

  const filterProducts = () => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      
      let priceMatch = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          priceMatch = product.price >= min && product.price <= max;
        } else {
          priceMatch = product.price >= min;
        }
      }

      return categoryMatch && priceMatch;
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">All Products</h1>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 rounded-lg border text-black border-emerald-200 focus:outline-none 
              focus:ring-2 focus:ring-emerald-500"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="p-2 rounded-lg border border-emerald-200 hover:bg-emerald-100">
              <FiFilter className="text-emerald-600" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedCategory === category 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white text-emerald-600 hover:bg-emerald-50'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterProducts().map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
