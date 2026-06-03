import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import toast from 'react-hot-toast';
import { FaTrash, FaEnvelope, FaUser, FaClock } from 'react-icons/fa';
import api from '../utils/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      setMessages(res.data);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Messages</h1>
          <p className="text-slate-400 text-sm mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''} received</p>
        </div>

        {loading ? (
          <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl h-28 animate-pulse" />)}</div>
        ) : messages.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <FaEnvelope className="mx-auto text-slate-600 mb-4" size={48} />
            <h3 className="text-white font-bold text-lg mb-2">No messages yet</h3>
            <p className="text-slate-400 text-sm">Messages from your contact form will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="glass rounded-xl p-5 hover:border-slate-600/60 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                      <span className="flex items-center gap-1.5 text-white font-semibold text-sm">
                        <FaUser size={11} className="text-primary" />{msg.name}
                      </span>
                      <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 text-primary text-sm hover:underline truncate">
                        <FaEnvelope size={11} />{msg.email}
                      </a>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed bg-dark-700/50 rounded-xl p-3">{msg.message}</p>
                    <p className="flex items-center gap-1.5 text-slate-500 text-xs mt-2">
                      <FaClock size={10} />
                      {new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(msg._id)}
                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all flex-shrink-0" title="Delete">
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

export default AdminMessages;
