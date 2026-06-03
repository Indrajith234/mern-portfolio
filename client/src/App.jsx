import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import AdminSkills from './pages/AdminSkills';
import AdminSettings from './pages/AdminSettings';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111128',
            color: '#e2e8f0',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#00d4ff', secondary: '#0a0a1a' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#0a0a1a' } },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
