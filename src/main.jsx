import { createRoot } from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

// Sino yung jejemon dito na nag papangalan ng LandingPage like bakit d nalang Landingpage, see the difference?! -ian
import "./index.css";
import App from "./App.jsx";
import Landingpage from "./pages/Landingpage";
import Homepage from "./pages/Homepage";
import Allproducts from "./pages/Allproducts";
import Cart from "./pages/Cartpage";
import Productpage from "./pages/Productpage";
import Profilepage from "./pages/Profilepage";
import Loginpage from "./pages/Loginpage";
import About from "./pages/About";

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
    path: "/",
    element: <Landingpage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      // ADD MORE PAGES HERE IF NEEDED
      {
        path: "/home",
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
