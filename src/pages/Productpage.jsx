import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiHeart, FiShare2, FiStar, FiShoppingCart, FiX, FiMessageSquare } from 'react-icons/fi';

export default function Productpage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  // Handle review form changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value
    });
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Review submitted:', reviewForm);
    // Close the modal and reset form
    setIsReviewModalOpen(false);
    setReviewForm({ rating: 5, comment: '' });
  };

  // Handle reply submission
  const handleReplySubmit = (reviewId) => {
    if (replyText.trim() === '') return;
    
    // Here you would typically send the reply to your backend
    console.log('Reply submitted for review ID:', reviewId, 'Reply:', replyText);
    
    // Reset reply state
    setReplyingTo(null);
    setReplyText('');
  };

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
    reviewsList: [
      {
        id: 1,
        user: "Ian Sube",
        rating: 5,
        date: "2 days ago",
        comment: "Amazing product! My skin feels so much better after just a week of use.",
        replies: [
          {
            user: "Store Admin",
            date: "1 day ago",
            text: "Thank you for your feedback, Ian! We're glad you're enjoying the serum."
          }
        ]
      },
      {
        id: 2,
        user: "Jason De Guzman",
        rating: 4,
        date: "1 week ago",
        comment: "Good quality serum, absorbs quickly and doesn't feel greasy.",
        replies: []
      },
      {
        id: 3,
        user: "Alex Miguel",
        rating: 5,
        date: "2 weeks ago",
        comment: "Love how natural the ingredients are. Will definitely buy again!",
        replies: []
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
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg 
                hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-sm"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Write a Review
              </motion.button>
            </div>

            {/* Review Modal */}
            <AnimatePresence>
              {isReviewModalOpen && (
                <div className="fixed inset-0 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-emerald-900">Write a Review</h3>
                        <button 
                          onClick={() => setIsReviewModalOpen(false)}
                          className="text-emerald-500 hover:text-emerald-700 transition-colors"
                        >
                          <FiX className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="block text-emerald-800 mb-2">Your Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                className="text-2xl text-yellow-400 focus:outline-none"
                              >
                                <FiStar className={reviewForm.rating >= star ? 'fill-current' : ''} />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="comment" className="block text-emerald-800 mb-2">Your Review</label>
                          <textarea
                            id="comment"
                            name="comment"
                            value={reviewForm.comment}
                            onChange={handleReviewChange}
                            rows="4"
                            placeholder="Share your experience with this product..."
                            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsReviewModalOpen(false)}
                            className="px-4 py-2 border border-emerald-200 text-emerald-600 rounded-lg hover:bg-emerald-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

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
                  
                  {/* Reply button and form */}
                  <div className="mt-3">
                    {replyingTo !== review.id ? (
                      <button 
                        onClick={() => setReplyingTo(review.id)}
                        className="flex items-center text-sm text-emerald-600 hover:text-emerald-800 mt-2"
                      >
                        <FiMessageSquare className="mr-1" /> Reply
                      </button>
                    ) : (
                      <div className="mt-3 bg-emerald-50 p-3 rounded-lg">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          rows="2"
                        ></textarea>
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-sm border border-emerald-200 text-emerald-600 rounded-lg hover:bg-emerald-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleReplySubmit(review.id)}
                            className="px-3 py-1 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500"
                          >
                            Submit Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Display existing replies if any */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="ml-6 mt-3 space-y-3">
                      {review.replies.map((reply, index) => (
                        <div key={index} className="bg-emerald-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-emerald-800 text-sm">{reply.user}</span>
                            <span className="text-xs text-emerald-600">{reply.date}</span>
                          </div>
                          <p className="text-sm text-emerald-700">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
