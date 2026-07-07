"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart } from "lucide-react";
import { triggerConfetti } from "./ConfettiEffect";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-ivory-cream py-20">
      {/* Decorative background shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-lavender/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-lavender-light/10 blur-3xl pointer-events-none" />

      {/* Floating flower petals or decorative icons */}
      <motion.div 
        className="absolute top-1/4 left-10 text-lavender/30 select-none pointer-events-none hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={32} fill="currentColor" className="opacity-40" />
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-12 text-lavender-light/40 select-none pointer-events-none hidden md:block"
        animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={28} className="opacity-50" />
      </motion.div>

      <div className="max-w-3xl mx-auto z-10">
        {/* Eyebrow header (badge structure as per alam_uxpage_skill) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-lavender-light/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-lavender font-semibold mb-6 shadow-sm"
        >
          <Sparkles size={12} className="animate-spin" />
          Un regalo especial para ti
        </motion.div>

        {/* Title container with masked text reveal / spring feel */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="text-4xl md:text-7xl font-bold tracking-tight text-text-dark mb-4 leading-[1.1]"
        >
          Karyleydi Ortiz<span className="text-lavender">.</span>
        </motion.h1>

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl font-light text-text-medium max-w-xl mx-auto mb-8 font-sans"
        >
          ¡Feliz Cumpleaños <span className="font-semibold text-lavender">#24</span>! ✨
        </motion.p>

        {/* Celebration date indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", damping: 15 }}
          className="inline-flex items-center gap-2 bg-soft-beige px-5 py-3 rounded-2xl border border-lavender-light/20 text-text-medium text-sm md:text-base shadow-sm mb-10"
        >
          <Calendar size={16} className="text-lavender" />
          <span>7 de Julio, 2026</span>
        </motion.div>

        {/* Call to action (button architecture from alam_uxpage_skill) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <button
            onClick={triggerConfetti}
            className="group relative flex items-center justify-center gap-3 bg-lavender text-white font-medium rounded-full pl-6 pr-3 py-3 shadow-[0_4px_16px_rgba(200,138,187,0.35)] transition-all hover:bg-lavender-dark hover:shadow-[0_8px_24px_rgba(200,138,187,0.45)] hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <span>¡Celebrar! 🎉</span>
            <div className="bg-white/20 flex items-center justify-center rounded-full w-8 h-8 transition-transform group-hover:rotate-12">
              <Heart size={16} fill="white" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
