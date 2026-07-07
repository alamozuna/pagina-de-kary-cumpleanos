"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart } from "lucide-react";
import { triggerConfetti } from "./ConfettiEffect";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center px-4 overflow-hidden bg-ivory-cream py-16 md:py-24">
      {/* Decorative background shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-lavender/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-lavender-light/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left side: Hero Information */}
        <div className="md:col-span-6 text-center md:text-left flex flex-col items-center md:items-start">
          {/* Eyebrow header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-lavender-light/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-lavender font-semibold mb-6 shadow-sm"
          >
            <Sparkles size={12} className="animate-spin" />
            Un regalo especial para ti
          </motion.div>

          {/* Title */}
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
            className="text-lg md:text-2xl font-light text-text-medium mb-6 font-sans"
          >
            ¡Feliz Cumpleaños <span className="font-semibold text-lavender">#24</span>! ✨
          </motion.p>

          {/* Date Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", damping: 15 }}
            className="inline-flex items-center gap-2 bg-soft-beige px-5 py-3 rounded-2xl border border-lavender-light/20 text-text-medium text-sm shadow-sm mb-8"
          >
            <Calendar size={16} className="text-lavender" />
            <span>9 de Julio, 2026</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
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

        {/* Right side: Layered Scrapbook Collage Art (from reference image) */}
        <div className="md:col-span-6 relative w-full h-[450px] md:h-[550px] flex items-center justify-center mt-8 md:mt-0">
          
          {/* Background circles */}
          <div className="absolute top-10 left-10 w-28 h-28 rounded-full bg-amber-400/25 blur-sm pointer-events-none" />
          <div className="absolute bottom-16 right-16 w-36 h-36 rounded-full bg-lavender-light/25 blur-sm pointer-events-none" />

          {/* Full Moon cutout shape */}
          <motion.div 
            className="absolute top-12 left-1/4 w-16 h-16 rounded-full bg-white/70 shadow-inner flex items-center justify-center pointer-events-none overflow-hidden"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 rounded-full bg-soft-beige/50 translate-x-2 -translate-y-1" />
          </motion.div>

          {/* Leaf Overlay Shapes (SVG icons) */}
          <div className="absolute bottom-10 left-8 text-green-900/10 pointer-events-none rotate-[-45deg] scale-150">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.58 2.5 8.04 10 10 7.5-1.96 10-6.42 10-10 0-5.5-4.5-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>

          {/* Handwritten Quote 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
            className="absolute top-8 right-6 z-20 font-handwriting text-text-medium font-semibold text-lg md:text-xl max-w-[200px] leading-tight select-none rotate-[6deg]"
          >
            &quot;when things change inside you, things change around you&quot;
          </motion.div>

          {/* Handwritten Quote 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-8 z-20 font-handwriting text-lavender font-bold text-xl md:text-2xl select-none rotate-[-8deg]"
          >
            let it go ✨
          </motion.div>

          {/* Photo 1: Kary Hero (rotated left) */}
          <motion.div
            initial={{ scale: 0.8, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            transition={{ type: "spring", delay: 0.5, stiffness: 100 }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
            className="absolute left-6 md:left-12 top-16 w-[180px] md:w-[220px] bg-white p-3 pb-8 rounded-sm shadow-xl border border-black/5 rotate-[-6deg]"
          >
            <div className="relative aspect-[3/4] w-full bg-soft-beige overflow-hidden">
              <Image
                src="/images/kary-hero.jpg"
                alt="Karyleydi Ortiz"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <p className="font-handwriting text-center text-text-medium text-base mt-2">
              Karyleydi ✨
            </p>
          </motion.div>

          {/* Photo 2: Kary About Me (rotated right, overlaps slightly) */}
          <motion.div
            initial={{ scale: 0.8, rotate: 25, opacity: 0 }}
            animate={{ scale: 1, rotate: 8, opacity: 1 }}
            transition={{ type: "spring", delay: 0.7, stiffness: 100 }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
            className="absolute right-6 md:right-12 top-28 w-[180px] md:w-[220px] bg-white p-3 pb-8 rounded-sm shadow-xl border border-black/5 rotate-[8deg]"
          >
            <div className="relative aspect-[3/4] w-full bg-soft-beige overflow-hidden">
              <Image
                src="/images/kary-about.jpg"
                alt="Karyleydi Ortiz"
                fill
                priority
                className="object-cover"
              />
            </div>
            <p className="font-handwriting text-center text-text-medium text-base mt-2">
              Sonrisa única 💖
            </p>
          </motion.div>

          {/* Decorative Flowers/Hearts popping out */}
          <motion.div 
            className="absolute bottom-28 right-1/4 text-lavender z-20 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Heart size={20} fill="currentColor" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
