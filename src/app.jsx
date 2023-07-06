import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import NavBar from "./NavBar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
