import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Routes, Route, Link } from "react-router-dom";
import Loginpage from "./Loginpage";

export default function Landingpage() {
  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-white font-bold text-xl">DEV SIXTECH</div>
        <Link to="/login">
          <button className="bg-transparent border border-emerald-300 text-emerald-300 px-4 py-2 rounded-full hover:bg-emerald-900/30 transition-colors">
            Sign Up | Login
          </button>
        </Link>
      </nav>

      {/* Main content - now using flex-col-reverse for better mobile fit */}
      <div className="container mx-auto px-6 h-[calc(100vh-96px)] flex flex-col-reverse md:flex-row items-center justify-between relative z-10 gap-8">
        {/* Left side - Text content */}
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 text-transparent bg-clip-text leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Elevate Your<br />
            Fashion<br />
            Statement
          </motion.h1>
          
          <motion.p 
            className="text-emerald-200 text-lg md:text-xl mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our curated collection of sustainable fashion pieces designed to elevate your style while respecting our planet.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4"
          >
            <Link to="/">
              <motion.button
                className="px-6 py-3 text-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl
                hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-900/30
                flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop
                <FiShoppingBag className="text-lg" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                className="px-6 py-3 text-lg bg-transparent border-2 border-emerald-400 text-emerald-200 rounded-xl
                hover:bg-emerald-900/30 hover:border-emerald-300 hover:text-white transition-all duration-300 
                flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
                <FiArrowRight className="text-lg" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Right side - Image */}
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0 flex justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative perspective-1000 w-full max-w-2xl">
            <motion.div
              initial={{ rotateY: 10, rotateX: 10 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="relative z-20"
            >
              <img 
                src="https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg" 
                alt="Fashion Collection" 
                className="w-full h-auto rounded-xl shadow-2xl max-h-[75vh] object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl -z-10 transform scale-105"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
