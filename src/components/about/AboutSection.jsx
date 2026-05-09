import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { COUNTERS, PERSONAL } from '../../utils/constants';

/** Animated count-up number */
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl font-black gradient-text">
      {count}{suffix}
    </span>
  );
}

const TIMELINE = [
  {
    year: '2022',
    title: 'Engineering Education Begins',
    desc: 'Started BE Electronics, Communication & Information Engineering at Sagarmatha Engineering College.',
    color: '#00D9FF',
  },
  {
    year: '2022',
    title: 'React Development Journey',
    desc: 'Dove into the React ecosystem — hooks, state management, component architecture, and TypeScript.',
    color: '#7B61FF',
  },
  {
    year: '2023',
    title: 'Python & Machine Learning',
    desc: 'Explored Python for data science and ML — TensorFlow, PyTorch, NumPy, and Pandas.',
    color: '#5EE6FF',
  },
  {
    year: '2024',
    title: 'Deep Learning Projects',
    desc: 'Built CNN-based image classification system for plant disease detection using ResNet50.',
    color: '#00D9FF',
  },
  {
    year: '2025',
    title: 'Computer Vision & Navigation',
    desc: 'Developed indoor navigation system for visually impaired using logistic regression and computer vision.',
    color: '#7B61FF',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="inline-block mono text-xs text-[#00D9FF] tracking-widest uppercase mb-3">
            01 / About
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Who I Am
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#00D9FF] to-[#7B61FF] mx-auto" />
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — bio + stats */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col gap-6"
          >
            {/* Bio card */}
            <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-white/8 neon-border-hover">
              <p className="text-[#B5B5B5] leading-relaxed text-sm md:text-base">
                I'm <span className="text-white font-semibold">Dibigh Rai</span>, a passionate software developer from{' '}
                <span className="text-[#00D9FF]">Lalitpur, Nepal</span>. Currently pursuing my{' '}
                <span className="text-white font-medium">BE in Electronics, Communication & Information Engineering</span> at
                Sagarmatha Engineering College (2022–Present).
              </p>
              <p className="text-[#B5B5B5] leading-relaxed text-sm md:text-base mt-4">
                I'm deeply interested in <span className="text-[#7B61FF] font-medium">Artificial Intelligence</span>,{' '}
                <span className="text-[#00D9FF] font-medium">Machine Learning</span>, and full-stack web development. My
                experience spans the React ecosystem, Python-based AI/ML pipelines, deep learning architectures including
                CNNs and ResNet, and immersive 3D experiences.
              </p>
            </motion.div>

            {/* Animated counters */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {COUNTERS.map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5 border border-white/8 neon-border-hover text-center">
                  <Counter value={c.value} suffix={c.suffix} />
                  <p className="text-[#B5B5B5] text-xs mt-1 font-medium">{c.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Floating info chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {['React Ecosystem', 'Deep Learning', 'CNN / ResNet', 'Computer Vision', 'Full Stack', 'Open Source'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/8 text-[#B5B5B5] hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="relative pl-10"
          >
            {/* Vertical line */}
            <div className="timeline-line" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative mb-8 last:mb-0"
              >
                {/* Dot */}
                <div
                  className="absolute -left-[2.35rem] top-1 w-3 h-3 rounded-full border-2"
                  style={{ borderColor: item.color, background: '#050505', boxShadow: `0 0 10px ${item.color}` }}
                />

                <div className="glass rounded-xl p-4 border border-white/8 neon-border-hover">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="mono text-xs font-bold" style={{ color: item.color }}>{item.year}</span>
                    <div className="h-px flex-1 bg-white/6" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-[#B5B5B5] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
