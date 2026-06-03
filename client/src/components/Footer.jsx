import React from 'react';
import { FaGithub, FaLinkedin, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = ({ settings }) => {
  const name = settings?.heroName || 'Indrajith P';
  const github = settings?.githubUrl || 'https://github.com/Indrajith234';
  const linkedin = settings?.linkedinUrl || 'https://www.linkedin.com/in/indrajithparthasarathy/';

  return (
    <footer className="border-t border-slate-700/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm flex items-center gap-1.5">
            © 2025 <span className="gradient-text font-semibold">{name}</span>. Made with <FaHeart className="text-red-400" size={12} /> in India
          </p>
          <div className="flex items-center gap-4">
            <a href={github} target="_blank" rel="noopener noreferrer" id="footer-github"
              className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" id="footer-linkedin"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-200" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} id="back-to-top-btn"
              className="p-2 bg-primary/10 border border-primary/20 text-primary rounded-xl hover:bg-primary/20 transition-all hover:-translate-y-0.5" aria-label="Back to top">
              <FaArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
