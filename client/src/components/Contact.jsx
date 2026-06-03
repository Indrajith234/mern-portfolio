import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../utils/api';

const Contact = ({ settings }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const email = settings?.contactEmail || 'officiallyindrajith@gmail.com';
  const github = settings?.githubUrl || 'https://github.com/Indrajith234';
  const linkedin = settings?.linkedinUrl || 'https://www.linkedin.com/in/indrajithparthasarathy/';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/contact', formData);
      toast.success("Message sent! I'll get back to you soon 🚀");
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <FaEnvelope size={18} />, label: 'Email', value: email, href: `mailto:${email}`, cls: 'text-primary bg-primary/10 border-primary/20 hover:bg-primary/15' },
    { icon: <FaLinkedin size={18} />, label: 'LinkedIn', value: 'Connect on LinkedIn', href: linkedin, cls: 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15' },
    { icon: <FaGithub size={18} />, label: 'GitHub', value: 'View my repositories', href: github, cls: 'text-slate-300 bg-slate-500/10 border-slate-500/20 hover:bg-slate-500/15' },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3 font-semibold">Let's connect</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Get In <span className="gradient-text">Touch</span></h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Let's Talk! 👋</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm currently open to full-stack developer opportunities. Whether you have a project idea, a job opportunity, or just want to say hi — my inbox is always open!
              </p>
            </div>
            <div className="space-y-3">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group ${item.cls}`}>
                  <div className="p-2 rounded-lg">{item.icon}</div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5 font-medium" htmlFor="contact-name">Name</label>
                <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5 font-medium" htmlFor="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5 font-medium" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..." rows={5}
                  className="w-full px-4 py-3 bg-dark-700 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none" />
              </div>
              <button type="submit" id="contact-submit-btn" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-cyan-400 text-dark-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all hover:-translate-y-0.5 text-sm shadow-lg shadow-primary/20">
                <FaPaperPlane size={14} />
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
