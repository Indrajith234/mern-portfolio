import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const About = ({ settings }) => {
  const bio = settings?.heroBio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. I am a passionate full-stack developer who loves building modern web applications that solve real-world problems.';
  const email = settings?.contactEmail || 'officiallyindrajith@gmail.com';

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3 font-semibold">Get to know me</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">About <span className="gradient-text">Me</span></h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Bio + Stats */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 rounded-lg"><FaBriefcase className="text-primary" size={16} /></span>
                Who I Am
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{bio}</p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base mt-4">
                I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, I'm exploring new technologies and contributing to the developer community.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { label: 'Full Stack', color: 'primary' },
                  { label: 'MERN Stack', color: 'secondary' },
                  { label: 'React Developer', color: 'primary' },
                  { label: 'API Design', color: 'secondary' },
                ].map((tag) => (
                  <span key={tag.label} className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    tag.color === 'primary'
                      ? 'bg-primary/10 border border-primary/20 text-primary'
                      : 'bg-secondary/10 border border-secondary/20 text-secondary'
                  }`}>{tag.label}</span>
                ))}
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 border border-green-500/20 text-green-400">🟢 Open to Work</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Projects', value: '10+' },
                { label: 'CGPA', value: '8.02' },
                { label: 'Year', value: "'25" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-400"><FaEnvelope size={12} className="text-primary" /> Email</span>
                  <a href={`mailto:${email}`} className="text-primary hover:underline truncate max-w-[180px]">{email}</a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-400"><FaMapMarkerAlt size={12} className="text-primary" /> Location</span>
                  <span className="text-slate-300">Tamil Nadu, India</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Status</span>
                  <span className="text-green-400 font-semibold">Available ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Education */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <span className="p-1.5 bg-primary/10 rounded-lg"><HiAcademicCap className="text-primary" size={18} /></span>
              Education
            </h3>

            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary opacity-30" />
              <div className="pl-10 relative">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                  <div className="w-2 h-2 bg-dark-900 rounded-full" />
                </div>
                <div className="glass rounded-xl p-5 mb-4">
                  <h4 className="text-white font-bold text-base">B.Tech – Information Technology</h4>
                  <p className="text-primary font-semibold text-sm mt-1">Anjalai Ammal Mahalingam Engineering College</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Graduation</div>
                      <div className="text-sm font-bold text-white mt-0.5">2025</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">CGPA</div>
                      <div className="text-sm font-bold text-primary mt-0.5">8.02 / 10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Degree</div>
                      <div className="text-sm font-bold text-white mt-0.5">B.Tech</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/15 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="text-white font-semibold text-sm">Seeking Full-Stack Developer Roles</p>
                  <p className="text-slate-400 text-xs mt-1">Available for immediate joining. Passionate about building impactful web applications.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
