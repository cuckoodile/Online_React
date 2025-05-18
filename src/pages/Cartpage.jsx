import React, { useState, useEffect, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCartItems } from "@/utils/hooks/useCartsHooks";
import CartCard from "@/components/CartCard";
import withAuth from "@/components/higher-order-component/withAuth";
import { AuthContext } from "../utils/contexts/AuthContext";

function Cartpage() {
  const { user } = useContext(AuthContext);

  console.log("User from AuthContext:", user);

  const {
    data: initialCartItems = [],
    error: cartError,
    isLoading: cartLoading,
  } = useCartItems({ user_id: user?.id, token: user?.token });

  const [cartItems, setCartItems] = useState([]);

  const filteredCartItems = useMemo(() => {
    if (initialCartItems?.length > 0) {
      return initialCartItems.filter((item) => item.user_id === user?.id);
    }
    return [];
  }, [initialCartItems, user]);

  useEffect(() => {
    setCartItems(filteredCartItems);
  }, [filteredCartItems]);

  const updateItemQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const recommendedProducts = [
    {
      id: 4,
      name: "Natural Lip Balm Set",
      price: 299,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics",
    },
    {
      id: 5,
      name: "Pet Bamboo Bowl",
      price: 599,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Pet Products",
    },
    {
      id: 6,
      name: "Eco Laundry Detergent",
      price: 449,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Household Essentials",
    },
    {
      id: 7,
      name: "Organic Face Mask",
      price: 399,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics",
    },
  ];

  const subtotal =
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) || 0;

  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping - discount;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "eco20") {
      setDiscount(subtotal * 0.2);
      setPromoSuccess("20% discount applied successfully!");
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError("Invalid promo code");
      setPromoSuccess("");
    }
  };

  if (!user) {
    return <div className="text-center py-16">Please log in to view your cart.</div>;
  }

  if (cartLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (cartError) {
    console.error("Error fetching cart items:", cartError);
    return <div className="text-center py-16">Error loading cart items</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div className="text-center py-16">No items in the cart</div>;
  }

  console.log("Filtered Cart Items:", cartItems); // Debugging log

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-600 bg-clip-text text-transparent">
            Your Shopping Cart
          </h1>
          <Link
            to="/allproducts"
            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-emerald-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Explore our eco-friendly products and find something you'll love!
            </p>
            <Link to="/allproducts">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                transition-all duration-300 shadow-md"
              >
                Browse Products
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex justify-between text-emerald-800 font-medium">
                  <span className="w-1/2 pl-28">Product</span>
                  <span className="w-1/6 text-center">Price</span>
                  <span className="w-1/6 text-center">Quantity</span>
                  <span className="w-1/6 text-right pr-12">Total</span>
                </div>

                <AnimatePresence>
                  {cartItems.length > 0 &&
                    cartItems.map((item) => (
                      <CartCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateItemQuantity}
                        token={user?.token}
                      />
                    ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold text-emerald-900 mb-6 pb-4 border-b border-emerald-100">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-emerald-800">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-800">
                    <span>Shipping</span>
                    <span>
                      {shipping > 0 ? `₱${shipping.toLocaleString()}` : "Free"}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Discount</span>
                      <span className="text-emerald-600">
                        -₱{discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Promo code section */}
                <div className="mb-6 pb-6 border-b border-emerald-100">
                  <label
                    htmlFor="promo"
                    className="block text-emerald-800 mb-2"
                  >
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 text-red-500 text-sm">{promoError}</p>
                  )}
                  {promoSuccess && (
                    <p className="mt-2 text-emerald-600 text-sm">
                      {promoSuccess}
                    </p>
                  )}
                  <p className="mt-2 text-emerald-600 text-xs">
                    Try code: ECO20 for 20% off
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-lg font-bold text-emerald-900">
                    <span>Total</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-emerald-600 text-sm mt-2">
                      You've qualified for free shipping!
                    </p>
                  )}
                  {shipping > 0 && (
                    <p className="text-emerald-600 text-sm mt-2">
                      Add ₱{(2000 - subtotal).toLocaleString()} more to get free
                      shipping
                    </p>
                  )}
                </div>

                <Link to="/checkout" state={{ cartItems }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                    rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                    transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-emerald-600 text-sm">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            Recommended For You
          </h2>
          <p className="text-emerald-600 mb-6">Based on your cart items</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* <div className="absolute top-2 right-2">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-white transition-colors">
                      <Heart size={18} />
                    </button>
                  </div> */}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-emerald-600 mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-emerald-900">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-emerald-700 font-medium">
                      ₱{product.price.toLocaleString()}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium
                    hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Cartpage);
