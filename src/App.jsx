import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import FoodLog from "./pages/FoodLog";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('dietbalancer_auth');
    setIsLoggedIn(!!auth);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dietbalancer_auth');
    localStorage.removeItem('dietbalancer_login');
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #191825 0%, #2d2842 100%)',
        color: '#ffe066',
        fontSize: '18px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading DietBalancer...
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food-log" element={<FoodLog />} />   // ✅ DIFFERENT
        <Route path="/foodlog" element={isLoggedIn ? <FoodLog /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
