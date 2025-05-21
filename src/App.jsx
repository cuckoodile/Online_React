import { useContext, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

// Imported components
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

// Imported media and tools
import { ShoppingCart, Heart, Search, User, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import Footer from "./components/footer";
import { useCookies } from "react-cookie";

import { AuthContext } from "./utils/contexts/AuthContext";

function App() {
  const [theme, setTheme] = useState("light");
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();

  const [cookies, setCookie, removeCookie] = useCookies();
  const auth = useContext(AuthContext);

  console.log("APP USER DATA: ", user);
  console.log("APP USER ROLE: ", user?.roles[0]);

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
                    to="/"
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
                      All Products
                    </Link>

                    {user?.roles[0] == "admin" ? (
                      <Link
                        to="/admin"
                        className="hover:text-emerald-300 transition-colors"
                      >
                        Admin
                      </Link>
                    ) : null}
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
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col">
            <Outlet />
          </div>

          <Footer />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
