import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage } from 'react-icons/fa';
import api from '../utils/api';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const initialForm = { title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', image: null };
  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      techStack: project.techStack?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      image: null,
    });
    setImagePreview(project.imageUrl || null);
    setEditingId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and description are required');
      return;
    }
    setSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('techStack', formData.techStack);
    data.append('liveUrl', formData.liveUrl);
    data.append('githubUrl', formData.githubUrl);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Project updated! ✏️');
      } else {
        await api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Project added! 🚀');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Projects</h1>
            <p className="text-slate-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
          </div>
          <button id="add-project-btn"
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-lg shadow-primary/20">
            <FaPlus size={13} /> Add Project
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">{editingId ? '✏️ Edit Project' : '➕ New Project'}</h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-white p-1"><FaTimes size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Title *</label>
                  <input type="text" id="project-title" value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Portfolio Website"
                    className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Tech Stack (comma-separated)</label>
                  <input type="text" id="project-tech" value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Description *</label>
                <textarea id="project-desc" value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description of what this project does..." rows={3}
                  className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm resize-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Live URL</label>
                  <input type="url" id="project-live" value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://yourproject.com"
                    className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">GitHub URL</label>
                  <input type="url" id="project-github" value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/you/project"
                    className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm" />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Project Image</label>
                <div className="flex items-start gap-4">
                  <div onClick={() => fileInputRef.current?.click()}
                    className="flex-1 border-2 border-dashed border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                    <FaImage className="mx-auto text-slate-500 mb-2" size={22} />
                    <p className="text-slate-400 text-sm">{formData.image ? formData.image.name : 'Click to upload image'}</p>
                    <p className="text-slate-500 text-xs mt-1">JPG, PNG, WebP</p>
                  </div>
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-600 flex-shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) { setFormData({ ...formData, image: file }); setImagePreview(URL.createObjectURL(file)); }
                  }} />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="submit" id="project-submit-btn" disabled={submitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all text-sm">
                  {submitting ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
                </button>
                <button type="button" onClick={resetForm}
                  className="px-6 py-2.5 glass text-slate-300 rounded-xl hover:text-white transition-all text-sm">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Project List */}
        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass rounded-xl h-20 animate-pulse" />)}</div>
        ) : projects.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-white font-bold text-lg mb-2">No projects yet</h3>
            <p className="text-slate-400 text-sm">Click "Add Project" to add your first project</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project._id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-slate-600/60 transition-colors">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                  {project.imageUrl
                    ? <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-slate-500 text-xl">💻</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">{project.title}</h3>
                  <p className="text-slate-400 text-xs truncate mt-0.5">{project.description}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {project.techStack?.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md">{tech}</span>
                    ))}
                    {project.techStack?.length > 4 && <span className="text-xs text-slate-500">+{project.techStack.length - 4}</span>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(project)}
                    className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all" title="Edit">
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => handleDelete(project._id)}
                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all" title="Delete">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
