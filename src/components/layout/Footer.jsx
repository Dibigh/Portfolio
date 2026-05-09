import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { PERSONAL } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-[#B5B5B5]">
          <span>Built with</span>
          <FiHeart size={12} className="text-[#7B61FF]" />
          <span>by</span>
          <span className="gradient-text font-semibold">{PERSONAL.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="text-[#B5B5B5] hover:text-[#00D9FF] transition-colors">
            <FiGithub size={16} />
          </a>
          <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="text-[#B5B5B5] hover:text-[#7B61FF] transition-colors">
            <FiLinkedin size={16} />
          </a>
          <a href={`mailto:${PERSONAL.email}`} className="text-[#B5B5B5] hover:text-[#5EE6FF] transition-colors">
            <FiMail size={16} />
          </a>
        </div>

        <p className="text-xs text-[#B5B5B5] mono">
          © {new Date().getFullYear()} {PERSONAL.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
