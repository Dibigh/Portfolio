import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../utils/constants';
import SkillSphere3D from './SkillSphere3D';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function SkillBar({ name, level, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-[#B5B5B5] group-hover:text-white transition-colors">{name}</span>
        <span className="mono text-xs text-[#B5B5B5]">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const categories = Object.keys(SKILLS);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="skills" className="section-padding bg-[#080808] relative overflow-hidden">
      {/* Glow orb */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
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
          <motion.span variants={fadeUp} className="inline-block mono text-xs text-[#7B61FF] tracking-widest uppercase mb-3">
            02 / Skills
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Technical Arsenal
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] mx-auto" />
        </motion.div>

        {/* 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="glass rounded-3xl border border-white/8 overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="text-center pt-6 px-4">
              <p className="text-[#B5B5B5] text-xs mono tracking-widest uppercase">Interactive 3D Skill Network</p>
              <p className="text-[#B5B5B5] text-xs mt-1 opacity-60">Drag to rotate · Zoom to explore</p>
            </div>
            <SkillSphere3D />
          </div>
        </motion.div>

        {/* Tabs + skill bars */}
        <div className="glass rounded-3xl p-6 md:p-8 border border-white/8">
          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#7B61FF] text-black shadow-lg shadow-cyan-neon/20'
                    : 'glass border border-white/8 text-[#B5B5B5] hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
            {SKILLS[activeTab].map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
