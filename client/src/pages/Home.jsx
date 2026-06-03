import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import api from '../utils/api';

const Home = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch {
        // Use component defaults if API unavailable
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <About settings={settings} />
      <Skills />
      <Projects />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
};

export default Home;
