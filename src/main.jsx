import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Landingpage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import Allproducts from "./pages/Allproducts";
import Cart from "./pages/Cartpage";
import Productpage from "./pages/Productpage";
import Profilepage from "./pages/ProfilePage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/About";
import About from "./pages/About";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  
  {
    path: "/welcome",
    element: <Landingpage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      // ADD MORE PAGES HERE IF NEEDED
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/allproducts",
        element: <Allproducts />,
      },
      {
        path: "/product",
        element: <Productpage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profilepage />,
      },
      {
        path: "/admin",
        element: <Admin />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
