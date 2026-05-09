import { useRef, useCallback } from 'react';

/**
 * Web Audio API ambient music generator.
 * Creates a relaxing drone/pad sound using sine oscillators.
 */
export function useAmbientMusic() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const masterRef = useRef(null);

  const play = useCallback(() => {
    if (ctxRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
    master.connect(ctx.destination);
    masterRef.current = master;

    // A minor pentatonic notes (Hz) — gentle ambient pad
    const notes = [110, 130.81, 146.83, 164.81, 196, 220, 261.63, 329.63];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      gain.gain.setValueAtTime(0.025 / (i * 0.4 + 1), ctx.currentTime);

      // Slow LFO for gentle tremolo
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + i * 0.015, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.003, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      osc.start();

      nodesRef.current.push({ osc, lfo, gain });
    });
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    if (masterRef.current) {
      masterRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }
    nodesRef.current.forEach(({ osc, lfo }) => {
      try { osc.stop(ctx.currentTime + 2); } catch (_) {}
      try { lfo.stop(ctx.currentTime + 2); } catch (_) {}
    });
    nodesRef.current = [];
    setTimeout(() => {
      try { ctxRef.current?.close(); } catch (_) {}
      ctxRef.current = null;
      masterRef.current = null;
    }, 2500);
  }, []);

  return { play, stop };
}
