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
import { useContext } from "react";
import { AuthContext } from "@/utils/contexts/AuthContext";
import { useUsers } from "@/utils/hooks/userUsersHooks";
export default function Controller() {
  const { user } = useContext(AuthContext);
  const {
    data: userData,
    error: userError,
    isLoading,
  } = useUsers(user);
  const token = user?.token;

  // Product state
  const {
    data: products,
    error: productsError,
    isLoading: productLoading,
  } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: 0,
    category_id: 0,
    product_image: [],
    specifications: [],
    admin_id: user?.id || null,
    stock: 1,
  });
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategory();
  
  const createProduct = useCreateProduct();
  const deleteProductMutation = useDeleteProduct();

  useEffect(() => {
    if (!productLoading && products) {
      const results = products.filter((product) => {
        console.log("fitered product:", product);
        const categoryName = product.category?.name || "All";
        return product.name || categoryName ;
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, productLoading]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("specificationKey") || name.startsWith("specificationValue")) {
      const updatedSpecifications = [...currentProduct.specifications];
      const index = parseInt(name.replace(/\D/g, ""), 10);
      if (name.startsWith("specificationKey")) {
        updatedSpecifications[index] = {
          ...updatedSpecifications[index],
          key: value,
        };
      } else {
        updatedSpecifications[index] = {
          ...updatedSpecifications[index],
          value: value,
        };
      }
      setCurrentProduct({
        ...currentProduct,
        specifications: updatedSpecifications,
      });
    } else {
      setCurrentProduct({
        ...currentProduct,
        [name]: value,
      });
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setCurrentProduct({
        ...currentProduct,
        product_image: files,
        imagePreview: URL.createObjectURL(files[0]),
      });
    }
  };
  const addProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      admin_id: userData?.data?.[0]?.id || null,
      name: "",
      description: "",
      price: 0,
      category_id: 0,
      specifications: [],
      product_image: [],
      stock: 1,
    });
    setIsModalOpen(true);
  };
  const updateProduct = useUpdateProduct();
  const editProduct = (product) => {
    setIsEditing(true);
    const mappedSpecifications = product.product_specifications?.map((spec) => {
      const details = JSON.parse(spec.details || "{}");
      return Object.entries(details).map(([key, value]) => ({ key, value }));
    }).flat() || [];
    let productImages = [];
    try {
      productImages = JSON.parse(product.product_image);
    } catch {
      productImages = [];
    }
    setCurrentProduct({
      id: product.id,
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      category_id: product.category_id || 0,
      product_image: productImages,
      specifications: mappedSpecifications,
      admin_id: product.admin_id || null,
      stock: product.stock || 1,
      imagePreview: productImages[0] ? (typeof productImages[0] === "string" ? `/path/to/images/${productImages[0]}` : "") : "",
    });
    setIsModalOpen(true);
  };
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate({
        id: id,
        token: token,
      });
    }
  };

  const saveProduct = (e) => {
    e.preventDefault();
    console.log("Attempting to save product:", currentProduct);
    if (
      !currentProduct.name ||
      !currentProduct.price ||
      !currentProduct.category_id ||
      !currentProduct.specifications ||
      !currentProduct.product_image.length
    ) {
      alert("Please fill in all required fields");
      return;
    }
    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }
    const categoryIdInt = parseInt(currentProduct.category_id, 10);
    const validSpecs = currentProduct.specifications.filter(
      (spec) => spec.key && spec.value
    );
    if (validSpecs.length < 2) {
      alert("Please provide at least 2 specifications.");
      return;
    }
    const formData = new FormData();
    formData.append('name', currentProduct.name);
    formData.append('price', currentProduct.price);
    formData.append('description', currentProduct.description);
    formData.append('stock', currentProduct.stock);
    formData.append('category_id', categoryIdInt);
    const hasNewImages = currentProduct.product_image.some((file) => file instanceof File);
    if (!isEditing || hasNewImages) {
      currentProduct.product_image.forEach((file) => {
        if (file instanceof File) {
          formData.append('product_image[]', file);
        }
      });
    }
    if (!isEditing || (validSpecs.length >= 2 && validSpecs.some(spec => spec.key && spec.value))) {
      validSpecs.forEach((spec, i) => {
        formData.append(`product_specifications[${i}][details][${spec.key}]`, spec.value);
      });
    }
    if (isEditing) {
      if (!currentProduct.id) {
        console.error("Error: Product ID is undefined.");
        alert("Error: Unable to update product. Product ID is missing.");
        return;
      }

      if (!token) {
        console.error("Error: Authorization token is missing.");
        alert("Unauthorized: Please log in again.");
        return;
      }

      updateProduct.mutate(
        {
          id: currentProduct.id,
          data: formData,
          token: token,
        },
        {
          onSuccess: (data) => {
            console.log("Product updated successfully:", data);
          },
          onError: (error) => {
            console.error("Error updating product:", error);
          },
        }
      );
    } else {
      if (!token) {
        console.error("Error: Authorization token is missing.");
        alert("Unauthorized: Please log in again.");
        return;
      }

      createProduct.mutate(
        {
          data: formData,
          token: token,
        },
        {
          onSuccess: (data) => {
            console.log("Product created successfully:", data);
          },
          onError: (error) => {
            console.error("Error creating product:", error);
          },
        }
      );
    }

    setIsModalOpen(false);
  };

  const saveSpecification = () => {
    setCurrentProduct({
      ...currentProduct,
      specifications: [...currentProduct.specifications, { key: "", value: "" }],
    });
    setIsAddingSpec(true);
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-100">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
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
                          {product.product_specifications[0]?.details &&
                            Object.entries(JSON.parse(product.product_specifications[0].details)).map(
                              ([key, value], index) => (
                                <span key={index} className="text-sm text-emerald-900">
                                  <strong>{key}:</strong> {value}
                                </span>
                              )
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-900">
                        ₱{product.price.toLocaleString()}
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

                  <div className="md:col-span-2 col">
                    <label className="block text-emerald-800 mb-2">
                      Specifications
                    </label>

                    {currentProduct.specifications?.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          name={`specificationKey_${index}`}
                          value={spec.key || ""}
                          onChange={handleInputChange}
                          placeholder="Key"
                          className="w-1/2 p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="text"
                          name={`specificationValue_${index}`}
                          value={spec.value || ""}
                          onChange={handleInputChange}
                          placeholder="Value"
                          className="w-1/2 p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    ))}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        saveSpecification();
                      }}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      Add Specification
                    </button>
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
                      Category*
                    </label>
                    <select
                      name="category_id"
                      value={currentProduct.category_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.length > 0 &&
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
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
