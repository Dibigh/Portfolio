import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, PERSONAL } from '../../utils/constants';
import { FiSun, FiMoon, FiVolume2, FiVolumeX, FiMenu, FiX } from 'react-icons/fi';

/**
 * Floating glass navbar with active-section highlighting,
 * dark/light toggle, sound toggle, and mobile drawer.
 */
export default function Navbar({ darkMode, setDarkMode, sound, setSound, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-500 ${scrolled
          ? 'glass-strong shadow-lg shadow-black/40'
          : 'glass'
          }`}
        style={{ width: 'min(90vw, 860px)' }}
      >
        {/* Logo */}
        <a href="#hero" className="mr-auto flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-neon to-purple-glow flex items-center justify-center text-xs font-black text-black">
            DR
          </div>
          <span className="hidden sm:block font-bold text-sm gradient-text">
            {PERSONAL.name}
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${isActive
                  ? 'text-[#00D9FF]'
                  : 'text-[#B5B5B5] hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/8"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => setSound(!sound)}
            className="p-2 rounded-lg text-[#B5B5B5] hover:text-white hover:bg-white/8 transition-all"
            title={sound ? 'Mute sounds' : 'Enable sounds'}
          >
            {sound ? <FiVolume2 size={14} /> : <FiVolumeX size={14} />}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-[#B5B5B5] hover:text-white hover:bg-white/8 transition-all"
            title="Toggle theme"
          >
            {darkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-lg text-[#B5B5B5] hover:text-white hover:bg-white/8 transition-all md:hidden"
          >
            <FiMenu size={16} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-72 glass-strong z-[70] flex flex-col p-6 gap-4"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold gradient-text">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="text-[#B5B5B5] hover:text-white">
                  <FiX size={20} />
                </button>
              </div>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-all ${activeSection === link.href.slice(1)
                    ? 'text-[#00D9FF] bg-white/8'
                    : 'text-[#B5B5B5] hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
