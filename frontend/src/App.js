import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            toast.info("Oturum süreniz doldu. Lütfen tekrar giriş yapın.");
          }
        } catch (err) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
    }, []);

  return (
  <>
      <ToastContainer position="top-right" autoClose={3000} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
