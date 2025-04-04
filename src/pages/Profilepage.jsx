import { useState } from "react";
import { motion } from 'framer-motion';
import { FiEdit2, FiStar, FiShoppingBag, FiHeart } from 'react-icons/fi';

export default function Profilepage() {
    const [profile, setProfile] = useState({
        fullName: "Zanjoe Gonzales",
        email: "zanjoegonzales519@gmail.com",
        mobile: "09** *** ****",
        birthday: "May 19 2006",
        gender: "Male",
        shippingAddress: {
            fullName: "Zanjoe Gonzales",
            address: "Pateros",
            postcode: "Metro Manila~Pasig,Pasig City~Maybunga",
            phoneNumber: "09** *** ****"
        }
    });

    const [showAllPrev, setShowAllPrev] = useState(false);
    const [showAllRec, setShowAllRec] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Mock data for previous purchases
    const prevPurchases = [
        {
            id: 1,
            name: "Natural Face Serum",
            price: 1299,
            image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
            rating: 5,
            description: "Organic facial serum"
        },
        {
            id: 2,
            name: "Eco Laundry Detergent",
            price: 449,
            image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
            rating: 4,
            description: "Eco-friendly cleaning"
        }
    ];

    // Mock data for recommended products
    const recommendedProducts = [
        {
            id: 1,
            name: "Bamboo Toothbrush Set",
            price: 399,
            image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
            rating: 5,
            description: "Sustainable oral care"
        },
        {
            id: 2,
            name: "Natural Clay Face Mask",
            price: 799,
            image: "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
            rating: 4,
            description: "Organic skincare"
        }
    ];

    const handleSave = () => {
        console.log("Profile saved", profile);
    };

    return (
        <div className="min-h-screen bg-emerald-50 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Profile Section - Takes 4 columns */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Profile Header/Banner */}
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center">
                                <div className="flex justify-center">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <img 
                                            src="https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg" 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white mt-4 mb-2">{profile.fullName}</h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                    bg-white/20 text-white">
                                    <span className="w-2 h-2 rounded-full bg-emerald-300 mr-2"></span>
                                    Active Member
                                </span>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 p-6 bg-emerald-50 border-b border-emerald-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-emerald-700">{prevPurchases.length}</div>
                                    <div className="text-sm text-emerald-600">Orders</div>
                                </div>
                                <div className="text-center border-x border-emerald-200">
                                    <div className="text-2xl font-bold text-emerald-700">4.8</div>
                                    <div className="text-sm text-emerald-600">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-emerald-700">2</div>
                                    <div className="text-sm text-emerald-600">Reviews</div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-6 space-y-4">
                                {Object.entries(profile).map(([key, value]) => {
                                    if (key !== 'shippingAddress') {
                                        return (
                                            <div key={key} className="p-3 bg-emerald-50 rounded-lg">
                                                <div className="flex items-center mb-2">
                                                    <span className="text-emerald-600 mr-2">
                                                        {key === 'email' && '📧'}
                                                        {key === 'mobile' && '📱'}
                                                        {key === 'birthday' && '🎂'}
                                                        {key === 'gender' && '👤'}
                                                        {key === 'fullName' && '📝'}
                                                    </span>
                                                    <p className="text-sm text-emerald-600">
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </p>
                                                </div>
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                                                        className="w-full p-2 border border-emerald-200 rounded-lg 
                                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                                                    />
                                                ) : (
                                                    <p className="text-emerald-900 pl-7">{value}</p>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Shipping Address */}
                                <div className="mt-6 pt-6 border-t border-emerald-100">
                                    <h3 className="flex items-center text-lg font-semibold text-emerald-900 mb-4">
                                        <FiShoppingBag className="mr-2" />
                                        Shipping Address
                                    </h3>
                                    <div className="space-y-3 bg-emerald-50 p-4 rounded-lg">
                                        {Object.entries(profile.shippingAddress).map(([key, value]) => (
                                            <div key={key}>
                                                <p className="text-sm text-emerald-600 mb-1">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </p>
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => setProfile({
                                                            ...profile,
                                                            shippingAddress: {
                                                                ...profile.shippingAddress,
                                                                [key]: e.target.value
                                                            }
                                                        })}
                                                        className="w-full p-2 border border-emerald-200 rounded-lg 
                                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                                                    />
                                                ) : (
                                                    <p className="text-emerald-900">{value}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Edit/Save Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        if (isEditing) {
                                            handleSave();
                                        }
                                        setIsEditing(!isEditing);
                                    }}
                                    className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                                    rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 
                                    transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                                >
                                    <FiEdit2 />
                                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Section - Takes 8 columns */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Previous Purchases */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-emerald-900">Previous Purchases</h3>
                                <button 
                                    onClick={() => setShowAllPrev(!showAllPrev)}
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    {showAllPrev ? "View Less" : "View All"}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {prevPurchases.map(product => (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex bg-emerald-50 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 object-cover"
                                        />
                                        <div className="p-4 flex-1">
                                            <h4 className="font-semibold text-emerald-900">{product.name}</h4>
                                            <p className="text-emerald-600">₱{product.price.toLocaleString()}</p>
                                            <div className="flex items-center mt-2 text-yellow-400">
                                                {[...Array(product.rating)].map((_, i) => (
                                                    <FiStar key={i} className="fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Products */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-emerald-900">Recommended for You</h3>
                                <button 
                                    onClick={() => setShowAllRec(!showAllRec)}
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    {showAllRec ? "View Less" : "View All"}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendedProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex bg-emerald-50 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 object-cover"
                                        />
                                        <div className="p-4 flex-1">
                                            <h4 className="font-semibold text-emerald-900">{product.name}</h4>
                                            <p className="text-emerald-600">₱{product.price.toLocaleString()}</p>
                                            <div className="flex items-center mt-2 text-yellow-400">
                                                {[...Array(product.rating)].map((_, i) => (
                                                    <FiStar key={i} className="fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-2xl font-bold text-emerald-900 mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <FiStar className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-emerald-900 font-medium">Left a Review</p>
                                        <p className="text-emerald-600 text-sm">Natural Face Serum - 5 stars</p>
                                    </div>
                                    <span className="ml-auto text-sm text-emerald-500">2 hours ago</span>
                                </div>

                                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <FiShoppingBag className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-emerald-900 font-medium">Made a Purchase</p>
                                        <p className="text-emerald-600 text-sm">2 items - ₱1,748.00</p>
                                    </div>
                                    <span className="ml-auto text-sm text-emerald-500">1 day ago</span>
                                </div>

                                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <FiHeart className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-emerald-900 font-medium">Added to Wishlist</p>
                                        <p className="text-emerald-600 text-sm">Bamboo Toothbrush Set</p>
                                    </div>
                                    <span className="ml-auto text-sm text-emerald-500">3 days ago</span>
                                </div>

                                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <FiStar className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-emerald-900 font-medium">Left a Review</p>
                                        <p className="text-emerald-600 text-sm">Eco Laundry Detergent - 4 stars</p>
                                    </div>
                                    <span className="ml-auto text-sm text-emerald-500">1 week ago</span>
                                </div>

                                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <FiShoppingBag className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-emerald-900 font-medium">Made a Purchase</p>
                                        <p className="text-emerald-600 text-sm">3 items - ₱2,547.00</p>
                                    </div>
                                    <span className="ml-auto text-sm text-emerald-500">2 weeks ago</span>
                                </div>

                                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <FiHeart className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-emerald-900 font-medium">Added to Wishlist</p>
                                        <p className="text-emerald-600 text-sm">Natural Clay Face Mask</p>
                                    </div>
                                    <span className="ml-auto text-sm text-emerald-500">2 weeks ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
