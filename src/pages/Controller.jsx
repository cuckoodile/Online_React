import { useCategory } from "@/utils/hooks/useCategoriesHooks";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/utils/hooks/useProductsHooks";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, use } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiUpload,
  FiSave,
} from "react-icons/fi";

export default function Controller() {
  // Product state
  const {
    data: products,
    error: productsError,
    isLoading: productLoading,
  } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: null,
    description: null,
    price: null,
    category: null,
    stock: null,
    size: null,
    image: null,
  });

  // Categories for fashion products
  // const categories = [
  //   "Tops",
  //   "Bottoms",
  //   "Dresses",
  //   "Outerwear",
  //   "Footwear",
  //   "Accessories",
  //   "Activewear",
  //   "Swimwear",
  // ];
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategory();

  // Available colors
  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
    "Multicolor",
  ];
  // Filter products based on search term
  useEffect(() => {
    if (!productLoading && products) {
      const results = products.filter((product) => {
        console.log("fitered product:", product);
        const categoryName = product.category?.name || "All";
        return product.name || categoryName;
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, productLoading]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentProduct({
        ...currentProduct,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Open modal for adding new product
  const addProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: null,
      user_id: 1,
      name: null,
      description: null,
      price: null,
      category_id: null,
      stock: 10,
      product_image: null,
    });
    setIsModalOpen(true);
    useCreateProduct(currentProduct);
  };

  // Open modal for editing product
  const editProduct = async (product) => {
    setIsEditing(true);
    useUpdateProduct(product.id, currentProduct).then((data) => {
      console.log("Product updated:", data);
      setIsModalOpen(true);
    });
  };

  // Delete product
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      useDeleteProduct(id);
    }
  };

  // Save product (create or update)
  const saveProduct = (e) => {
    e.preventDefault();

    // Form validation
    if (
      !currentProduct.name ||
      !currentProduct.price ||
      !currentProduct.category ||
      !currentProduct.size
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditing) {
      // Update existing product
      useUpdateProduct(products.id, currentProduct);
    } else {
      // Create new product
      useCreateProduct(currentProduct);
    }

    setIsModalOpen(false);
  };

  if (productLoading || categoriesLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }
  if (productsError) {
    return <div className="text-center py-16">Error loading products</div>;
  }
  if (categoriesError) {
    return <div className="text-center py-16">Error loading categories</div>;
  }

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-emerald-900 mb-4 md:mb-0">
              Product Management
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by name, category, color..."
                  className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX />
                  </button>
                )}
              </div>

              <button
                onClick={addProduct}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiPlus />
                Add Product
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-200">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Specifications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-100">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <>
                      {console.log("Product: ", product)}
                      <tr 
                        key={product.id}
                        className="hover:bg-emerald-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 rounded-md overflow-hidden bg-emerald-100 flex-shrink-0">
                              <img
                                src={product.product_image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-emerald-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-emerald-600 truncate max-w-xs">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                            {product.category.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm text-emerald-900">
                              Size: {product.specification}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-900">
                          ₱{product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-900">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => editProduct(product)}
                            className="text-emerald-600 hover:text-emerald-900 mr-4"
                          >
                            <FiEdit2 className="inline" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="inline" />
                          </button>
                        </td>
                      </tr>
                      {/* <p className="text-black">product: {product.name}</p>
                      <p className="text-black">category: {product.category.name}</p> */}

                    </>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-emerald-600"
                    >
                      No item/s found. Try a different search or add a new item.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-emerald-950 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-emerald-900">
                  {isEditing ? "Edit Fashion Item" : "Add New Fashion Item"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={saveProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-emerald-800 mb-2">
                      Product Image
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="w-40 h-40 border-2 border-dashed border-emerald-300 rounded-lg overflow-hidden bg-emerald-50 flex items-center justify-center relative">
                        {currentProduct.imagePreview ? (
                          <img
                            src={currentProduct.imagePreview}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUpload className="w-8 h-8 text-emerald-400" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="text-sm text-emerald-600">
                        <p>Drag & drop an image or click to browse</p>
                        <p>Recommended: 800x1000px, max 2MB</p>
                        <p className="mt-2 text-xs">
                          High-quality images increase sales!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-emerald-800 mb-2">
                      Product Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-emerald-800 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={currentProduct.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Describe fabric, fit, style, and sustainability features..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">
                      Price (₱)*
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={currentProduct.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">
                      Stock Quantity*
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={currentProduct.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">
                      Category*
                    </label>
                    <select
                      name="category"
                      value={currentProduct.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.length > 0 &&
                        categories.map((category) =>
                          // <option key={category} value={category}>
                          //   {category}
                          // </option>
                          console.log(category)
                        )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">
                      Color*
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <FiSave />
                    {isEditing ? "Update Item" : "Save Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
