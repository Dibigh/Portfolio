import { motion } from 'framer-motion';
import { LANGUAGES, INTERESTS } from '../../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Organizations ─────────────────────────────────────── */
function OrganizationsSection() {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block mono text-xs text-[#7B61FF] tracking-widest uppercase mb-6"
      >
        Organizations
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass rounded-2xl p-6 border border-white/8 neon-border-hover group relative overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px', background: 'linear-gradient(135deg, #7B61FF80, transparent)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(123,97,255,0.1)', border: '1px solid rgba(123,97,255,0.2)' }}>
            🏛️
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Sagarmatha Electronics Information<br />and Engineering Students Society</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs mono" style={{ background: 'rgba(123,97,255,0.1)', color: '#7B61FF', border: '1px solid rgba(123,97,255,0.2)' }}>
            Member
          </span>
          <span className="text-[#B5B5B5] text-xs mono">04/2022 – 03/2024</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Languages ─────────────────────────────────────────── */
function LanguagesDisplay() {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block mono text-xs text-[#00D9FF] tracking-widest uppercase mb-6"
      >
        Languages
      </motion.span>

      <div className="flex flex-col gap-4">
        {LANGUAGES.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="glass rounded-xl p-4 border border-white/8 neon-border-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm">{lang.name}</span>
              <span className="mono text-xs text-[#B5B5B5]">{lang.pct}%</span>
            </div>
            <p className="text-[#B5B5B5] text-xs mb-2">{lang.level}</p>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00D9FF, #7B61FF)' }}
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Interests ─────────────────────────────────────────── */
function InterestsDisplay() {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block mono text-xs text-[#5EE6FF] tracking-widest uppercase mb-6"
      >
        Interests
      </motion.span>

      <div className="flex flex-wrap gap-3">
        {INTERESTS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/8 cursor-default"
            style={{ boxShadow: 'none', transition: 'box-shadow 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,217,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <span className="text-base">{item.emoji}</span>
            <span className="text-sm font-medium text-[#B5B5B5]">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Combined section ──────────────────────────────────── */
export default function ExtrasSection() {
  return (
    <section id="extras" className="section-padding bg-[#080808] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(94,230,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
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
          <motion.span variants={fadeUp} className="inline-block mono text-xs text-[#5EE6FF] tracking-widest uppercase mb-3">
            06 / More
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Beyond The Code
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#5EE6FF] to-[#7B61FF] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1"><OrganizationsSection /></div>
          <div className="lg:col-span-1"><LanguagesDisplay /></div>
          <div className="md:col-span-2 lg:col-span-1"><InterestsDisplay /></div>
        </div>
      </div>
    </section>
  );
}
