import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import toast from 'react-hot-toast';
import { FaImage, FaSave, FaUser, FaLink, FaEnvelope } from 'react-icons/fa';
import api from '../utils/api';

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    heroName: '', heroTitle: '', heroBio: '', resumeUrl: '',
    githubUrl: '', linkedinUrl: '', contactEmail: '', profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        const s = res.data;
        setFormData({
          heroName: s.heroName || '',
          heroTitle: s.heroTitle || '',
          heroBio: s.heroBio || '',
          resumeUrl: s.resumeUrl || '',
          githubUrl: s.githubUrl || '',
          linkedinUrl: s.linkedinUrl || '',
          contactEmail: s.contactEmail || '',
          profileImage: null,
        });
        if (s.profileImageUrl) setImagePreview(s.profileImageUrl);
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    ['heroName', 'heroTitle', 'heroBio', 'resumeUrl', 'githubUrl', 'linkedinUrl', 'contactEmail'].forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    if (formData.profileImage) data.append('profileImage', formData.profileImage);

    try {
      await api.put('/settings', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Settings saved! Portfolio updated 🎉');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSubmitting(false);
    }
  };

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon }) => (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />}
        <input type={type} name={name} id={`setting-${name}`} value={formData[name] || ''}
          onChange={handleChange} placeholder={placeholder}
          className={`w-full py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm ${Icon ? 'pl-10 pr-4' : 'px-4'}`} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-3xl mx-auto space-y-4">
          {[...Array(5)].map((_, i) => <div key={i} className="glass rounded-xl h-16 animate-pulse" />)}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Site Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Update your portfolio content — changes reflect live instantly</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span className="p-1.5 bg-primary/10 rounded-lg"><FaImage className="text-primary" size={14} /></span>
              Profile Photo
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 bg-dark-700 flex-shrink-0">
                {imagePreview
                  ? <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><FaImage className="text-slate-500" size={24} /></div>
                }
              </div>
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-slate-600 text-slate-300 rounded-xl text-sm hover:border-primary hover:text-primary transition-all">
                  {imagePreview ? 'Change Photo' : 'Upload Photo'}
                </button>
                <p className="text-xs text-slate-500 mt-1.5">JPG, PNG, WebP • Uploads to Cloudinary</p>
              </div>
              <input type="file" ref={fileInputRef} accept="image/*" className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) { setFormData({ ...formData, profileImage: file }); setImagePreview(URL.createObjectURL(file)); }
                }} />
            </div>
          </div>

          {/* Hero Section */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-primary/10 rounded-lg"><FaUser className="text-primary" size={14} /></span>
              Hero Section
            </h2>
            <InputField label="Your Name" name="heroName" placeholder="Indrajith P" icon={FaUser} />
            <InputField label="Job Title" name="heroTitle" placeholder="MERN Stack Developer" />
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wide">Short Bio</label>
              <textarea name="heroBio" id="setting-heroBio" value={formData.heroBio || ''} onChange={handleChange}
                placeholder="Write a short bio about yourself..." rows={4}
                className="w-full px-4 py-2.5 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary transition-all text-sm resize-none" />
            </div>
            <InputField label="Resume PDF URL" name="resumeUrl" type="url" placeholder="https://drive.google.com/..." icon={FaLink} />
          </div>

          {/* Social Links */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-primary/10 rounded-lg"><FaLink className="text-primary" size={14} /></span>
              Social Links & Contact
            </h2>
            <InputField label="GitHub URL" name="githubUrl" type="url" placeholder="https://github.com/username" icon={FaLink} />
            <InputField label="LinkedIn URL" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/username" icon={FaLink} />
            <InputField label="Contact Email" name="contactEmail" type="email" placeholder="your@email.com" icon={FaEnvelope} />
          </div>

          {/* Save Button */}
          <button type="submit" id="settings-save-btn" disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 text-sm">
            <FaSave size={16} />
            {submitting ? 'Saving...' : 'Save All Settings'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
