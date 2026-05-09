import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function EducationSection() {
  return (
    <section id="education" className="section-padding bg-[#050505] relative overflow-hidden">
      <div
        className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="inline-block mono text-xs text-[#00D9FF] tracking-widest uppercase mb-3">
            05 / Education
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Academic Journey
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#00D9FF] to-[#7B61FF] mx-auto" />
        </motion.div>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-8 md:p-10 border border-white/8 relative overflow-hidden group"
        >
          {/* Animated glow border */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ padding: '1px', background: 'linear-gradient(135deg, #00D9FF, #7B61FF)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
          />

          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10" style={{ background: 'radial-gradient(circle at top right, #00D9FF, transparent)' }} />

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Badge */}
            <div
              className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)', boxShadow: '0 0 30px rgba(0,217,255,0.15)' }}
            >
              🎓
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                  style={{ background: 'rgba(0,217,255,0.1)', color: '#00D9FF', border: '1px solid rgba(0,217,255,0.2)' }}
                >
                  2022 – 2026
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-[#B5B5B5] border border-white/8">
                  Fresh Graduate
                </span>
              </div>

              <h3 className="text-white text-xl font-bold mb-1">
                BE Electronics, Communication & Information Engineering
              </h3>
              <p className="text-[#00D9FF] font-medium mb-3">Sagarmatha Engineering College, Sanepa</p>
              <p className="text-[#B5B5B5] text-sm leading-relaxed">
                Pursuing a comprehensive engineering degree with focus on electronics, communication systems, and information
                technology. Complemented with hands-on experience in software development, AI/ML research, and full-stack
                web applications.
              </p>

              {/* Key areas */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Electronics', 'Communication Systems', 'Information Engineering', 'AI / ML', 'Web Development'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs glass border border-white/8 text-[#B5B5B5]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
