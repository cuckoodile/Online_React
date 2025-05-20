import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMinus,
  FiPlus,
  FiHeart,
  FiShare2,
  FiStar,
  FiShoppingCart,
  FiX,
  FiMessageSquare,
  FiImage,
} from "react-icons/fi";
import {
  useProductsById,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/utils/hooks/useProductsHooks";
import { useLocation } from "react-router-dom";
import { useAddCartItem } from "@/utils/hooks/useCartsHooks";
import { AuthContext } from "@/utils/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Productpage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  const { data: product, error, isLoading } = useProductsById(productId);
  const createReview = useCreateProduct();
  const updateReview = useUpdateProduct();
  const deleteReview = useDeleteProduct();

  const { user } = React.useContext(AuthContext);
  const addCartItem = useAddCartItem();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });
  React.useEffect(() => {
    if (product && product.product_image) {
      try {
        console.log("Product Data:", JSON.parse(product.product_image)[0]);
      } catch (e) {
        console.log(
          "Product Data: (invalid product_image)",
          product.product_image
        );
      }
    }
    console.log("Product ID:", productId);
  }, [product, productId]);
  // Safely handle product.product_image for all usages below
  const productImages = React.useMemo(() => {
    if (product && product.product_image) {
      try {
        return Array.isArray(product.product_image)
          ? product.product_image
          : JSON.parse(product.product_image);
      } catch (e) {
        return [];
      }
    }
    return [];
  }, [product]);
  const productSpecifications = product.product_specifications?.[0]?.details
    ? JSON.parse(product.product_specifications[0].details)
    : {};
  return (
    <div className="min-h-screen bg-emerald-50 py-12">
      <div className="container mx-auto px-4 space-y-8 max-w-7xl">
        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 p-10">
            {/* Product Images */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square rounded-xl overflow-hidden shadow-sm"
              >
                <img
                  src={productImages[selectedImage] || ""}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => {
                  const image = productImages[index];
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                        ${
                          selectedImage === index
                            ? "border-emerald-500 scale-105"
                            : "border-gray-100 hover:border-emerald-300"
                        }
                        ${!image ? "bg-gray-100" : ""}`}
                      disabled={!image}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FiImage className="text-2xl" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <p className="text-emerald-500 font-medium mb-3">
                  {product.category.name}
                </p>
                <h1 className="text-4xl font-bold text-emerald-900 mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < Math.floor(product.rating) ? "fill-current" : ""
                        }
                      />
                    ))}
                  </div>
                  <span className="text-emerald-500">
                    ({product.product_comments.length} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-4xl font-bold text-emerald-700">
                  ₱{parseFloat(product.price).toLocaleString()}
                </p>

                <p className="text-emerald-600 leading-relaxed text-lg">
                  {product.description}
                </p>

                <div className="space-y-6 py-6 border-y border-emerald-100">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-900 font-medium text-lg">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
                      >
                        <FiMinus className="text-emerald-600 text-lg" />
                      </button>
                      <span className="w-12 text-center font-medium text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="p-2.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
                      >
                        <FiPlus className="text-emerald-600 text-lg" />
                      </button>
                    </div>
                    <span className="text-emerald-500">
                      ({product.stock} available)
                    </span>
                  </div>

                  {/* Add to Cart and Buy Now Buttons */}
                  <div className="flex gap-4">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg"
                      onClick={handleAddToCart}
                    >
                      <FiShoppingCart className="text-xl" />
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold text-lg transition-all duration-200 hover:shadow-lg"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-emerald-900">
                  Specifications
                </h2>
                <ul className="grid grid-cols-2 gap-4 text-emerald-600">
                  {Object.entries(productSpecifications).map(([key, value]) => (
                    <li key={key} className="bg-emerald-50 p-3 rounded-lg">
                      <strong className="text-emerald-700">{key}:</strong>{" "}
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-10">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-emerald-900">
              Customer Reviews
            </h2>
            <div className="space-y-8">
              {product.product_comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-emerald-100 pb-8"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-emerald-900 text-lg">
                      User {comment.user_id}
                    </h3>
                    <span className="text-sm text-emerald-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < comment.rating ? "fill-current" : ""}
                      />
                    ))}
                  </div>
                  <p className="text-emerald-600 text-lg">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
