import { useCategory } from "@/utils/hooks/useCategoriesHooks";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/utils/hooks/useProductsHooks";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, use, useRef } from "react";
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
import { useCookies } from "react-cookie";
export default function Controller() {
  const { user } = useContext(AuthContext);

  const [cookies] = useCookies();

  const { data: userData, error: userError, isLoading } = useUsers(user);
  const token = cookies.token;

  const formRef = useRef(null);

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
    category_id: "",
    product_image: [],
    specifications: [],
    admin_id: user?.id || null,
    stock: 1,
  });
  const [originalProductName, setOriginalProductName] = useState("");

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
        const categoryName = product.category?.name || "";
        const name = product.name || "";
        const description = product.description || "";
        const search = searchTerm.trim().toLowerCase();
        if (!search) return true;
        return (
          name.toLowerCase().includes(search) ||
          categoryName.toLowerCase().includes(search) ||
          description.toLowerCase().includes(search)
        );
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, productLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name.startsWith("specificationKey") ||
      name.startsWith("specificationValue")
    ) {
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
    if (e.target.files && e.target.files.length > 0) {
      let files = Array.from(e.target.files);
      files = files.slice(0, 4);
      let newFiles = files;
      let previews = files.map((file) => URL.createObjectURL(file));
      if (
        currentProduct.product_image &&
        Array.isArray(currentProduct.product_image)
      ) {
        const existingFiles = currentProduct.product_image.filter(
          (f) => !(f instanceof File)
        );
        newFiles = [...existingFiles, ...files].slice(0, 4);
        previews = newFiles.map((file) =>
          file instanceof File
            ? URL.createObjectURL(file)
            : typeof file === "string"
            ? `/path/to/images/${file}`
            : ""
        );
      }
      setCurrentProduct({
        ...currentProduct,
        product_image: newFiles,
        imagePreview: previews,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...currentProduct.product_image];
    updatedImages.splice(index, 1);
    const updatedPreviews = [...currentProduct.imagePreview];
    updatedPreviews.splice(index, 1);
    setCurrentProduct({
      ...currentProduct,
      // product_image: updatedImages,
      product_image: updatedPreviews,
      imagePreview: updatedPreviews,
    });
  };

  const addProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      admin_id: user.id || 1,
      name: "",
      description: "",
      price: 0,
      category_id: "", // Set to empty string for correct select handling
      specifications: [],
      product_image: [],
      stock: 1,
    });
    setIsModalOpen(true);
  };

  const updateProduct = useUpdateProduct();

  const editProduct = (product) => {
    setIsEditing(true);
    let mappedSpecifications = [];
    if (
      product.product_specifications &&
      product.product_specifications.length > 0
    ) {
      mappedSpecifications = product.product_specifications.flatMap((spec) => {
        if (!spec.details) return [];
        // If details is an array of objects
        if (Array.isArray(spec.details)) {
          return spec.details.flatMap((obj) => {
            if (obj && typeof obj === "object" && !Array.isArray(obj)) {
              return Object.entries(obj).map(([key, value]) => ({
                key,
                value,
              }));
            }
            return [];
          });
        }
        // If details is an object
        if (typeof spec.details === "object" && spec.details !== null) {
          return Object.entries(spec.details).map(([key, value]) => ({
            key,
            value,
          }));
        }
        // If details is a string, try to parse as JSON
        if (typeof spec.details === "string") {
          try {
            const parsed = JSON.parse(spec.details);
            if (Array.isArray(parsed)) {
              return parsed.flatMap((obj) => {
                if (obj && typeof obj === "object" && !Array.isArray(obj)) {
                  return Object.entries(obj).map(([key, value]) => ({
                    key,
                    value,
                  }));
                }
                return [];
              });
            }
            if (
              parsed &&
              typeof parsed === "object" &&
              !Array.isArray(parsed)
            ) {
              return Object.entries(parsed).map(([key, value]) => ({
                key,
                value,
              }));
            }
          } catch {
            return [{ key: "Details", value: spec.details }];
          }
        }
        return [];
      });
    }
    let productImages = [];
    if (Array.isArray(product.product_image)) {
      productImages = product.product_image;
    } else if (typeof product.product_image === "string") {
      try {
        productImages = JSON.parse(product.product_image);
      } catch {
        productImages = [];
      }
    }
    let imagePreview = [];
    if (productImages.length > 0) {
      imagePreview = productImages.map((img) => {
        if (typeof img === "string") {
          return img.startsWith("http") || img.startsWith("/")
            ? img
            : `/path/to/images/${img}`;
        }
        return "";
      });
    }
    setCurrentProduct({
      id: product.id,
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      category_id: product.category_id ? String(product.category_id) : "", // Always string
      product_image: productImages,
      specifications: mappedSpecifications,
      admin_id: product.admin_id || null,
      stock: product.stock || 1,
      imagePreview: imagePreview,
    });
    setOriginalProductName(product.name || "");
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
    console.log("Current Product", currentProduct);
    console.log("wewewewew", e.target);
    console.log("PRICEEEE", typeof currentProduct.price);
    currentProduct.price = parseFloat(currentProduct.price);
    console.log("CONVERTEEED PRIICEEEEE", typeof currentProduct.price);

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

    const formData = new FormData(formRef.current);

    let files = formRef.current.files;

    // for (let i = 0; i < files.length; i++) {
    //   formData.append("product_image[]", files[i]);

    //   console.log("Append image ", files[i]);
    // }

    console.log("Files ", files);

    if (!isEditing) {
      formData.append("name", currentProduct.name);
      formData.append("price", parseFloat(currentProduct.price));
      formData.append("description", currentProduct.description);
      formData.append("stock", currentProduct.stock);
      // Ensure category_id is sent as a string and not empty
      if (currentProduct.category_id && currentProduct.category_id !== "") {
        formData.append("category_id", String(currentProduct.category_id));
      }
      // // Append images one by one
      if (Array.isArray(currentProduct.product_image)) {
        currentProduct?.product_image.forEach((img, index) => {
            
            formData.append(`product_image[${index}]`, img);
        });
      }
    }
    if (isEditing) {
      formData.append("name", currentProduct.name);
      if (currentProduct.price)
        formData.append("price", parseFloat(currentProduct.price));
      if (currentProduct.description)
        formData.append("description", currentProduct.description);
      if (currentProduct.stock !== undefined && currentProduct.stock !== null)
        formData.append("stock", currentProduct.stock);
      if (currentProduct.category_id && currentProduct.category_id !== "") {
        formData.append("category_id", String(currentProduct.category_id));
      }
      
      if (Array.isArray(currentProduct.product_image)) {
        
        currentProduct.product_image.forEach((img, idx) => {
          if (typeof img === "string") {
            formData.append("product_image[]", img);
          } else if (img instanceof File) {
            formData.append("product_image[]", img);
          }
        });
      }
    }
    for (let pair of formData.entries()) {
      console.log("FORMDATA FINAL", pair[0] + ":", pair[1]);
    }

    // Only append new images (File objects) to product_image[]
    // if (Array.isArray(currentProduct.product_image)) {
    //   currentProduct.product_image.forEach((img) => {
    //     if (img instanceof File) {
    //       formData.append("product_image[]", img);
    //     }
    //     // Do NOT append if it's a string (URL/path)
    //   });
    // }

    // For product_specifications, append as array fields
    (currentProduct.specifications || []).forEach((spec, idx) => {
      if (spec.key && spec.value) {
        formData.append(
          `product_specifications[${idx}][details][${spec.key}]`,
          spec.value
        );
      }
    });

  

    if (isEditing) {
      if (!currentProduct.id) {
        alert("Error: Unable to update product. Product ID is missing.");
        return;
      }

      // CHECK FORMDATA CONTENT
      // {
      //   for (let pair of formData.entries()) {
      //     console.log(pair[0] + ":", pair[1]);
      //   }
      // }

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
            if (error?.response?.data?.errors) {
              alert(
                Object.values(error.response.data.errors).flat().join("\n")
              );
            } else {
              console.error("Error updating product:", error);
            }
          },
        }
      );
    } else {
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
            if (error?.response?.data?.errors) {
              alert(
                Object.values(error.response.data.errors).flat().join("\n")
              );
            } else {
              console.error("Error creating product:", error);
            }
          },
        }
      );
    }
    setIsModalOpen(false);
  };

  const saveSpecification = () => {
    setCurrentProduct({
      ...currentProduct,
      specifications: [
        ...currentProduct.specifications,
        { key: "", value: "" },
      ],
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

  console.log("Current Product:", currentProduct.id);
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
                            {(() => {
                              let imgSrc = "";
                              if (Array.isArray(product.product_image)) {
                                imgSrc = product.product_image[0];
                              } else if (
                                typeof product.product_image === "string"
                              ) {
                                try {
                                  const arr = JSON.parse(product.product_image);
                                  imgSrc = Array.isArray(arr)
                                    ? arr[0]
                                    : product.product_image;
                                } catch {
                                  imgSrc = product.product_image;
                                }
                              }
                              return (
                                <img
                                  src={imgSrc}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              );
                            })()}
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
                          {product.product_specifications &&
                          product.product_specifications.length > 0
                            ? product.product_specifications.map(
                                (spec, idx) => {
                                  const details = spec.details;
                                  if (!details) return null;
                                  // Helper to stringify nested objects
                                  const renderValue = (value) => {
                                    if (
                                      typeof value === "object" &&
                                      value !== null
                                    ) {
                                      return Object.entries(value)
                                        .map(
                                          ([k, v]) =>
                                            `${k}: ${
                                              Array.isArray(v) ||
                                              typeof v === "object"
                                                ? JSON.stringify(v)
                                                : v
                                            }`
                                        )
                                        .join(", ");
                                    }
                                    return value;
                                  };
                                  // If details is an array of objects
                                  if (Array.isArray(details)) {
                                    return details.map((obj, i) => {
                                      if (
                                        obj &&
                                        typeof obj === "object" &&
                                        !Array.isArray(obj)
                                      ) {
                                        return Object.entries(obj).map(
                                          ([key, value], j) => (
                                            <span
                                              key={`${idx}-arr-${i}-${j}`}
                                              className="text-sm text-emerald-900"
                                            >
                                              <strong>{key}:</strong>{" "}
                                              {renderValue(value)}
                                            </span>
                                          )
                                        );
                                      } else {
                                        return (
                                          <span
                                            key={`${idx}-arr-${i}`}
                                            className="text-sm text-emerald-900"
                                          >
                                            {String(obj)}
                                          </span>
                                        );
                                      }
                                    });
                                  }
                                  // If details is an object (Key: Value)
                                  if (
                                    typeof details === "object" &&
                                    details !== null
                                  ) {
                                    return Object.entries(details).map(
                                      ([key, value], i) => (
                                        <span
                                          key={idx + "-obj-" + i}
                                          className="text-sm text-emerald-900"
                                        >
                                          <strong>{key}:</strong>{" "}
                                          {renderValue(value)}
                                        </span>
                                      )
                                    );
                                  }
                                  // If details is a string, try to parse as JSON
                                  if (typeof details === "string") {
                                    try {
                                      const parsed = JSON.parse(details);
                                      if (Array.isArray(parsed)) {
                                        return parsed.map((obj, i) => {
                                          if (
                                            obj &&
                                            typeof obj === "object" &&
                                            !Array.isArray(obj)
                                          ) {
                                            return Object.entries(obj).map(
                                              ([key, value], j) => (
                                                <span
                                                  key={`${idx}-str-arr-${i}-${j}`}
                                                  className="text-sm text-emerald-900"
                                                >
                                                  <strong>{key}:</strong>{" "}
                                                  {renderValue(value)}
                                                </span>
                                              )
                                            );
                                          } else {
                                            return (
                                              <span
                                                key={`${idx}-str-arr-${i}`}
                                                className="text-sm text-emerald-900"
                                              >
                                                {String(obj)}
                                              </span>
                                            );
                                          }
                                        });
                                      }
                                      if (
                                        typeof parsed === "object" &&
                                        parsed !== null
                                      ) {
                                        return Object.entries(parsed).map(
                                          ([key, value], i) => (
                                            <span
                                              key={idx + "-str-obj-" + i}
                                              className="text-sm text-emerald-900"
                                            >
                                              <strong>{key}:</strong>{" "}
                                              {renderValue(value)}
                                            </span>
                                          )
                                        );
                                      }
                                    } catch {
                                      return (
                                        <span
                                          key={idx}
                                          className="text-sm text-emerald-900"
                                        >
                                          {details}
                                        </span>
                                      );
                                    }
                                  }
                                  // fallback for unexpected structure
                                  return null;
                                }
                              )
                            : null}
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

              <form onSubmit={saveProduct} ref={formRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Images File Selection Section */}
                  <div className="md:col-span-2">
                    <label className="block text-emerald-800 mb-2">
                      Product Images*
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="w-40 h-40 border-2 border-dashed border-emerald-300 rounded-lg overflow-hidden bg-emerald-50 flex items-center justify-center relative">
                        <FiUpload className="w-8 h-8 text-emerald-400" />
                        <input
                          type="file"
                          accept="image/*"
                          name="product_image"
                          multiple
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={
                            currentProduct.product_image &&
                            currentProduct.product_image.length >= 4
                          }
                        />
                      </div>
                      <div className="text-sm text-emerald-600">
                        <button
                          onClick={() =>
                            console.log(
                              "Image from currentProduct",
                              formRef.current.files
                            )
                          }
                          className="bg-red-600 text-white p-2"
                        >
                          hehehe
                        </button>
                        <p>Drag & drop images or click to browse (max 4)</p>
                        <p>Recommended: 800x1000px, max 2MB each</p>
                        <p className="mt-2 text-xs">
                          High-quality images increase sales!
                        </p>
                      </div>
                    </div>
                    {/* Thumbnails Preview */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {currentProduct.imagePreview &&
                        currentProduct.imagePreview.map((preview, idx) => (
                          <div
                            key={idx}
                            className="relative w-20 h-20 rounded overflow-hidden border border-emerald-200 bg-emerald-50"
                          >
                            <img
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-bl px-1 py-0.5 text-xs text-red-600 hover:bg-red-100"
                              style={{ lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
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
                    {isEditing &&
                      currentProduct.specifications &&
                      currentProduct.specifications.length > 0 && (
                        <div className="mb-4 p-2 bg-emerald-50 rounded">
                          <div className="font-semibold text-emerald-700 mb-1">
                            Existing Specifications:
                          </div>
                          <div className="flex flex-col gap-1">
                            {currentProduct.specifications.map((spec, idx) =>
                              spec.key && spec.value ? (
                                <span
                                  key={idx}
                                  className="text-sm text-emerald-900"
                                >
                                  <strong>{spec.key}:</strong>{" "}
                                  {typeof spec.value === "object" &&
                                  spec.value !== null
                                    ? Object.entries(spec.value)
                                        .map(
                                          ([k, v]) =>
                                            `${k}: ${
                                              Array.isArray(v) ||
                                              typeof v === "object"
                                                ? JSON.stringify(v)
                                                : v
                                            }`
                                        )
                                        .join(", ")
                                    : spec.value}
                                </span>
                              ) : null
                            )}
                          </div>
                        </div>
                      )}
                    {currentProduct.specifications?.map((spec, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
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
