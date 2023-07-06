import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import MainContent from "./MainContent";
import AddAccountHolder from "./AddAccountHolder";
import UpdateAccountHolder from "./UpdateAccountHolder";

const ProtectedRoute = ({ path, element: Component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/maincontent"
        element={<ProtectedRoute element={MainContent} />}
      />
      <Route
        path="/add-account-holder"
        element={<ProtectedRoute element={AddAccountHolder} />}
      />
      <Route
        path="/update-account-holder/:accountId"
        element={<ProtectedRoute element={UpdateAccountHolder} />}
      />
    </Routes>
  );
};

export default AppRoutes;
