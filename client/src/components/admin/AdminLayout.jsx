import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaProjectDiagram, FaEnvelope, FaCode, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

const navItems = [
  { path: '/admin/dashboard', icon: FaProjectDiagram, label: 'Projects' },
  { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
  { path: '/admin/skills', icon: FaCode, label: 'Skills' },
  { path: '/admin/settings', icon: FaCog, label: 'Settings' },
];

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-slate-700/40">
        <div className="gradient-text text-xl font-black">IP.dev</div>
        <p className="text-slate-500 text-xs mt-1 font-medium">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-400 hover:text-white hover:bg-dark-700'
              }`}>
              <item.icon size={15} />
              {item.label}
              {isActive && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700/40 space-y-1">
        <button onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-dark-700 transition-all">
          <HiHome size={16} /> View Portfolio
        </button>
        <button onClick={handleLogout} id="logout-btn"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
          <FaSignOutAlt size={14} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-800 border-r border-slate-700/40 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-72 bg-dark-800 h-full z-10 shadow-2xl">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <FaTimes size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-slate-700/40">
          <div className="gradient-text text-lg font-black">IP.dev Admin</div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white">
            <FaBars size={20} />
          </button>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
