import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin } from 'react-icons/fi';
import { PERSONAL } from '../../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const INFO = [
  { icon: FiMail, label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
  { icon: FiPhone, label: 'Phone', value: PERSONAL.phone, href: `tel:${PERSONAL.phone}` },
  { icon: FiMapPin, label: 'Location', value: PERSONAL.location, href: null },
];

const SOCIALS = [
  { icon: FiGithub, label: 'GitHub', href: PERSONAL.github, color: '#FFFFFF' },
  { icon: FiLinkedin, label: 'LinkedIn', href: PERSONAL.linkedin, color: '#0A66C2' },
  { icon: FiMail, label: 'Email', href: `mailto:${PERSONAL.email}`, color: '#00D9FF' },
];

/** Glassmorphism input field */
function GlassInput({ label, id, type = 'text', value, onChange, placeholder, isTextarea = false, required = true }) {
  const [focused, setFocused] = useState(false);
  const Tag = isTextarea ? 'textarea' : 'input';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[#B5B5B5] tracking-wide">{label}</label>
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-300"
        style={{
          border: `1px solid ${focused ? 'rgba(0,217,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: focused ? '0 0 20px rgba(0,217,255,0.1), inset 0 0 20px rgba(0,217,255,0.03)' : 'none',
        }}
      >
        <Tag
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={isTextarea ? 5 : undefined}
          className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-[#B5B5B5]/50 outline-none resize-none"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        />
        {focused && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00D9FF] to-[#7B61FF]" />
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending (replace with real email service)
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

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
            07 / Contact
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title gradient-text-subtle">
            Let's Connect
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#B5B5B5] text-sm max-w-lg mx-auto mt-4">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-px bg-gradient-to-r from-[#00D9FF] to-[#7B61FF] mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info items */}
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <motion.div key={label} variants={fadeUp}>
                {href ? (
                  <a href={href} className="flex items-center gap-4 glass rounded-xl p-4 border border-white/8 neon-border-hover group transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center glass border border-white/8 group-hover:border-[#00D9FF]/30 transition-colors">
                      <Icon size={16} className="text-[#00D9FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#B5B5B5] mono">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 glass rounded-xl p-4 border border-white/8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center glass border border-white/8">
                      <Icon size={16} className="text-[#7B61FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#B5B5B5] mono">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex gap-3 mt-2">
              {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="p-3 rounded-xl glass border border-white/8 text-[#B5B5B5] hover:text-white hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-6 md:p-8 border border-white/8 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <GlassInput id="name" label="Full Name" value={form.name} onChange={handleChange} placeholder="Dibigh Rai" />
                <GlassInput id="email" label="Email Address" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
              <GlassInput id="subject" label="Subject" value={form.subject} onChange={handleChange} placeholder="Project collaboration, opportunity..." />
              <GlassInput id="message" label="Message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or idea..." isTextarea />

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="btn-primary justify-center mt-2 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : status === 'sent' ? (
                  <span>✓ Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend size={14} />
                  </>
                )}
              </button>

              {status === 'sent' && (
                <p className="text-center text-xs text-[#00D9FF] mt-1">
                  Thanks! I'll get back to you soon. 🙏
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
