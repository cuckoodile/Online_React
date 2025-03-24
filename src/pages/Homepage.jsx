import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "@/components/Card";

export default function Homepage() {
  // Mock data for new arrivals
  const newArrivals = [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 399,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Household Essentials",
    },
    {
      id: 2,
      name: "Natural Clay Face Mask",
      price: 799,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics",
    },
    {
      id: 3,
      name: "Eco Pet Toy Bundle",
      price: 649,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Pet Products",
    },
    {
      id: 4,
      name: "Organic Bath Bombs",
      price: 499,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics",
    },
    {
      id: 5,
      name: "Biodegradable Pet Wipes",
      price: 299,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Pet Products",
    },
    {
      id: 6,
      name: "Zero Waste Cleaning Kit",
      price: 899,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Household Essentials",
    },
    {
      id: 7,
      name: "Natural Pet Shampoo",
      price: 449,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Pet Products",
    },
    {
      id: 8,
      name: "Organic Face Serum",
      price: 1299,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Cosmetics",
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section */}
      <div className="relative bg-emerald-900 h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1
              className="text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 
              text-transparent bg-clip-text mb-6"
            >
              Sustainable Living Starts Here
            </h1>
            <p className="text-emerald-100 text-xl mb-8">
              Discover our collection of eco-friendly products that make a
              difference.
            </p>
            <Link to={"/allproducts"}>
              <motion.button
                className="px-8 py-4 text-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl
              hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-900/30
              flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
                <FiShoppingCart />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-emerald-900 mb-8">
          New Arrivals
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
