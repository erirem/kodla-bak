import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Home onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/history"
        element={
          isAuthenticated ? (
            <History />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <LoginRegister onAuthSuccess={() => setIsAuthenticated(true)} />
          )
        }
      />
    </Routes>
  );
}

export default App;
