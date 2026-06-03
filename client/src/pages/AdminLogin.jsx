import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaLock, FaUser } from 'react-icons/fa';
import api from '../utils/api';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/admin/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      toast.error('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/admin/login', credentials);
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome back! 🔐');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-4">
              <FaLock className="text-primary" size={24} />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Login</h1>
            <p className="text-slate-400 text-sm mt-1">Portfolio Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium" htmlFor="admin-username">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input type="text" id="admin-username" value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium" htmlFor="admin-password">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input type={showPassword ? 'text' : 'password'} id="admin-password" value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" id="admin-login-btn" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all hover:-translate-y-0.5 mt-2 text-sm shadow-lg shadow-primary/20">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-slate-500 hover:text-primary text-xs transition-colors">← View Portfolio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
