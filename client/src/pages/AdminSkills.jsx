import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import toast from 'react-hot-toast';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaTrash, FaSearch, FaPlus, FaChevronDown } from 'react-icons/fa';
import api from '../utils/api';

const ICON_LIBRARY = [
  { name: 'HTML5', iconName: 'FaHtml5', category: 'Frontend' },
  { name: 'CSS3', iconName: 'FaCss3Alt', category: 'Frontend' },
  { name: 'JavaScript', iconName: 'FaJs', category: 'Frontend' },
  { name: 'React', iconName: 'FaReact', category: 'Frontend' },
  { name: 'Vue.js', iconName: 'SiVuedotjs', category: 'Frontend' },
  { name: 'Angular', iconName: 'FaAngular', category: 'Frontend' },
  { name: 'TypeScript', iconName: 'SiTypescript', category: 'Frontend' },
  { name: 'Next.js', iconName: 'SiNextdotjs', category: 'Frontend' },
  { name: 'Tailwind CSS', iconName: 'SiTailwindcss', category: 'Frontend' },
  { name: 'Bootstrap', iconName: 'FaBootstrap', category: 'Frontend' },
  { name: 'Sass', iconName: 'FaSass', category: 'Frontend' },
  { name: 'Redux', iconName: 'SiRedux', category: 'Frontend' },
  { name: 'Node.js', iconName: 'FaNodeJs', category: 'Backend' },
  { name: 'Express.js', iconName: 'SiExpress', category: 'Backend' },
  { name: 'Python', iconName: 'FaPython', category: 'Backend' },
  { name: 'Django', iconName: 'SiDjango', category: 'Backend' },
  { name: 'PHP', iconName: 'FaPhp', category: 'Backend' },
  { name: 'Java', iconName: 'FaJava', category: 'Backend' },
  { name: 'GraphQL', iconName: 'SiGraphql', category: 'Backend' },
  { name: 'MongoDB', iconName: 'SiMongodb', category: 'Database' },
  { name: 'MySQL', iconName: 'SiMysql', category: 'Database' },
  { name: 'PostgreSQL', iconName: 'SiPostgresql', category: 'Database' },
  { name: 'Redis', iconName: 'SiRedis', category: 'Database' },
  { name: 'Firebase', iconName: 'SiFirebase', category: 'Database' },
  { name: 'SQLite', iconName: 'SiSqlite', category: 'Database' },
  { name: 'Git', iconName: 'FaGitAlt', category: 'Tools' },
  { name: 'GitHub', iconName: 'FaGithub', category: 'Tools' },
  { name: 'Docker', iconName: 'FaDocker', category: 'Tools' },
  { name: 'VS Code', iconName: 'SiVisualstudiocode', category: 'Tools' },
  { name: 'Postman', iconName: 'SiPostman', category: 'Tools' },
  { name: 'Figma', iconName: 'FaFigma', category: 'Tools' },
  { name: 'Linux', iconName: 'FaLinux', category: 'Tools' },
  { name: 'AWS', iconName: 'FaAws', category: 'Tools' },
  { name: 'Vercel', iconName: 'SiVercel', category: 'Tools' },
  { name: 'Netlify', iconName: 'SiNetlify', category: 'Tools' },
  { name: 'Vercel', iconName: 'SiVercel', category: 'Deployment' },
  { name: 'Netlify', iconName: 'SiNetlify', category: 'Deployment' },
  { name: 'Render', iconName: 'SiRender', category: 'Deployment' },
  { name: 'Heroku', iconName: 'SiHeroku', category: 'Deployment' },
  { name: 'Railway', iconName: 'SiRailway', category: 'Deployment' },
  { name: 'AWS', iconName: 'FaAws', category: 'Deployment' },
  { name: 'DigitalOcean', iconName: 'SiDigitalocean', category: 'Deployment' },
  { name: 'GitHub Pages', iconName: 'FaGithub', category: 'Deployment' },
  { name: 'Firebase Hosting', iconName: 'SiFirebase', category: 'Deployment' },
  { name: 'MongoDB Atlas', iconName: 'SiMongodb', category: 'Deployment' },
  { name: 'Cloudinary', iconName: 'SiCloudinary', category: 'Deployment' },
  { name: 'NPM', iconName: 'FaNpm', category: 'Tools' },
];

const allIcons = { ...FaIcons, ...SiIcons };

