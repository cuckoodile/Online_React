import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiHeart, FiShare2, FiStar, FiShoppingCart, FiX, FiMessageSquare } from 'react-icons/fi';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/utils/hooks/useProductsHooks';
import { useLocation } from 'react-router-dom';

export default function Productpage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');

  const { data: product, error, isLoading } = useProducts(productId);
  const createReview = useCreateProduct();
  const updateReview = useUpdateProduct();
  const deleteReview = useDeleteProduct();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  console.log('Product Data:', product);
  console.log('Product ID:', productId);
  const productImages = product?.product_image
    ? (() => {
        try {
          return JSON.parse(product.product_image);
        } catch (error) {
          console.error("Error parsing product.product_image:", error);
          return [];
        }
      })()
    : [];

  const imageHandler = () => {
    return productImages[selectedImage] || '';
  };
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview.mutateAsync({ ...reviewForm, productId: product.id });
      setIsReviewModalOpen(false);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const handleReplySubmit = async (reviewId) => {
    if (replyText.trim() === '') return;
    try {
      await updateReview.mutateAsync({ id: reviewId, updatedData: { reply: replyText } });
      setReplyingTo(null);
      setReplyText('');
    } catch (err) {
      console.error('Error submitting reply:', err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview.mutateAsync(reviewId);
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading product data.</div>;
  }

  if (!product) {
    return <div className="text-center py-8 text-gray-600">No product data available.</div>;
  }
  const productSpecifications = product.product_specifications?.[0]?.details
    ? JSON.parse(product.product_specifications[0].details)
    : {};
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
                  src={imageHandler()}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
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
                <p className="text-emerald-600 mb-2">{product.category.name}</p>
                <h1 className="text-3xl font-bold text-emerald-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <span className="text-emerald-600">({product.product_comments.length} reviews)</span>
                </div>
              </div>

              <p className="text-3xl font-bold text-emerald-700">₱{parseFloat(product.price).toLocaleString()}</p>

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
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-emerald-900">Specifications</h2>
                <ul className="list-disc list-inside space-y-2 text-emerald-600">
                  {Object.entries(productSpecifications).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-900">Customer Reviews</h2>
            <div className="space-y-6">
              {product.product_comments.map((comment) => (
                <div key={comment.id} className="border-b border-emerald-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-emerald-900">User {comment.user_id}</h3>
                    <span className="text-sm text-emerald-600">{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < comment.rating ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <p className="text-emerald-600">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
