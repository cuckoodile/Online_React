import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

// Imported components
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

// Imported media and tools
import { ShoppingCart, Heart, Search, User, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import Footer from "./components/footer";

function App() {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="h-screen">
        <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
          {/* E-commerce Navigation Bar */}
          <nav className="bg-emerald-900 text-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo and Main Nav */}
                <div className="flex items-center gap-8">
                  <Link
                    to="/home"
                    className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 
                    text-transparent bg-clip-text"
                  >
                    DevSix
                  </Link>

                  <div className="hidden md:flex items-center gap-6">
                    <Link
                      to="/allproducts"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      Shop
                    </Link>
                    <Link
                      to="/about"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      About
                    </Link>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-md mx-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-2 rounded-lg bg-emerald-800/50 border border-emerald-700 
                      focus:outline-none focus:border-emerald-500 text-emerald-100 placeholder:text-emerald-400"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-emerald-400" />
                  </div>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-emerald-800 rounded-full transition-colors relative">
                    <Link to="/wishlist">
                      <Heart className="h-5 w-5" />
                    </Link>
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </button>

                  <button className="p-2 hover:bg-emerald-800 rounded-full transition-colors relative">
                    <Link to="/cart">
                      <ShoppingCart className="h-5 w-5" />
                    </Link>
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </button>

                  <button className="p-2 hover:bg-emerald-800 rounded-full transition-colors">
                    <Link to="/profile">
                      <User className="h-5 w-5" />
                    </Link>
                  </button>

                  {/* Mobile Menu Button */}
                  <button className="md:hidden p-2 hover:bg-emerald-800 rounded-full transition-colors">
                    <Menu className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="bg-red-500 flex flex-col">
            {/* <div className="flex-1 flex flex-col"> */}
              {/* Content Outlet */}
              {/* <div className="bg-red-500 flex-1 flex flex-col"> */}
                <Outlet />
              {/* </div> */}
            {/* </div> */}
          </div> 

          {/* Footer Content */}
          <Footer />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
