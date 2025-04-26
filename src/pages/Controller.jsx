import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiUpload, FiSave } from 'react-icons/fi';

export default function Controller() {
  // Product state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    size: '',
    color: '',
    image: null,
    imagePreview: null
  });

  // Categories for fashion products
  const categories = [
    'Tops', 
    'Bottoms', 
    'Dresses', 
    'Outerwear', 
    'Footwear', 
    'Accessories',
    'Activewear',
    'Swimwear'
  ];
  
  // Available sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  
  // Available colors
  const colors = [
    'Black', 'White', 'Red', 'Blue', 'Green', 
    'Yellow', 'Purple', 'Pink', 'Brown', 'Gray', 'Multicolor'
  ];

  // Mock data - replace with API calls in production
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Organic Cotton T-Shirt",
        description: "Sustainable and eco-friendly cotton t-shirt with minimalist design.",
        price: 899,
        category: "Tops",
        stock: 45,
        size: "M",
        color: "White",
        image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
      },
      {
        id: 2,
        name: "Recycled Denim Jeans",
        description: "High-waisted jeans made from recycled denim materials.",
        price: 1499,
        category: "Bottoms",
        stock: 32,
        size: "L",
        color: "Blue",
        image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
      },
      {
        id: 3,
        name: "Bamboo Fiber Dress",
        description: "Elegant midi dress made from sustainable bamboo fiber.",
        price: 1899,
        category: "Dresses",
        stock: 18,
        size: "S",
        color: "Green",
        image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
      }
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentProduct({
        ...currentProduct,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  // Open modal for adding new product
  const addProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: null,
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      size: '',
      color: '',
      image: null,
      imagePreview: null
    });
    setIsModalOpen(true);
  };

  // Open modal for editing product
  const editProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      ...product,
      imagePreview: product.image
    });
    setIsModalOpen(true);
  };

  // Delete product
  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Save product (create or update)
  const saveProduct = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!currentProduct.name || !currentProduct.price || !currentProduct.category || !currentProduct.size || !currentProduct.color) {
      alert('Please fill in all required fields');
      return;
    }

    if (isEditing) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === currentProduct.id ? 
        {...currentProduct, price: Number(currentProduct.price), stock: Number(currentProduct.stock)} : 
        product
      ));
    } else {
      // Create new product
      const newProduct = {
        ...currentProduct,
        id: Date.now(),
        price: Number(currentProduct.price),
        stock: Number(currentProduct.stock),
        image: currentProduct.imagePreview || 'https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg'
      };
      setProducts([...products, newProduct]);
    }
    
    setIsModalOpen(false);
  };

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
                    onClick={() => setSearchTerm('')}
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
                    Size/Color
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-emerald-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-md overflow-hidden bg-emerald-100 flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-emerald-900">{product.name}</div>
                            <div className="text-sm text-emerald-600 truncate max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm text-emerald-900">Size: {product.size}</span>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-emerald-900 mr-2">Color:</span>
                            <span 
                              className="w-4 h-4 rounded-full border border-gray-300" 
                              style={{ 
                                backgroundColor: product.color.toLowerCase(),
                                boxShadow: product.color.toLowerCase() === 'white' ? 'inset 0 0 0 1px #e5e7eb' : 'none'
                              }}
                            ></span>
                            <span className="text-sm text-emerald-900 ml-1">{product.color}</span>
                          </div>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-emerald-600">
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
                  {isEditing ? 'Edit Fashion Item' : 'Add New Fashion Item'}
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
                    <label className="block text-emerald-800 mb-2">Product Image</label>
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
                        <p className="mt-2 text-xs">High-quality images increase sales!</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-emerald-800 mb-2">Product Name*</label>
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
                    <label className="block text-emerald-800 mb-2">Description</label>
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
                    <label className="block text-emerald-800 mb-2">Price (₱)*</label>
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
                    <label className="block text-emerald-800 mb-2">Stock Quantity*</label>
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
                    <label className="block text-emerald-800 mb-2">Category*</label>
                    <select
                      name="category"
                      value={currentProduct.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">Size*</label>
                    <select
                      name="size"
                      value={currentProduct.size}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select a size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">Color*</label>
                    <select
                      name="color"
                      value={currentProduct.color}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select a color</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-emerald-800 mb-2">Sustainable Features</label>
                    <div className="flex flex-wrap gap-2">
                      {['Organic', 'Recycled', 'Fair Trade', 'Vegan'].map((feature) => (
                        <label key={feature} className="inline-flex items-center">
                          <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2 text-sm text-emerald-800">{feature}</span>
                        </label>
                      ))}
                    </div>
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
                    {isEditing ? 'Update Item' : 'Save Item'}
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
