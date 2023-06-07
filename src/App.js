import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import UserProvider from "./contexts/userContext";
import DashboardProvider from "./contexts/dashboardContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedDashboard from "./pages/Dashboard/ProtectedDashboard";
import AlbumImages from "./pages/AlbumImages/AlbumImages";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/dashboard", children: [
          {index: true, element: <ProtectedDashboard />},
          {path: 'images', element: <AlbumImages />}
        ] },
      ],
    },
  ]);
  return (
    <>
      <UserProvider>
        <DashboardProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <RouterProvider router={browserRouter} />
        </DashboardProvider>
      </UserProvider>
    </>
  );
}
export default App;
