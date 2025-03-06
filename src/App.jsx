import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Imported components
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

// Imported media and tools
import { Airplay, BookPlus } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="h-screen">
        <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
          <Header
            isSideBarOpen={sidebarOpen}
            setIsSideBarOpen={setSideBarOpen}
          />

          <div className="h-[90vh] gap-2 flex overflow-auto">
            {/* Header */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Content Header */}
              <div className="flex justify-between items-center px-3 py-2">
                <div></div>
                <Button variant={"outline"} className="cursor-pointer">
                  <BookPlus />
                  <span>New Book</span>
                </Button>
              </div>

              {/* Content Outlet */}
              <div className="bg-accent/20 overflow-auto p-2 w-full border rounded-tl-xl">
                <div className="h-[200vh]">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
