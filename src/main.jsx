import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import Error from "./Error/Error";
import Home from "./Pages/Home/Home";
import AuthProvider from "./AuthProvider/AuthProvider";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import UpdateProfile from "./Pages/Update Profile/UpdateProfile";
import Shop from "./Pages/Shop/Shop";
import PrivateRoute from "./Routes/Private Route/PrivateRoute";
import AdminRoute from "./Routes/Admin Route/AdminRoute";
import ProductDetails from "./Pages/Product Details/ProductDetails";
import Deals from "./Pages/Deals/Deals";
import Purchase from "./Pages/Purchase/Purchase";
import Orders from "./Pages/Orders/Orders";
import DashBoard from "./Pages/Dash Board/DashBoard";
import AddGame from "./Pages/Add Game/AddGame";
import UpdateGame from "./Pages/Update Game/UpdateGame";
import AdminShop from "./Pages/Admin Shop/AdminShop";
import AdminDashboard from "./Pages/Admin Dashboard/AdminDashboard";
import AdminPanel from "./Pages/Admin Dashboard/AdminPanel";
import AdminSignIn from "./Pages/Admin SignIn/AdminSignIn";
import AdminSignUp from "./Pages/Admin SignUp/AdminSignUp";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      // ── Public routes ──────────────────────────────────────────────
      { path: "/", element: <Home /> },
      { path: "/sign_up", element: <SignUp /> },
      { path: "/sign_in", element: <SignIn /> },
      { path: "/deals", element: <Deals /> },
      {
        path: "/shop",
        element: <Shop />,
        loader: () => fetch(`${SERVER}/shop`),
      },

      // ── Admin auth ─────────────────────────────────────────────────
      { path: "/admin_sign_in", element: <AdminSignIn /> },
      { path: "/admin_sign_up", element: <AdminSignUp /> },

      // ── User private routes ────────────────────────────────────────
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "/update_profile",
        element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
      },
      {
        path: "/dash_board",
        element: <PrivateRoute><DashBoard /></PrivateRoute>,
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`${SERVER}/shop/${params.id}`),
      },
      {
        path: "/purchase/:id",
        element: <PrivateRoute><Purchase /></PrivateRoute>,
        loader: ({ params }) => fetch(`${SERVER}/shop/${params.id}`),
      },
      {
        path: "/orders",
        element: <PrivateRoute><Orders /></PrivateRoute>,
      },

      // ── Admin-only routes ──────────────────────────────────────────
      {
        path: "/admin_shop",
        element: <AdminRoute><AdminShop /></AdminRoute>,
        loader: () => fetch(`${SERVER}/shop`),
      },
      {
        path: "/admin_dash_board",
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
      },
      {
        path: "/admin_panel",
        element: <AdminRoute><AdminPanel /></AdminRoute>,
      },
      {
        path: "/add_game",
        element: <AdminRoute><AddGame /></AdminRoute>,
      },
      {
        path: "/update_game/:id",
        element: <AdminRoute><UpdateGame /></AdminRoute>,
        loader: ({ params }) => fetch(`${SERVER}/shop/${params.id}`),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
