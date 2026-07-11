import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  /** ISO date string for the next birthday, e.g. "2027-07-11". */
  targetDate?: string;
}

function getNextOccurrence(dateStr: string): Date {
  const now = new Date();
  const [, month, day] = dateStr.split("-").map(Number);
  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
  if (target.getTime() < now.getTime()) {
    target = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
  }
  return target;
}

function getTimeParts(target: Date) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetDate = "2027-07-12" }: CountdownProps) {
  const [parts, setParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = getNextOccurrence(targetDate);
    const tick = () => setParts(getTimeParts(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    <section className="relative bg-charcoal px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
            Until We Celebrate Again
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ivory sm:text-4xl">
            Counting Down To Your <span className="gold-text">Next Birthday</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-4 gap-3 sm:gap-6">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl px-3 py-5 shadow-gold sm:px-6 sm:py-8"
            >
              <span className="gold-shimmer-text font-display text-3xl font-bold tabular-nums sm:text-5xl">
                {unit.value.toString().padStart(2, "0")}
              </span>
              <p className="mt-2 font-body text-[10px] uppercase tracking-widest text-muted sm:text-xs">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
