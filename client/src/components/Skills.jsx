import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import api from '../utils/api';

const defaultSkills = [
  { _id: 'd1', name: 'HTML5', iconName: 'FaHtml5', category: 'Frontend' },
  { _id: 'd2', name: 'CSS3', iconName: 'FaCss3Alt', category: 'Frontend' },
  { _id: 'd3', name: 'JavaScript', iconName: 'FaJs', category: 'Frontend' },
  { _id: 'd4', name: 'React', iconName: 'FaReact', category: 'Frontend' },
  { _id: 'd5', name: 'Tailwind', iconName: 'SiTailwindcss', category: 'Frontend' },
  { _id: 'd6', name: 'Node.js', iconName: 'FaNodeJs', category: 'Backend' },
  { _id: 'd7', name: 'Express.js', iconName: 'SiExpress', category: 'Backend' },
  { _id: 'd8', name: 'MongoDB', iconName: 'SiMongodb', category: 'Database' },
  { _id: 'd9', name: 'Git', iconName: 'FaGitAlt', category: 'Tools' },
  { _id: 'd10', name: 'GitHub', iconName: 'FaGithub', category: 'Tools' },
  { _id: 'd11', name: 'VS Code', iconName: 'SiVisualstudiocode', category: 'Tools' },
  { _id: 'd12', name: 'Postman', iconName: 'SiPostman', category: 'Tools' },
];

const allIcons = { ...FaIcons, ...SiIcons };

const getIcon = (iconName, size = 26) => {
  const IconComponent = allIcons[iconName];
  return IconComponent ? <IconComponent size={size} /> : <span className="text-lg">?</span>;
};

const categoryConfig = {
  Frontend:   { badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400', icon: '🎨', text: 'text-blue-400' },
  Backend:    { badge: 'bg-green-500/10 border-green-500/20 text-green-400', icon: '⚙️', text: 'text-green-400' },
  Database:   { badge: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400', icon: '🗄️', text: 'text-yellow-400' },
  Tools:      { badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400', icon: '🛠️', text: 'text-purple-400' },
  Deployment: { badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400', icon: '🚀', text: 'text-orange-400' },
  AI:         { badge: 'bg-pink-500/10 border-pink-500/20 text-pink-400', icon: '🤖', text: 'text-pink-400' },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data.length > 0 ? res.data : defaultSkills);
      } catch {
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Deployment', 'AI'];

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3 font-semibold">What I work with</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">My <span className="gradient-text">Skills</span></h2>
          <div className="section-divider" />
        </div>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass rounded-xl h-20 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              if (catSkills.length === 0) return null;
              const config = categoryConfig[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full border ${config.badge}`}>
                      {config.icon} {cat}
                    </span>
                    <div className="flex-1 h-px bg-slate-700/50" />
                    <span className="text-xs text-slate-500">{catSkills.length} skill{catSkills.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    {catSkills.map((skill) => (
                      <div key={skill._id}
                        className="glass rounded-xl p-4 flex flex-col items-center gap-2.5 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default group">
                        <div className={`${config.text} group-hover:scale-110 transition-transform duration-300`}>
                          {getIcon(skill.iconName)}
                        </div>
                        <span className="text-xs text-slate-400 font-medium text-center leading-tight">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
