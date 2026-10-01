import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store';
import Register from './pages/Register';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={isAuthenticated ? <Navigate to="/marketplace" replace /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/marketplace" replace /> : <Login />} />
        
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/marketplace" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}