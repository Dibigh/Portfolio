import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import { PROJECTS } from '../../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** 3D tilt card effect */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      variants={fadeUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
      className="group relative glass rounded-2xl p-6 border border-white/8 hover:border-transparent overflow-hidden cursor-default"
    >
      {/* Neon gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ padding: '1px', background: `linear-gradient(135deg, ${project.color}, #7B61FF)`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`, filter: 'blur(20px)' }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="mono text-xs text-[#B5B5B5] mb-2 block">{project.period}</span>
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#00D9FF] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
        >
          <span className="text-lg">{index === 0 ? '🌐' : index === 1 ? '🌿' : '🧭'}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#B5B5B5] text-sm leading-relaxed mb-5">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-xs font-mono"
            style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold glass border border-white/8 text-[#B5B5B5] hover:text-white hover:border-white/20 transition-all"
        >
          <FiGithub size={12} /> View Code
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
          >
            <FiExternalLink size={12} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* Glow orb */}
      <div
        className="absolute top-1/2 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="inline-block mono text-xs text-[#00D9FF] tracking-widest uppercase mb-3">
            03 / Projects
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Featured Work
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#B5B5B5] text-sm max-w-xl mx-auto mt-4">
            A selection of projects built with passion, precision, and modern technology stacks.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#00D9FF] to-[#7B61FF] mx-auto" />
        </motion.div>

        {/* Project cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Dibigh"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <FiGithub size={16} />
            <span>Explore More on GitHub</span>
            <FiArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
