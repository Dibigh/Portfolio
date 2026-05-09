import { useEffect, useRef } from 'react';

/**
 * Animated perspective grid drawn on canvas — cyberpunk glow grid effect.
 */
export default function GlowGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.003;

      const w = canvas.width;
      const h = canvas.height;
      const gridSize = 60;
      const pulse = Math.sin(t) * 0.5 + 0.5; // 0-1

      // Horizontal lines
      for (let y = 0; y < h; y += gridSize) {
        const alpha = (0.04 + pulse * 0.03) * (1 - y / h + 0.2);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(0,217,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      // Vertical lines
      for (let x = 0; x < w; x += gridSize) {
        const alpha = (0.03 + pulse * 0.02);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = `rgba(123,97,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
