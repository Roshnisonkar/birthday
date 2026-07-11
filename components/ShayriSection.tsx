import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function ShayriSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-6 py-20">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-3xl rounded-3xl border border-gold/20 bg-white/5 p-10 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      >
        <Quote
          className="mx-auto mb-6 h-12 w-12 text-gold opacity-70"
          strokeWidth={1.5}
        />

        <h2 className="mb-10 font-display text-4xl text-gold">
          सिर्फ़ तुम्हारे लिए ❤️
        </h2>

        <div className="space-y-5 font-script text-2xl leading-relaxed text-ivory">
          <p>बहन सिर्फ़ एक रिश्ता नहीं होती,</p>
          <p>वो हर खुशी की वजह होती है।</p>
          <p>जो बिना कहे सब समझ जाए,</p>
          <p>वो दुनिया की सबसे प्यारी बहन होती है। 💖</p>
        </div>

        <div className="mx-auto mt-10 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />

        <p className="mt-6 text-lg italic text-gold/80">
          ✨ Happy Birthday, My Dear Sister ✨
        </p>
      </motion.div>
    </section>
  );
}