"use client";

import { useRef, useState, MouseEvent } from "react";
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setOffset({ x, y });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  return {
    ref,
    offset,
    handlers: { onMouseMove, onMouseLeave },
  };
}
