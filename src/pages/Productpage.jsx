import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiHeart, FiShare2, FiStar, FiShoppingCart } from 'react-icons/fi';

export default function Productpage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    name: "Natural Face Serum",
    price: 1299,
    description: "Our premium Natural Face Serum is crafted with organic ingredients to nourish and rejuvenate your skin. This lightweight formula absorbs quickly and helps improve skin texture and tone.",
    category: "Cosmetics",
    rating: 4.8,
    reviews: 124,
    stock: 15,
    images: [
      "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
    ],
    details: [
      "100% Natural Ingredients",
      "Suitable for all skin types",
      "Paraben-free",
      "Cruelty-free",
      "30ml bottle"
    ],
    ingredients: "Aloe Vera, Jojoba Oil, Vitamin E, Rose Water, Green Tea Extract",
    reviewsList: [
      {
        id: 1,
        user: "Ian Sube",
        rating: 5,
        date: "2 days ago",
        comment: "Amazing product! My skin feels so much better after just a week of use."
      },
      {
        id: 2,
        user: "Jason De Guzman",
        rating: 4,
        date: "1 week ago",
        comment: "Good quality serum, absorbs quickly and doesn't feel greasy."
      },
      {
        id: 3,
        user: "Alex Miguel",
        rating: 5,
        date: "2 weeks ago",
        comment: "Love how natural the ingredients are. Will definitely buy again!"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4 space-y-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 
                      ${selectedImage === index ? 'border-emerald-500' : 'border-transparent'}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-emerald-600 mb-2">{product.category}</p>
                <h1 className="text-3xl font-bold text-emerald-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <span className="text-emerald-600">({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-3xl font-bold text-emerald-700">₱{product.price.toLocaleString()}</p>

              <p className="text-emerald-600 leading-relaxed">{product.description}</p>

              <div className="space-y-4 py-4 border-y border-emerald-100">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-emerald-900 font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg border border-emerald-200 hover:bg-emerald-50"
                    >
                      <FiMinus className="text-emerald-600" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 rounded-lg border border-emerald-200 hover:bg-emerald-50"
                    >
                      <FiPlus className="text-emerald-600" />
                    </button>
                  </div>
                  <span className="text-emerald-600">({product.stock} available)</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                    rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                    transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 rounded-lg border border-emerald-200 hover:bg-emerald-50"
                  >
                    {/* <FiHeart className="text-emerald-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 rounded-lg border border-emerald-200 hover:bg-emerald-50"
                  > */}
                    <FiShare2 className="text-emerald-600" />
                  </motion.button>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-emerald-900">Product Details</h2>
                <ul className="list-disc list-inside space-y-2 text-emerald-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-emerald-900">Ingredients</h2>
                <p className="text-emerald-600">{product.ingredients}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - New Addition */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-emerald-900">Customer Reviews</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg 
                hover:bg-emerald-100 transition-colors"
              >
                Write a Review
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Rating */}
              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="text-center">
                  <p className="text-5xl font-bold text-emerald-900 mb-2">{product.rating}</p>
                  <div className="flex justify-center text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <p className="text-emerald-600">Based on {product.reviews} reviews</p>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={i < stars ? 'fill-current' : ''} />
                      ))}
                    </div>
                    <div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500"
                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-emerald-600 w-12">
                      {stars === 5 ? '70%' : stars === 4 ? '20%' : '10%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6 mt-8">
              {product.reviewsList.map((review) => (
                <div key={review.id} className="border-b border-emerald-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-emerald-900">{review.user}</h3>
                    <span className="text-sm text-emerald-600">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < review.rating ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <p className="text-emerald-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
