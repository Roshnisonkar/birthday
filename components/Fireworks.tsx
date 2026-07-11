"use client";

import { useEffect, useRef } from "react";

interface FireworksProps {
  active: boolean;
  /** How many bursts to fire while active. */
  bursts?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const COLORS = ["#D4AF37", "#FFD700", "#FFF3C4", "#B8860B", "#FFFFFF"];

/**
 * Canvas-based golden firework bursts. Renders full-viewport and
 * fires repeatedly for as long as `active` is true.
 */
export default function Fireworks({ active, bursts = 6, className = "" }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const burstIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnBurst = () => {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 3 + 2;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 40 + 40,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(render);
    };

    if (active) {
      let count = 0;
      spawnBurst();
      burstIntervalRef.current = setInterval(() => {
        spawnBurst();
        count++;
        if (count >= bursts && burstIntervalRef.current) {
          clearInterval(burstIntervalRef.current);
        }
      }, 500);
      render();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (burstIntervalRef.current) clearInterval(burstIntervalRef.current);
      particlesRef.current = [];
    };
  }, [active, bursts]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[80] ${className}`}
      aria-hidden="true"
    />
  );
}
