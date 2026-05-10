import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ── Layout
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';

// ── Sections
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/AboutSection';
import SkillsSection from './components/skills/SkillsSection';
import ProjectsSection from './components/projects/ProjectsSection';
import ExperienceSection from './components/experience/ExperienceSection';
import EducationSection from './components/education/EducationSection';
import ExtrasSection from './components/extras/ExtrasSection';
import ContactSection from './components/contact/ContactSection';

// ── Loading screen
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <div className="loader-ring" />
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)' }} />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 mono text-xs text-[#00D9FF] tracking-widest uppercase"
      >
        Initializing Portfolio...
      </motion.p>
      <div className="mt-4 w-48 h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00D9FF] to-[#7B61FF]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

// ── Cursor glow
function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return <div ref={glowRef} className="cursor-glow hidden md:block" />;
}

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'extras', 'contact'];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [sound, setSound] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // ── Apply dark / light mode to <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove('light-mode');
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
      html.classList.add('light-mode');
    }
  }, [darkMode]);

  // ── Active section tracking
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [loading]);

  return (
    <>
      <div className="scanline-overlay" />
      <div className="noise-overlay" />
      {darkMode && <CursorGlow />}

      {/* Hidden YouTube Audio Player */}
      {sound && (
        <iframe
          src="https://www.youtube.com/embed/PpJQZH9B1Y4?autoplay=1&list=RDPpJQZH9B1Y4"
          title="YouTube music player"
          allow="autoplay"
          className="absolute w-px h-px opacity-0 pointer-events-none"
        />
      )}

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <ScrollProgress />
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            sound={sound}
            setSound={setSound}
            activeSection={activeSection}
          />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <ExtrasSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
