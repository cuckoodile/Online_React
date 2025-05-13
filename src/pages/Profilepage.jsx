import { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit2,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUsers } from "@/utils/hooks/userUsersHooks";
import withAuth from "@/components/higher-order-component/withAuth";
import { AuthContext } from "../utils/contexts/AuthContext";

function Profilepage() {
  const { user, setUser, logout } = useContext(AuthContext);

  // Profile state
  const {
    data: profile,
    error: userError,
    isLoading: userLoading,
  } = useUsers(user);

  const [showAllPrev, setShowAllPrev] = useState(false);
  const [showAllRec, setShowAllRec] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handle loading and error states
  if (userLoading) {
    return (
      <div className="text-center text-emerald-600">Loading profile...</div>
    );
  }

  if (userError) {
    return (
      <div className="text-center text-red-600">
        Failed to load profile. Please try again later.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-600">
        Profile data is unavailable.
      </div>
    );
  }

  // Profile field icons mapping
  const fieldIcons = {
    fullName: <FiUser className="text-emerald-600" />,
    email: <FiMail className="text-emerald-600" />,
    mobile: <FiPhone className="text-emerald-600" />,
    birthday: <FiCalendar className="text-emerald-600" />,
    gender: <FiUser className="text-emerald-600" />,
  };

  // Mock data for previous purchases
  const prevPurchases = [
    {
      id: 1,
      name: "Natural Face Serum",
      price: 1299,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      rating: 5,
      description: "Organic facial serum",
    },
    {
      id: 2,
      name: "Eco Laundry Detergent",
      price: 449,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      rating: 4,
      description: "Eco-friendly cleaning",
    },
  ];

  // Mock data for recommended products
  const recommendedProducts = [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 399,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      rating: 5,
      description: "Sustainable oral care",
    },
    {
      id: 2,
      name: "Natural Clay Face Mask",
      price: 799,
      image:
        "https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg",
      rating: 4,
      description: "Organic skincare",
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "review",
      icon: <FiStar className="w-6 h-6" />,
      title: "Left a Review",
      description: "Natural Face Serum - 5 stars",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "purchase",
      icon: <FiShoppingBag className="w-6 h-6" />,
      title: "Made a Purchase",
      description: "2 items - ₱1,748.00",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "review",
      icon: <FiStar className="w-6 h-6" />,
      title: "Left a Review",
      description: "Eco Laundry Detergent - 4 stars",
      time: "1 week ago",
    },
    {
      id: 4,
      type: "purchase",
      icon: <FiShoppingBag className="w-6 h-6" />,
      title: "Made a Purchase",
      description: "3 items - ₱2,547.00",
      time: "2 weeks ago",
    },
  ];

  const handleSave = () => {
    console.log("Profile saved");
    setIsEditing(false);
  };

  // Reusable product card component
  const ProductCard = ({ product }) => (
    <motion.div
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
  );

  // Reusable section component
  const ProfileSection = ({ title, children, actionText, onActionClick }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-emerald-900">{title}</h3>
        {actionText && (
          <button
            onClick={onActionClick}
            className="text-emerald-600 hover:text-emerald-700"
          >
            {actionText}
          </button>
        )}
      </div>
      {children}
    </div>
  );

  console.log("Profile Data:", profile);
  console.log("Profile Data:", profile.data[0].address);
  console.log("Profile Address:", profile.data[0].address);

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header - Full width */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative">
            {/* Banner with animated gradient */}
            <div className="h-56 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute top-20 left-20 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl"></div>

              {/* Header content - visible on desktop */}
              <div className="hidden sm:flex justify-between items-center h-full px-10 relative z-10">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-1">Welcome back,</h1>
                  <p className="text-emerald-100 text-lg">
                    How are you doing today?
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6 sm:px-10 flex flex-col sm:flex-row items-center sm:items-end">
              {/* Profile image with border animation */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative">
                  <img
                    src="https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="sm:ml-6 text-center sm:text-left mt-4 sm:mt-0 mb-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
                  {profile.fullName}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-2">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                        bg-emerald-100 text-emerald-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                    Active Member
                  </span>
                  <span className="text-emerald-600 text-sm sm:ml-2">
                    {profile.email}
                  </span>
                </div>
              </div>

              <div className="sm:ml-auto mb-4 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                                    rounded-lg font-medium hover:from-emerald-500 hover:to-teal-500 
                                    transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  <FiEdit2 className="text-lg" />
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout();
                    // Navigate to the login page
                    window.location.href = "/login";
                  }}
                  className="px-6 py-3 border-2 border-red-500 text-red-500 
                                    rounded-lg font-medium hover:bg-red-50
                                    transition-all duration-300 shadow-sm flex items-center gap-2"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats Bar - Mobile only */}
          <div className="pt-24 pb-6 px-6 sm:hidden">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <div className="text-2xl font-bold text-emerald-700">
                  {prevPurchases.length}
                </div>
                <div className="text-sm text-emerald-600">Orders</div>
              </div>
            </div>
          </div>

          {/* Desktop Stats - visible only on desktop */}
          <div className="hidden sm:block pt-24 pb-6 px-6">
            <div className="flex justify-end">
              <div className="bg-emerald-50 rounded-lg p-3 px-5 flex items-center">
                <div className="text-emerald-700 font-medium mr-6">
                  Member since:{" "}
                  <span className="text-emerald-900">May 2025</span>
                </div>
                <div className="text-emerald-700 font-medium mr-6">
                  Orders: <span className="text-emerald-900">2</span>
                </div>
                <Link
                  to="/shipping"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                                    rounded-lg font-medium hover:from-emerald-500 hover:to-teal-500 
                                    transition-all duration-300 shadow-sm flex items-center gap-2"
                >
                  <FiShoppingBag className="text-sm" />
                  Track Orders
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Personal Information */}
            <ProfileSection title="Personal Information">
              <div className="space-y-4">
                {profile.data.length > 0 && (
                  <div className="space-y-4">
                    {/* Personal Information */}
                    {Object.entries(profile.data[0]).map(([key, value]) => {
                      if (key === "address") {
                        return (
                          <div
                            key={key}
                            className="p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            <p className="text-sm text-emerald-600 mb-1">
                              Address
                            </p>
                            <p className="text-emerald-900 font-medium">
                              {value.house_address}, {value.region},{" "}
                              {value.city}
                            </p>
                          </div>
                        );
                      } else if (key === "profile") {
                        return (
                          <div
                            key={key}
                            className="p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            <p className="text-sm text-emerald-600 mb-1">
                              Full Name
                            </p>
                            <p className="text-emerald-900 font-medium">
                              {value.first_name} {value.last_name}
                            </p>
                          </div>
                        );
                      } else if (
                        key !== "id" &&
                        key !== "created_at" &&
                        key !== "updated_at"
                      ) {
                        return (
                          <div
                            key={key}
                            className="p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            <p className="text-sm text-emerald-600 mb-1">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </p>
                            <p className="text-emerald-900 font-medium">
                              {value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </ProfileSection>

            {/* Shipping Address */}
            <ProfileSection title="Shipping Address">
              <div className="space-y-4">
                {profile.data.length > 0 && profile.data[0].address && (
                  <div className="p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                    <p className="text-sm text-emerald-600 mb-1">
                      Shipping Address
                    </p>
                    {Object.entries(profile.data[0].address)
                      .filter(
                        ([key]) =>
                          ![
                            "id",
                            "user_id",
                            "name",
                            "created_at",
                            "updated_at",
                          ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div key={key} className="text-emerald-900 font-medium">
                          <span className="text-emerald-600 capitalize">
                            {key}:{" "}
                          </span>
                          {value}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </ProfileSection>

            {/* Recent Activity - Mobile Only */}
            <div className="lg:hidden">
              <ProfileSection title="Recent Activity">
                <div className="space-y-4">
                  {recentActivity.slice(0, 2).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center p-4 bg-emerald-50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        {activity.icon}
                      </div>
                      <div className="ml-4">
                        <p className="text-emerald-900 font-medium">
                          {activity.title}
                        </p>
                        <p className="text-emerald-600 text-sm">
                          {activity.description}
                        </p>
                      </div>
                      <span className="ml-auto text-sm text-emerald-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </ProfileSection>
            </div>
          </div>

          {/* Right Column - Orders & Activity */}
          <div className="lg:col-span-8 space-y-8">
            {/* Previous Purchases */}
            <ProfileSection
              title="Previous Purchases"
              actionText={showAllPrev ? "View Less" : "View All"}
              onActionClick={() => setShowAllPrev(!showAllPrev)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPurchases.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </ProfileSection>

            {/* Recommended Products */}
            <ProfileSection
              title="Recommended for You"
              actionText={showAllRec ? "View Less" : "View All"}
              onActionClick={() => setShowAllRec(!showAllRec)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </ProfileSection>

            {/* Recent Activity - Desktop Only */}
            <div className="hidden lg:block">
              <ProfileSection title="Recent Activity">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        {activity.icon}
                      </div>
                      <div className="ml-4">
                        <p className="text-emerald-900 font-medium">
                          {activity.title}
                        </p>
                        <p className="text-emerald-600 text-sm">
                          {activity.description}
                        </p>
                      </div>
                      <span className="ml-auto text-sm text-emerald-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </ProfileSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profilepage);