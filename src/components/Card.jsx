import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function Card({ data: product }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  console.log("Product Data:", product);
  
  const imageHandler = () => {
    try {
      const parsedImages = JSON.parse(product.image);
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        return parsedImages[0];
      }
    } catch (error) {
      console.error("Error parsing product.image:", error);
    }
    return parsedImages = JSON.parse(product.image);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="relative group">
        <img
          src={imageHandler()}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div
          className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100
                  transition-opacity flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full text-emerald-600 hover:bg-emerald-50"
          >
            <FiShoppingCart size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNavigate("/product")}
            className="p-2 bg-white rounded-full text-emerald-600 hover:bg-emerald-50"
          >
            <FiSearch size={20} />
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <p>{imageHandler() ?? "errrorr"}</p>
        <p className="text-sm text-emerald-600 mb-1">{product.category}</p>
        <h3 className="font-semibold text-emerald-900 mb-2">{product.name}</h3>
        <p className="text-emerald-700 font-medium">
          ₱{product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
