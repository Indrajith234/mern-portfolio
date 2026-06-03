import React, { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../utils/api';

const SkeletonCard = () => (
  <div className="glass rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-dark-700" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-dark-700 rounded-lg w-2/3" />
      <div className="h-3 bg-dark-700 rounded w-full" />
      <div className="h-3 bg-dark-700 rounded w-4/5" />
      <div className="flex gap-2 pt-1">
        <div className="h-6 bg-dark-700 rounded-md w-16" />
        <div className="h-6 bg-dark-700 rounded-md w-20" />
      </div>
      <div className="flex gap-3 pt-2">
        <div className="h-10 bg-dark-700 rounded-xl flex-1" />
        <div className="h-10 bg-dark-700 rounded-xl w-28" />
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col">
    <div className="relative h-48 bg-dark-700 overflow-hidden">
      {project.imageUrl ? (
        <img src={project.imageUrl} alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-700 to-dark-800">
          <div className="text-center"><div className="text-5xl mb-2">💻</div><div className="text-slate-500 text-xs">No preview</div></div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
    </div>

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-white font-bold text-lg mb-2 leading-tight">{project.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2.5 py-1 bg-primary/8 border border-primary/15 text-primary text-xs rounded-lg font-medium">{tech}</span>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            <FaExternalLinkAlt size={11} /> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 py-2.5 px-4 glass text-slate-300 text-sm font-semibold rounded-xl hover:text-white hover:border-slate-500 transition-all ${!project.liveUrl ? 'flex-1' : ''}`}>
            <FaGithub size={15} /> GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch {
        setError('Could not load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3 font-semibold">What I've built</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">My <span className="gradient-text">Projects</span></h2>
          <div className="section-divider" />
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-slate-400">{error}</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Projects Coming Soon!</h3>
            <p className="text-slate-400 text-sm">Add your first project through the admin dashboard.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
