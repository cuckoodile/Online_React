import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "@/components/Card";
import Footer from "@/components/footer";
import Carousel from "@/components/Carousel";
import { useProducts } from "@/utils/hooks/useProductsHooks";

export default function Homepage() {
  const { data: products, error, isLoading } = useProducts();
  const newArrivals = products?.slice(0, 8) || [];

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error) return <div className="text-center">Error loading products</div>;

  console.log("New Arrivals:", newArrivals);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Carousel */}
      <Carousel/>

      {/* Brand Statement */}
      <div className="relative bg-gradient-to-b from-gray-100 to-white py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-light text-gray-800 mb-8 tracking-wider"
          >
            ELEGANCE IN EVERY THREAD
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-xl"
          >
            Curated collections that blend timeless elegance with contemporary
            trends. Our pieces are designed for those who appreciate quality
            craftsmanship and distinctive style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-8 mt-12"
          >
            {["QUALITY", "STYLE", "SUSTAINABILITY"].map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-emerald-600 font-medium text-lg">
                  {item}
                </span>
                {index < 2 && <span className="text-gray-400 mx-4">•</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          <Link
            to="/allproducts"
            className="text-gray-700 hover:text-gray-900 underline-offset-4 underline"
          >
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {newArrivals.length > 0 ? (
            newArrivals.map((product) => (
              <Card
                key={product.id}
                data={{
                  id: product.id,
                  name: product.name,
                  image: product.product_image,
                  price: product.price,
                }}
              />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              No new arrivals available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
