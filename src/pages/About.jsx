import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiArrowLeft, FiShoppingCart, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

export default function About() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    console.log("Clicked!")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[url('https://i.pinimg.com/736x/c1/57/c0/c157c0ee56bb4fd7171d9965c7dba5e6.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay and background elements */}
      <div className="absolute inset-0 bg-emerald-950/70"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link to="/welcome">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 backdrop-blur-sm 
            text-emerald-200 rounded-lg border border-emerald-800/30 hover:bg-emerald-900/50 
            transition-all duration-300"
          >
            <FiArrowLeft className="text-xl" />
            <span>Join Us</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Shop Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 right-8 z-20"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 
            text-white rounded-lg hover:from-emerald-500 hover:to-teal-500 
            transition-all duration-300 shadow-lg shadow-emerald-900/30"
          >
            <FiShoppingCart className="text-xl" />
            <span>Go to Shop</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 
            text-transparent bg-clip-text drop-shadow-lg mb-6">
            About DevSix
          </h1>
          <p className="text-xl text-emerald-200/90 max-w-3xl mx-auto">
            We are dedicated to creating sustainable solutions for a better tomorrow, 
            connecting people with purpose, and fostering growth in our community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-emerald-950/50 backdrop-blur-sm p-8 rounded-xl border border-emerald-800/30"
          >
            <FiHeart className="text-4xl text-emerald-300 mb-4" />
            <h2 className="text-2xl font-bold text-emerald-200 mb-4">Who We Are</h2>
            <p className="text-emerald-200/80">
              DevSix is a forward-thinking platform that brings together innovators, 
              environmentalists, and community leaders to create lasting positive change 
              in our world.
            </p>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-emerald-950/50 backdrop-blur-sm p-8 rounded-xl border border-emerald-800/30"
          >
            <FiEye className="text-4xl text-emerald-300 mb-4" />
            <h2 className="text-2xl font-bold text-emerald-200 mb-4">Our Vision</h2>
            <p className="text-emerald-200/80">
              To be the leading platform for environmental innovation and sustainable 
              development, inspiring positive change and creating a greener future for 
              generations to come.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-emerald-950/50 backdrop-blur-sm p-8 rounded-xl border border-emerald-800/30"
          >
            <FiTarget className="text-4xl text-emerald-300 mb-4" />
            <h2 className="text-2xl font-bold text-emerald-200 mb-4">Our Mission</h2>
            <p className="text-emerald-200/80">
              To provide innovative solutions and resources that empower individuals 
              and organizations to make sustainable choices, while building a 
              community dedicated to environmental stewardship.
            </p>
          </motion.div>
        </div>

        {/* Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 
            text-transparent bg-clip-text drop-shadow-lg mb-8">
            Contact Us
          </h2>
          
          <div className="bg-emerald-950/50 backdrop-blur-sm p-8 rounded-xl border border-emerald-800/30">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-emerald-200 mb-2 text-sm">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-700 rounded-lg
                        focus:outline-none focus:border-emerald-500 text-emerald-100 placeholder:text-emerald-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-200 mb-2 text-sm">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-700 rounded-lg
                        focus:outline-none focus:border-emerald-500 text-emerald-100 placeholder:text-emerald-500"
                      placeholder="your@email.com"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-200 mb-2 text-sm">Message</label>
                  <textarea
                    className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-700 rounded-lg
                      focus:outline-none focus:border-emerald-500 text-emerald-100 placeholder:text-emerald-500
                      min-h-[120px]"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                    rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                    transition-all duration-300 shadow-md"
                >
                  Send Message
                </motion.button>
              </form>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-emerald-200 mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-emerald-200">
                    <FiMail className="w-5 h-5 mr-3" />
                    <div>
                      <p className="text-sm opacity-75">Email</p>
                      <p>contact@devsix.com</p>
                    </div>
                  </div>

                  <div className="flex items-center text-emerald-200">
                    <FiPhone className="w-5 h-5 mr-3" />
                    <div>
                      <p className="text-sm opacity-75">Phone</p>
                      <p>+63 (2) 8123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center text-emerald-200">
                    <FiMessageSquare className="w-5 h-5 mr-3" />
                    <div>
                      <p className="text-sm opacity-75">Customer Service</p>
                      <p>Available 24/7</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-emerald-900/50 rounded-lg border border-emerald-700">
                  <p className="text-emerald-200 text-sm">
                    Our team typically responds within 24 hours during business days. 
                    For immediate assistance, please contact our customer service hotline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
