import { createRoot } from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

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
import Admin from "./pages/Admin";
import Controller from "./pages/Controller";
import Checkout from "./pages/Checkout";
import Shipping from "./pages/Shipping";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      },
      {
        path: "/controller",
        element: <Controller />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      }
    ],
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