const getIcon = (iconName, size = 20) => {
  const IconComponent = allIcons[iconName];
  return IconComponent ? <IconComponent size={size} /> : <span className="text-base">?</span>;
};

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools', 'Deployment'];

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', iconName: '', category: 'Frontend' });
  const [iconSearch, setIconSearch] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const filteredIcons = ICON_LIBRARY.filter((icon) =>
    icon.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
    icon.category.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const handleSelectIcon = (icon) => {
    setFormData({ name: icon.name, iconName: icon.iconName, category: icon.category });
    setShowIconPicker(false);
    setIconSearch('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.iconName) {
      toast.error('Please select a skill from the library');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/skills', formData);
      toast.success(`${formData.name} added! ✨`);
      setFormData({ name: '', iconName: '', category: 'Frontend' });
      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add skill');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from skills?`)) return;
    try {
      await api.delete(`/skills/${id}`);
      toast.success('Skill removed');
      fetchSkills();
    } catch {
      toast.error('Failed to delete skill');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Skills</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the skills shown on your portfolio</p>
        </div>

        {/* Add Skill Form */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-5">Add New Skill</h2>

          <div className="mb-4">
            <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wide">Pick from Skill Library</label>
            <button type="button" id="icon-picker-btn" onClick={() => setShowIconPicker(!showIconPicker)}
              className="flex items-center gap-3 px-4 py-3 bg-dark-700 border border-slate-600/60 rounded-xl text-sm text-slate-300 hover:border-primary/50 transition-all w-full sm:w-auto min-w-[220px]">
              {formData.iconName ? (
                <>
                  <span className="text-primary">{getIcon(formData.iconName, 18)}</span>
                  <span className="font-medium">{formData.name}</span>
                  <span className="text-slate-500 text-xs">({formData.category})</span>
                </>
              ) : (
                <><FaSearch size={14} className="text-slate-500" /><span>Search & pick a skill...</span></>
              )}
              <FaChevronDown size={12} className={`ml-auto text-slate-500 transition-transform ${showIconPicker ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showIconPicker && (
            <div className="mb-4 bg-dark-800 border border-slate-700/60 rounded-xl p-4">
              <input type="text" value={iconSearch} onChange={(e) => setIconSearch(e.target.value)}
                placeholder="Search skills (e.g. React, Docker, MongoDB...)"
                className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm mb-3"
                autoFocus />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-52 overflow-y-auto">
                {filteredIcons.map((icon) => (
                  <button key={icon.iconName} type="button" onClick={() => handleSelectIcon(icon)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs ${
                      formData.iconName === icon.iconName
                        ? 'bg-primary/10 border-primary/40 text-primary'
                        : 'border-transparent text-slate-400 hover:bg-dark-700 hover:text-primary hover:border-primary/20'
                    }`}>
                    {getIcon(icon.iconName, 20)}
                    <span className="text-center leading-tight break-all">{icon.name}</span>
                  </button>
                ))}
                {filteredIcons.length === 0 && <p className="col-span-full text-center text-slate-500 text-sm py-6">No skills found</p>}
              </div>
            </div>
          )}

          {formData.iconName && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Name</label>
                  <input type="text" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-3 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white text-sm focus:border-primary transition-all w-40" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="px-3 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white text-sm focus:border-primary transition-all">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button type="submit" id="add-skill-btn" disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all text-sm">
                  <FaPlus size={12} /> {submitting ? 'Adding...' : 'Add Skill'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Skills by Category */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[...Array(12)].map((_, i) => <div key={i} className="glass rounded-xl h-20 animate-pulse" />)}
          </div>
        ) : skills.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-white font-bold text-lg mb-2">No skills added yet</h3>
            <p className="text-slate-400 text-sm">Use the form above to add your first skill</p>
          </div>
        ) : (
          <div className="space-y-8">
            {CATEGORIES.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{cat}</h3>
                    <span className="text-xs text-slate-600">({catSkills.length})</span>
                    <div className="flex-1 h-px bg-slate-700/50" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    {catSkills.map((skill) => (
                      <div key={skill._id} className="glass rounded-xl p-3 flex flex-col items-center gap-2 group relative hover:border-slate-500/50 transition-all">
                        <div className="text-primary">{getIcon(skill.iconName, 22)}</div>
                        <span className="text-xs text-slate-400 font-medium text-center leading-tight">{skill.name}</span>
                        <button onClick={() => handleDelete(skill._id, skill.name)}
                          className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Remove">
                          <FaTrash size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
