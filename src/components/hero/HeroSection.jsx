import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { PERSONAL } from '../../utils/constants';
import ParticleField from './ParticleField';
import GlowGrid from './GlowGrid';

const ROLES = PERSONAL.roles;

/** Animated role typewriter that cycles through role strings */
function RoleTypewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const role = ROLES[idx];

  useEffect(() => {
    let timeout;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, role]);

  return (
    <span className="text-[#00D9FF] font-semibold">
      {displayed}
      <span className="animate-blink text-[#7B61FF]">|</span>
    </span>
  );
}

/** Single blurred code snippet floating in background */
function CodeSnippet({ style, code }) {
  return (
    <div
      className="absolute mono text-xs text-[#00D9FF]/20 pointer-events-none select-none whitespace-pre"
      style={{ filter: 'blur(1.5px)', ...style }}
    >
      {code}
    </div>
  );
}

const CODE_SNIPPETS = [
  { top: '12%', left: '3%', code: `const ai = new Model({\n  layers: [512, 256, 128]\n});` },
  { top: '25%', right: '2%', code: `async function predict(img) {\n  return model.classify(img);\n}` },
  { bottom: '25%', left: '2%', code: `<Canvas camera={{ fov: 60 }}>\n  <Stars />\n  <Sphere />\n</Canvas>` },
  { bottom: '15%', right: '3%', code: `import torch.nn as nn\nclass CNN(nn.Module):\n  def forward(self, x):\n    return self.conv(x)` },
];

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* ── Background layers ── */}
      <GlowGrid />
      <ParticleField />

      {/* Radial gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 2,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 2,
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      {/* Blurred code snippets */}
      {CODE_SNIPPETS.map((s, i) => (
        <CodeSnippet key={i} style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, zIndex: 2 }} code={s.code} />
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" style={{ zIndex: 3 }} />

      {/* ── Main hero content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ zIndex: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00D9FF]/20 text-xs text-[#00D9FF] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="section-title gradient-text"
          >
            {PERSONAL.name}
          </motion.h1>

          {/* Role typewriter */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-[#B5B5B5] font-light tracking-wide min-h-[2rem]"
          >
            <RoleTypewriter />
          </motion.p>

          {/* Intro */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-[#B5B5B5] text-sm md:text-base leading-relaxed"
          >
            {PERSONAL.intro}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center mt-2">
            <a href="#projects" className="btn-primary">
              <span>View Projects</span>
              <FiArrowRight size={14} />
            </a>
            <a href="#contact" className="btn-ghost">
              <FiMail size={14} />
              <span>Contact Me</span>
            </a>
            <a
              href="https://github.com/Dibigh"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <FiDownload size={14} />
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-2">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl glass border border-white/8 text-[#B5B5B5] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 hover:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all duration-300"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl glass border border-white/8 text-[#B5B5B5] hover:text-[#7B61FF] hover:border-[#7B61FF]/40 hover:shadow-[0_0_15px_rgba(123,97,255,0.2)] transition-all duration-300"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="p-2.5 rounded-xl glass border border-white/8 text-[#B5B5B5] hover:text-[#5EE6FF] hover:border-[#5EE6FF]/40 hover:shadow-[0_0_15px_rgba(94,230,255,0.2)] transition-all duration-300"
            >
              <FiMail size={18} />
            </a>

            <div className="h-px w-8 bg-white/10" />

            <span className="text-xs text-[#B5B5B5] mono">{PERSONAL.location}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[10px] text-[#B5B5B5] mono tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-[#00D9FF]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
