import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";


export default function Carousel() {
    const carouselSlides = [
        {
          id: 1,
          title: "Elevate Your Style",
          description:
            "Discover our latest collection of premium fashion pieces for every occasion.",
          buttonText: "Shop Now",
          bgColor: "bg-gray-900",
          gradientFrom: "from-rose-300",
          gradientVia: "via-pink-200",
          gradientTo: "to-purple-200",
          image:
            "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg",
        },
        {
          id: 2,
          title: "Accessories That Impress",
          description:
            "Complete your look with our stunning collection of designer accessories.",
          buttonText: "Explore Accessories",
          bgColor: "bg-teal-900",
          gradientFrom: "from-teal-300",
          gradientVia: "via-teal-200",
          gradientTo: "to-emerald-200",
          image:
            "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg",
        },
        {
          id: 3,
          title: "Seasonal Collections",
          description:
            "Stay ahead of trends with our curated seasonal fashion collections.",
          buttonText: "View Collection",
          bgColor: "bg-green-900",
          gradientFrom: "from-green-300",
          gradientVia: "via-emerald-200",
          gradientTo: "to-teal-200",
          image:
            "https://i.pinimg.com/736x/5d/98/4a/5d984a008b2e95bdc05d47ab49bb467c.jpg",
        },
      ];
    
      const [currentSlide, setCurrentSlide] = useState(0);
      const [direction, setDirection] = useState(1);
    
      // Auto slide effect
      useEffect(() => {
        const interval = setInterval(() => {
          setDirection(1);
          setCurrentSlide((prev) =>
            prev === carouselSlides.length - 1 ? 0 : prev + 1
          );
        }, 5000);
        return () => clearInterval(interval);
      }, []);
    
      const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) =>
          prev === carouselSlides.length - 1 ? 0 : prev + 1
        );
      };
    
      const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) =>
          prev === 0 ? carouselSlides.length - 1 : prev - 1
        );
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
          zIndex: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          zIndex: 1,
        },
        exit: (direction) => ({
          x: direction > 0 ? -1000 : 1000,
          opacity: 0,
          rotateY: direction > 0 ? -90 : 90,
          scale: 0.8,
          zIndex: 0,
        }),
      };
  return (
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
              scale: { duration: 0.7 },
            }}
            className={`absolute inset-0 ${carouselSlides[currentSlide].bgColor}`}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
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
  )
}