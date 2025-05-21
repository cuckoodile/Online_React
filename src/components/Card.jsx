import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAddCartItem } from "../utils/hooks/useCartsHooks";
import { AuthContext } from "@/utils/contexts/AuthContext";

export default function Card({ data: product }) {
  const navigate = useNavigate();
  const addCartItem = useAddCartItem();
  const { user } = useContext(AuthContext); 

  const handleNavigate = (path) => {
    navigate(`${path}?id=${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (user) {
      const token = user?.token;
      console.log("User object:", user);
      const user_id = user.id || (user.data && Array.isArray(user.data) && user.data[0]?.id);

      if (user_id) {
        const payload = { product_id: product.id, quantity: 1, user_id };
        console.log("Payload being sent to backend:", payload);
        console.log("Token being sent to backend:", token);
        addCartItem.mutate({
          data: payload,
          token: token,
        }, {
          onError: (error) => {
            console.error("Error adding item to cart:", error.response?.data || error.message);
          },
        });
      } else {
        console.error("User data is undefined or missing user_id.");
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => handleNavigate("/product")}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
    >
      <div className="relative group">
        <img
          src={product.image}
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
            onClick={handleAddToCart}
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
        {/* <p>{imageHandler() ?? "errrorr"}</p> */}
        <p className="text-sm text-emerald-600 mb-1">{product.category}</p>
        <h3 className="font-semibold text-emerald-900 mb-2">{product.name}</h3>
        <p className="text-emerald-700 font-medium">
          ₱{product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
