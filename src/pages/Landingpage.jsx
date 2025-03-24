import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiBook } from "react-icons/fi";
import { BsRocketTakeoff } from "react-icons/bs";
import { Routes, Route, Link } from "react-router-dom";
import Loginpage from "./Loginpage";

export default function Landingpage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[url('https://i.pinimg.com/736x/c1/57/c0/c157c0ee56bb4fd7171d9965c7dba5e6.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-emerald-950/70"></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Main content */}
      <motion.div
        className="h-screen flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1
              className="text-6xl mb-6 font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 
              text-transparent bg-clip-text drop-shadow-lg flex items-center justify-center gap-4"
            >
              <BsRocketTakeoff className="text-emerald-300" />
              Welcome to DevSix
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-2xl mb-8 text-emerald-200/90 leading-relaxed">
              Your journey starts here. Discover a new way to connect and grow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-6 justify-center"
          >
            <Link to="/login">
              <motion.button
                className="px-8 py-4 text-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl
              hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-900/30
              flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p>Get Started</p>
                <FiArrowRight className="text-2xl" />
              </motion.button>
            </Link>
            <Link to="/about" className="flex items-center gap-2">
              <motion.button
                className="px-8 py-4 text-xl bg-emerald-950/50 text-emerald-300 rounded-xl hover:bg-emerald-900/50
              transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBook className="text-2xl" />
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
