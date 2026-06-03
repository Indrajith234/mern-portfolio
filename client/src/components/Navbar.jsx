import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaDownload } from 'react-icons/fa';

const Navbar = ({ settings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const firstName = (settings?.heroName || 'Indrajith P').split(' ')[0];
  const resumeUrl = settings?.resumeUrl || 'https://drive.google.com/file/d/10jL8UcqXOou3hLbUSXM_1rwZfSk0PUb9/view?usp=drive_link';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-dark-800/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => scrollToSection('home')}
            className="text-lg font-black gradient-text tracking-tight hover:opacity-80 transition-opacity">
            {firstName}.dev
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}
                className="text-slate-400 hover:text-primary transition-colors duration-200 text-sm font-medium relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Resume Button */}
          <div className="hidden md:flex">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" id="nav-resume-btn"
              className="flex items-center gap-2 px-4 py-2 border border-primary/60 text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-dark-900 transition-all duration-300">
              <FaDownload size={12} /> Resume
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-800/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all text-sm font-medium">
                {link.label}
              </button>
            ))}
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 border border-primary/50 text-primary rounded-xl text-sm font-semibold hover:bg-primary/10 transition-all">
              <FaDownload size={12} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
