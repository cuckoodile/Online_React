import { useCategory } from "@/utils/hooks/useCategoriesHooks";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/utils/hooks/useProductsHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
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
  const queryClient = useQueryClient();

  // Product state
  const {
    data: products,
    error: productsError,
    isLoading: productLoading,
  } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    category_id: "",
    product_image: null,
    additional_images: [],
    specifications: [],
    stock: "",
    imagePreview: null,
    newSpecification: "",
  });

  // Categories
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategory();

  // Mutations for CRUD operations
  const createProductMutation = useMutation({
    mutationFn: useCreateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      alert("Failed to create product: " + error.message);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }) => useUpdateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      alert("Failed to update product: " + error.message);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: useDeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      alert("Failed to delete product: " + error.message);
    },
  });

  // Filter products based on search term
  useEffect(() => {
    if (!productLoading && products) {
      const results = products.filter((product) =>
        [product.name, product.category?.name]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, productLoading]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle main image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentProduct((prev) => ({
        ...prev,
        product_image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Handle additional images upload
  const handleAdditionalImagesChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      const updatedImages = [...currentProduct.additional_images, ...newImages].slice(0, 10);
      setCurrentProduct((prev) => ({
        ...prev,
        additional_images: updatedImages,
      }));
    }
  };

  // Remove an additional image
  const removeAdditionalImage = (index) => {
    const updatedImages = [...currentProduct.additional_images];
    updatedImages.splice(index, 1);
    setCurrentProduct((prev) => ({
      ...prev,
      additional_images: updatedImages,
    }));
  };

  // Open modal for adding new product
  const addProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: null,
      name: "",
      description: "",
      price: "",
      category_id: "",
      product_image: null,
      additional_images: [],
      specifications: [],
      stock: "",
      imagePreview: null,
      newSpecification: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing product
  const editProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      id: product.id,
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category_id: product.category_id || "",
      product_image: null,
      additional_images: product.additional_images?.map((img) => ({
        file: null,
        preview: img.url,
      })) || [],
      specifications: product.specifications || [],
      stock: product.stock || "",
      imagePreview: product.product_image || null,
      newSpecification: "",
    });
    setIsModalOpen(true);
  };

  // Save product (create or update)
  const saveProduct = (e) => {
    e.preventDefault();
    if (
      !currentProduct.name ||
      !currentProduct.price ||
      !currentProduct.category_id ||
      !currentProduct.stock ||
      (!isEditing && !currentProduct.product_image) ||
      currentProduct.additional_images.length < 4
    ) {
      alert("Please fill in all required fields and add at least 4 additional images.");
      return;
    }
    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("description", currentProduct.description || "");
    formData.append("price", currentProduct.price);
    formData.append("category_id", currentProduct.category_id);
    formData.append("stock", currentProduct.stock);
    if (currentProduct.product_image) {
      formData.append("product_image", currentProduct.product_image);
    }
    currentProduct.specifications.forEach((spec, index) => {
      formData.append(`specifications[${index}]`, spec);
    });
    currentProduct.additional_images.forEach((img, index) => {
      if (img.file) {
        formData.append(`additional_images[${index}]`, img.file);
      }
    });
    if (isEditing) {
      updateProductMutation.mutate({ id: currentProduct.id, data: formData });
    } else {
      createProductMutation.mutate(formData);
    }
  };

  // Delete product
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };

  // Save new specification
  const saveSpecification = () => {
    if (currentProduct.newSpecification.trim()) {
      setCurrentProduct((prev) => ({
        ...prev,
        specifications: [...prev.specifications, prev.newSpecification.trim()],
        newSpecification: "",
      }));
      setIsAddingSpec(false);
    }
  };

  // Loading and error states
  if (productLoading || categoriesLoading) {
    return <div className="text-center py-16 text-emerald-700">Loading...</div>;
  }
  if (productsError || categoriesError) {
    return <div className="text-center py-16 text-red-600">Error loading data</div>;
  }

  return (
    <div className="min-h-screen bg-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <h1 className="text-3xl font-semibold text-emerald-900">Product Management</h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  className="w-full pl-10 pr-12 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
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
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2"
              >
                <FiPlus />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-200">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-700 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-700 uppercase tracking-wider">
                    Specifications
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-emerald-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-emerald-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-14 w-14 rounded-md overflow-hidden bg-emerald-100 flex-shrink-0">
                            <img
                              src={product.product_image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-emerald-900">{product.name}</div>
                            <div className="text-sm text-emerald-600 line-clamp-2">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                          {product.category?.name || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {product.specifications?.map((spec, index) => (
                            <span key={index} className="text-sm text-emerald-900">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-900">
                        ₱{Number(product.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-900">{product.stock}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => editProduct(product)}
                          className="text-emerald-600 hover:text-emerald-900 mr-4 transition-colors duration-200"
                        >
                          <FiEdit2 className="inline" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          <FiTrash2 className="inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-emerald-600 text-sm"
                    >
                      No items found. Try a different search or add a new item.
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
        <div className="fixed inset-0 bg-emerald-950 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform scale-95 animate-modal-open">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-emerald-900">
                  {isEditing ? "Edit Fashion Item" : "Add New Fashion Item"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={saveProduct}>
                <div className="space-y-6">
                  {/* Main Product Image */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Main Product Image <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="w-32 h-32 border-2 border-dashed border-emerald-300 rounded-lg overflow-hidden bg-emerald-50 flex items-center justify-center relative">
                        {currentProduct.imagePreview ? (
                          <img
                            src={currentProduct.imagePreview}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUpload className="w-6 h-6 text-emerald-400" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="text-xs text-emerald-600">
                        <p>Drag & drop or click to browse</p>
                        <p>Recommended: 800x1000px, max 2MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Product Images */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Additional Product Images <span className="text-red-500">*</span> (Min: 4, Max: 10)
                    </label>
                    <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 bg-emerald-50 flex items-center justify-center relative">
                      <div className="text-center">
                        <FiUpload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <p className="text-sm text-emerald-600">Upload multiple images</p>
                        <p className="text-xs text-emerald-500 mt-1">Click to browse or drag & drop</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    {currentProduct.additional_images.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                        {currentProduct.additional_images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img.preview}
                              alt={`Additional image ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border border-emerald-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <FiX className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between mt-3 text-sm">
                      <p className="text-emerald-600">
                        {currentProduct.additional_images.length}/10 images uploaded
                      </p>
                      {currentProduct.additional_images.length < 4 && (
                        <p className="text-red-500">
                          Add at least {4 - currentProduct.additional_images.length} more images
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Price and Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-800 mb-2">
                        Price (₱) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={currentProduct.price}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-800 mb-2">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category_id"
                      value={currentProduct.category_id}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={currentProduct.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                    />
                  </div>

                  {/* Specifications */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      Specifications
                    </label>
                    <div className="space-y-3">
                      {currentProduct.specifications.map((spec, index) => (
                        <div key={index} className="flex items-center">
                          <span className="flex-grow p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-sm text-emerald-900">
                            {spec}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSpecs = [...currentProduct.specifications];
                              updatedSpecs.splice(index, 1);
                              setCurrentProduct((prev) => ({
                                ...prev,
                                specifications: updatedSpecs,
                              }));
                            }}
                            className="ml-3 text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {isAddingSpec ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            name="newSpecification"
                            value={currentProduct.newSpecification}
                            onChange={handleInputChange}
                            className="flex-grow p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                            placeholder="Enter specification"
                          />
                          <button
                            type="button"
                            onClick={saveSpecification}
                            className="p-2 text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
                          >
                            <FiSave className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddingSpec(false)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddingSpec(true)}
                          className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors duration-200 text-sm"
                        >
                          <FiPlus className="mr-1 w-4 h-4" /> Add Specification
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200"
                  >
                    {isEditing ? "Update Product" : "Add Product"}
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