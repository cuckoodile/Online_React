import React, { use, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  useUpdateCartItem,
  useDeleteCartItem,
} from "@/utils/hooks/useCartsHooks";
import debounce from "lodash.debounce";

export default function CartCard({ item, onUpdateQuantity, token, onDelete }) {
  const [localQuantity, setLocalQuantity] = useState(item.quantity | 0);
  const updateCartItemMutation = useUpdateCartItem();
  const deleteCartItemMutation = useDeleteCartItem();

  const debouncedUpdate = useCallback(
    debounce((id, quantity) => {
      updateCartItemMutation.mutate({
        id,
        data: { quantity },
        token,
      });
      onUpdateQuantity(id, quantity, token);
    }, 800),
    [onUpdateQuantity, token]
  );

  const updateQuantity = (id, change) => {
    const newQuantity = Math.max(1, localQuantity + change);
    setLocalQuantity(newQuantity);
    debouncedUpdate(id, newQuantity);
  };

  // useEffect(() => {
  //   setLocalQuantity(item.quantity);
  // }, [localQuantity]);

  const removeItem = (id) => {
    deleteCartItemMutation.mutate(
      {
        id,
        token,
      },
      {
        onSuccess: () => {
          if (typeof onDelete === "function") {
            onDelete(id);
            console.log("Item removed successfully");
          }
        },
      }
    );
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 border-b border-emerald-100 flex items-center"
    >
      <button
        onClick={() => removeItem(item.id)}
        className="p-2 hover:bg-red-100 rounded-full text-red-500 mr-2"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      <img
        src={item.product.product_image[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-emerald-900">
          {item.product.name}
        </h3>
        <p className="text-sm text-emerald-600">{item.product.category_id}</p>
      </div>

      <div className="w-1/6 text-center text-emerald-700 font-medium">
        ₱{item.product.price.toLocaleString()}
      </div>

      <div className="w-1/6 flex items-center justify-center">
        <div className="flex items-center border border-emerald-200 rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="px-2 py-1 hover:bg-emerald-100 text-emerald-600"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-emerald-900 font-medium">
            {localQuantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="px-2 py-1 hover:bg-emerald-100 text-emerald-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="w-1/6 text-right text-lg font-semibold text-emerald-900 pr-4">
        ₱{(item.product.price * item.quantity).toLocaleString()}
      </div>
    </motion.div>
  );
}
