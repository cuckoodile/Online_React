import React, { useState, useEffect } from "react";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@/components/Card";
import Footer from "@/components/footer";
import { useProducts } from "../utils/hooks/useProductsHooks";
import { useCategory } from "../utils/hooks/useCategoriesHooks";

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₱300", value: "0-300" },
  { label: "₱300 - ₱500", value: "300-500" },
  { label: "₱500 - ₱1000", value: "500-1000" },
  { label: "Over ₱1000", value: "1000+" },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

export default function Allproducts() {
  const {
    data: products,
    error: productsError,
    isLoading: productLoading,
  } = useProducts();
  
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategory();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  // Get search term from query param
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    if (products) {
      setFilteredProducts(filterAndSortProducts());
    }
  }, [products, selectedCategory, priceRange, sortBy, searchTerm]);

  const filterAndSortProducts = () => {
    let result = products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category.name === selectedCategory;

      let priceMatch = true;
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          priceMatch = product.price >= min && product.price <= max;
        } else {
          priceMatch = product.price >= min;
        }
      }

      // Search filter: match name, category, or description
      let searchMatch = true;
      if (searchTerm) {
        const name = product.name?.toLowerCase() || "";
        const category = product.category?.name?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";
        searchMatch =
          name.includes(searchTerm) ||
          category.includes(searchTerm) ||
          description.includes(searchTerm);
      }

      return categoryMatch && priceMatch && searchMatch;
    });

    // Sort the filtered products
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  };

  if (categoriesLoading || productLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }
  if (categoriesError) {
    return <div className="text-center py-16">Error loading categories</div>;
  }
  if (productsError) {
    return <div className="text-center py-16">Error loading products</div>;
  }

  console.log("Category", categories);
  console.log("Products:", products);
  if (!productLoading && !categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero banner */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-800 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-emerald-100 via-white to-emerald-100 text-transparent bg-clip-text">
              COLLECTION
            </h1>
            <div className="w-24 h-0.5 bg-emerald-400 mx-auto mb-6"></div>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Explore our curated selection of premium sustainable fashion
              pieces designed for the eco-conscious individual.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filter and sort controls */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiFilter />
                Filters
                {showFilters ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <div className="mb-4">
                      <h3 className="font-medium mb-3 text-gray-700">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setSelectedCategory("All")}>
                          All
                        </button>
                        {categories.map((category) => (
                          // console.log("CATEEGORIIES", category)
                          // <p>{category.name}</p>
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 text-black py-2 rounded-lg text-sm font-medium transition-colors
                            ${
                              selectedCategory === category.name
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-medium mb-3 text-gray-700">
                        Price Range
                      </h3>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full md:w-auto"
                      >
                        {priceRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 text-gray-700">
                        Sort By
                      </h3>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full md:w-auto"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-500">
              Showing {filteredProducts.length} products
            </p>
          </div>

          {/* Product grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                // Safely parse product_image
                let images = [];
                if (Array.isArray(product.product_image)) {
                  images = product.product_image;
                } else if (typeof product.product_image === "string") {
                  try {
                    images = JSON.parse(product.product_image);
                  } catch (e) {
                    images = [];
                  }
                }
                return (
                  <Card
                    key={product.id}
                    data={{
                      id: product.id,
                      name: product.name,
                      image: images[0],
                      price: product.price,
                    }}
                  />
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
