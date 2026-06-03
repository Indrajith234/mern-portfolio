import React from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';

const Hero = ({ settings }) => {
  const name = settings?.heroName || 'Indrajith P';
  const title = settings?.heroTitle || 'MERN Stack Developer';
  const bio = settings?.heroBio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. I build modern, scalable web applications with passion and precision. Currently seeking exciting full-stack developer opportunities.';
  const github = settings?.githubUrl || 'https://github.com/Indrajith234';
  const linkedin = settings?.linkedinUrl || 'https://www.linkedin.com/in/indrajithparthasarathy/';
  const resumeUrl = settings?.resumeUrl || 'https://drive.google.com/file/d/10jL8UcqXOou3hLbUSXM_1rwZfSk0PUb9/view?usp=drive_link';
  const profileImg = settings?.profileImageUrl || '/profile.jpg';

  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">

      {/* Animated blobs */}
      <div className="absolute top-1/4 -left-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-4000" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-mono font-semibold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for Work
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 leading-tight tracking-tight">
              <span className="gradient-text">{name}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6">
              <span className="text-primary">&lt;</span>{title}<span className="text-primary">/&gt;</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8 mx-auto lg:mx-0">{bio}</p>

            {/* Social */}
            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
              <a href={github} target="_blank" rel="noopener noreferrer" id="hero-github-link"
                className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-300 text-sm font-medium">
                <FaGithub size={18} /> GitHub
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" id="hero-linkedin-link"
                className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-slate-300 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 text-sm font-medium">
                <FaLinkedin size={18} /> LinkedIn
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" id="hero-resume-btn"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-primary/25 text-sm">
                <FaDownload size={15} /> Download Resume
              </a>
              <button onClick={scrollToProjects} id="hero-projects-btn"
                className="flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-primary/60 hover:text-primary transition-all hover:-translate-y-1 text-sm">
                View Projects <FaArrowDown size={14} />
              </button>
            </div>
          </div>

          {/* Right: Profile Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary to-primary opacity-20 blur-2xl scale-110" />
              <div className="relative rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-primary">
                <div className="rounded-full overflow-hidden w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-dark-800">
                  <img src={profileImg} alt={`${name} - ${title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=111128&color=00d4ff&bold=true&format=svg`;
                    }} />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-primary/30">
                Open to Work ✓
              </div>
              <div className="absolute -top-3 -left-3 glass text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                MERN Stack
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block animate-bounce">
        <FaArrowDown size={18} className="text-slate-500" />
      </div>
    </section>
  );
};

export default Hero;
