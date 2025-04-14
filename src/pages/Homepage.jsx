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

  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      title: "Sustainable Living Starts Here",
      description: "Discover our collection of eco-friendly products that make a difference.",
      buttonText: "Shop Now",
      bgColor: "bg-emerald-900",
      gradientFrom: "from-emerald-300",
      gradientVia: "via-emerald-200",
      gradientTo: "to-teal-200",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 2,
      title: "Eco-Friendly Pet Products",
      description: "Give your furry friends the natural care they deserve.",
      buttonText: "Explore Pet Items",
      bgColor: "bg-teal-900",
      gradientFrom: "from-teal-300",
      gradientVia: "via-teal-200",
      gradientTo: "to-emerald-200",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
    },
    {
      id: 3,
      title: "Natural Cosmetics",
      description: "Beauty products that are kind to your skin and the environment.",
      buttonText: "View Collection",
      bgColor: "bg-green-900",
      gradientFrom: "from-green-300",
      gradientVia: "via-emerald-200",
      gradientTo: "to-teal-200",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Variants for slide animations
  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0,
      scale: 0.95,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: -1000,
      opacity: 0,
      scale: 0.95,
    },
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section Carousel */}
      <div className="relative h-[500px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 200, damping: 25, mass: 1 },
              opacity: { duration: 0.7, ease: "easeInOut" },
              scale: { duration: 0.7, ease: "easeInOut" }
            }}
            className={`absolute inset-0 ${carouselSlides[currentSlide].bgColor}`}
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
        {/* <button 
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
        </button> */}

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
