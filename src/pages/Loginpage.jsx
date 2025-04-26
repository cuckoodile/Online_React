import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Registration specific validations
    if (!isLogin) {
      if (formData.name.trim() === '') {
        newErrors.name = 'Name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // For demo purposes - in a real app you would call an API
      if (isLogin) {
        // Demo admin login
        if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
          navigate('/admin');
          return;
        }
        // Demo user login
        navigate('/');
      } else {
        // Registration success
        setIsLogin(true);
        setFormData({
          ...formData,
          confirmPassword: ''
        });
        // Show success message or redirect
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-emerald-400/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl w-full flex overflow-hidden bg-emerald-950/50 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-800/50 relative z-10">
        {/* Image Section */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src="https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
            alt="Login visual"
            className="object-cover w-full h-full"
          />
          {/* Enhanced overlay with brand elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 to-transparent flex flex-col justify-between p-8">
            <div className="text-3xl font-bold text-white">
              <span className="text-emerald-300">Dev</span>SixTech
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
              <p className="text-emerald-100/80 mt-2 max-w-xs">Sign in to continue your sustainable fashion journey with us</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-emerald-100">Eco-friendly fashion choices</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-emerald-100">Sustainable materials</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-emerald-100">Ethical production</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 text-transparent bg-clip-text">
              {isLogin ? 'Sign in to your account' : 'Create new account'}
            </h2>
            
            {/* Toggle Buttons */}
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30' 
                    : 'bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/50'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30' 
                    : 'bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/50'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              {!isLogin && (
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
                      <FiUser />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2.5 bg-emerald-950/50 border ${errors.name ? 'border-red-500' : 'border-emerald-800/50'} placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm`}
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
              )}
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
                    <FiMail />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2.5 bg-emerald-950/50 border ${errors.email ? 'border-red-500' : 'border-emerald-800/50'} placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm`}
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
                    <FiLock />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-2.5 bg-emerald-950/50 border ${errors.password ? 'border-red-500' : 'border-emerald-800/50'} placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400 hover:text-emerald-300"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
                      <FiLock />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-2.5 bg-emerald-950/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-emerald-800/50'} placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm`}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400 hover:text-emerald-300"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-emerald-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-teal-300 hover:text-teal-200 transition-colors duration-200">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/30"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-emerald-300 group-hover:text-emerald-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {isLogin ? 'Sign in' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Demo credentials for easy testing */}
          {isLogin && (
            <div className="mt-4 p-3 bg-emerald-900/50 rounded-lg border border-emerald-800/50">
              <p className="text-xs text-emerald-300 mb-1">Demo Credentials:</p>
              <p className="text-xs text-emerald-400">Admin: admin@example.com / admin123</p>
              <p className="text-xs text-emerald-400">User: user@example.com / user123</p>
            </div>
          )}

          <div className="text-center text-sm text-emerald-300/80">
            By continuing, you agree to our{' '}
            <a href="#" className="font-medium text-teal-300 hover:text-teal-200 transition-colors duration-200">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-teal-300 hover:text-teal-200 transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      
      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  )
}
