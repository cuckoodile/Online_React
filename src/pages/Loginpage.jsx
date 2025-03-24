import React, { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login/register logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl w-full flex overflow-hidden bg-emerald-950/50 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-800/50 relative z-10">
        {/* Image Section */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src="https://i.pinimg.com/736x/51/75/23/517523705c82707aff56cd8efd08a630.jpg"
            alt="Login visual"
            className="object-cover w-full h-full"
          />
          {/* Optional overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
            <p className="text-emerald-100/80 mt-2">Sign in to continue your journey</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-8">
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

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-emerald-950/50 border border-emerald-800/50 placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-emerald-950/50 border border-emerald-800/50 placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-emerald-950/50 border border-emerald-800/50 placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-emerald-950/50 border border-emerald-800/50 placeholder-emerald-400/60 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:z-10 sm:text-sm backdrop-blur-sm"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/30"
              >
                {isLogin ? 'Sign in' : 'Create Account'}
              </button>
            </div>
          </form>

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
    </div>
  )
}
