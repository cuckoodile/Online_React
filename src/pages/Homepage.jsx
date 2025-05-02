import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiHeart, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "@/components/Card";
import Footer from "@/components/footer";

export default function Homepage() {
  // Mock data for new arrivals
  const newArrivals = [
    {
      id: 1,
      name: "Premium Denim Jacket",
      price: 1299,
      image:
        "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg",
      category: "Outerwear",
    },
    {
      id: 2,
      name: "Silk Scarf Collection",
      price: 799,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Accessories",
    },
    {
      id: 3,
      name: "Designer Sunglasses",
      price: 1499,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 2499,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Bags",
    },
    {
      id: 5,
      name: "Cotton Graphic Tee",
      price: 599,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Tops",
    },
    {
      id: 6,
      name: "High-Waisted Jeans",
      price: 1099,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Bottoms",
    },
    {
      id: 7,
      name: "Cashmere Sweater",
      price: 1899,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Tops",
    },
    {
      id: 8,
      name: "Leather Ankle Boots",
      price: 2799,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      category: "Footwear",
    },
  ];

  // Featured collections section
  const collections = [
    {
      id: 1,
      title: "Summer Essentials",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/collection/summer"
    },
    {
      id: 2,
      title: "Formal Wear",
      image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/collection/formal"
    },
    {
      id: 3,
      title: "Accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/collection/accessories"
    }
  ];

  // Carousel slides data with fashion-specific images
  const carouselSlides = [
    {
      id: 1,
      title: "Elevate Your Style",
      description: "Discover our latest collection of premium fashion pieces for every occasion.",
      buttonText: "Shop Now",
      bgColor: "bg-gray-900",
      gradientFrom: "from-rose-300",
      gradientVia: "via-pink-200",
      gradientTo: "to-purple-200",
      image: "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg"
    },
    {
      id: 2,
      title: "Accessories That Impress",
      description: "Complete your look with our stunning collection of designer accessories.",
      buttonText: "Explore Accessories",
      bgColor: "bg-teal-900",
      gradientFrom: "from-teal-300",
      gradientVia: "via-teal-200",
      gradientTo: "to-emerald-200",
      image: "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg"
    },
    {
      id: 3,
      title: "Seasonal Collections",
      description: "Stay ahead of trends with our curated seasonal fashion collections.",
      buttonText: "View Collection",
      bgColor: "bg-green-900",
      gradientFrom: "from-green-300",
      gradientVia: "via-emerald-200",
      gradientTo: "to-teal-200",
      image: "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  
  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };
  
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };
  
  // 3D slot effect variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 90 : -90,
      scale: 0.8,
      zIndex: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      rotateY: direction > 0 ? -90 : 90,
      scale: 0.8,
      zIndex: 0
    })
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.7 },
              rotateY: { duration: 0.7 },
              scale: { duration: 0.7 }
            }}
            className={`absolute inset-0 ${carouselSlides[currentSlide].bgColor}`}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                src={carouselSlides[currentSlide].image} 
                alt={`Slide ${currentSlide + 1} background`}
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            
            {/* Overlay and effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-10"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-10"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl z-10"></div>

            <div className="relative container mx-auto px-4 h-full flex items-center z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl"
              >
                <h1
                  className={`text-5xl font-bold bg-gradient-to-r ${carouselSlides[currentSlide].gradientFrom} ${carouselSlides[currentSlide].gradientVia} ${carouselSlides[currentSlide].gradientTo} 
                  text-transparent bg-clip-text mb-6`}
                >
                  {carouselSlides[currentSlide].title}
                </h1>
                <p className="text-emerald-100 text-xl mb-8">
                  {carouselSlides[currentSlide].description}
                </p>
                <Link to={"/allproducts"}>
                  <motion.button
                    className="px-8 py-4 text-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl
                  hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-900/30
                  flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {carouselSlides[currentSlide].buttonText}
                    <FiShoppingCart />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 z-30"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 z-30"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-white w-8" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

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
            Curated collections that blend timeless elegance with contemporary trends.
            Our pieces are designed for those who appreciate quality craftsmanship and distinctive style.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-8 mt-12"
          >
            {['QUALITY', 'STYLE', 'SUSTAINABILITY'].map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-emerald-600 font-medium text-lg">{item}</span>
                {index < 2 && <span className="text-gray-400 mx-4">•</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            New Arrivals
          </h2>
          <Link to="/allproducts" className="text-gray-700 hover:text-gray-900 underline-offset-4 underline">
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
