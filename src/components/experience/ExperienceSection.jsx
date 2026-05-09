import { motion } from 'framer-motion';
import { EXPERIENCE } from '../../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-[#080808] relative overflow-hidden">
      {/* Glow orb */}
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
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
          <motion.span variants={fadeUp} className="inline-block mono text-xs text-[#7B61FF] tracking-widest uppercase mb-3">
            04 / Experience
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Personal Experience
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical connector */}
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D9FF] via-[#7B61FF] to-transparent" />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10 last:mb-0"
            >
              {/* Connector dot */}
              <div
                className="absolute -left-[1.65rem] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: exp.color,
                  background: '#080808',
                  boxShadow: `0 0 15px ${exp.color}60`,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 border border-white/8 neon-border-hover group hover:border-transparent transition-colors duration-300">
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ padding: '1px', background: `linear-gradient(135deg, ${exp.color}80, transparent)`, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{exp.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{exp.title}</h3>
                    <span className="mono text-xs" style={{ color: exp.color }}>{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#B5B5B5]">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
