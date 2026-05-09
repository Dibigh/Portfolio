import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin neon scroll progress bar at top of viewport */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      css={{
        background: 'linear-gradient(90deg, #00D9FF, #7B61FF)',
      }}
    >
      <div
        className="h-full w-full"
        style={{ background: 'linear-gradient(90deg, #00D9FF, #7B61FF)' }}
      />
    </motion.div>
  );
}
